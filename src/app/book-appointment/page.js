"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import getSchedules from "@/utils/getSchedules.mjs";
import toast from "react-hot-toast";
import { format } from "date-fns";

const Page = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [slots, setSlots] = useState([]);
  const slotSectionRef = useRef(null);
  const [monthOffset, setMonthOffset] = useState(0);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlotId, setSelectedSlotId] = useState(null);
const [selectedService, setSelectedService] = useState(['Ruqyah']);
  // Form fields
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [summary, setSummary] = useState("");
  const [bookingLoading, setBookingLoading] = useState(false);


  const serviceOptions = ["Ruqyah", "Hijama"];

    const toggleServiceOption = (option) => {
    setSelectedService((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );
  };

  // Field-level errors
  const [fieldErrors, setFieldErrors] = useState({});

  const fetchSchedule = async () => {
    setLoading(true);
    const data = await getSchedules();
    if (data?.status === 200) {
      setSlots(data?.schedules);
    } else {
      toast.error(data?.message || "Server Error");
      setError(true);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSchedule();
  }, []);

  useEffect(() => {
    if (!slots.length) return;
    const sorted = [...slots].sort(
      (a, b) => new Date(a.expiresAt) - new Date(b.expiresAt)
    );
    const first = sorted[0];
    setSelectedDate(first.date);
    setSelectedSlotId(first.id);
  }, [slots]);

  const groupedByDate = useMemo(() => {
    const map = new Map();
    slots.forEach((s) => {
      if (!s.date) return;
      if (!map.has(s.date)) map.set(s.date, []);
      map.get(s.date).push(s);
    });
    return map;
  }, [slots]);

  const slotsForSelectedDate = useMemo(() => {
    if (!selectedDate) return [];
    const list = groupedByDate.get(selectedDate) || [];
    return [...list].sort(
      (a, b) => new Date(a.expiresAt) - new Date(b.expiresAt)
    );
  }, [groupedByDate, selectedDate]);

  // Calendar logic (JS)
  const today = new Date();
  const firstOfMonth = new Date(
    today.getFullYear(),
    today.getMonth() + monthOffset,
    1
  );

  const monthYearLabel = firstOfMonth.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  function buildMonthGrid(base) {
    const year = base.getFullYear();
    const month = base.getMonth();
    const startDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const weeks = [];
    let day = 1 - startDay;

    for (let w = 0; w < 6; w++) {
      const row = [];
      for (let d = 0; d < 7; d++, day++) {
        if (day < 1 || day > daysInMonth) row.push(null);
        else row.push(new Date(year, month, day));
      }
      weeks.push(row);
    }

    return weeks;
  }

  function dateToYYYYMMDD(dt) {
    if (!dt) return null;
    const y = dt.getFullYear();
    const m = String(dt.getMonth() + 1).padStart(2, "0");
    const d = String(dt.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  }

  const monthGrid = buildMonthGrid(firstOfMonth);

  const cardBase =
    "rounded-2xl p-5 bg-white/70 backdrop-blur-md shadow-[8px_8px_20px_rgba(15,23,42,0.08),-8px_-8px_20px_rgba(255,255,255,0.9)] border border-white/60";

  const x = 10;

  async function handleSubmit(e) {
    e.preventDefault();

    // validate all fields
    const errors = {};

    if (!selectedDate) {
      errors.date = "Please select a date.";
    }
    if (!selectedSlotId) {
      errors.slot = "Please select a time slot.";
    }
    if (!name.trim()) {
      errors.name = "Full name is required.";
    }
    if (!phone.trim()) {
      errors.phone = "Phone number is required.";
    } else if (phone.length < 11) {
      errors.phone = "Phone number length should be minimum 11.";
    }
    if (!address.trim()) {
      errors.address = "Address is required.";
    }
    if (!summary.trim()) {
      errors.summary = "Problem summary is required.";
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      toast.error("Please fill in all required fields.");
      return;
    }

    // clear errors if all good
    setFieldErrors({});
    setBookingLoading(true);

    try {
      const selectedSlot = slots.find((s) => s.id === selectedSlotId);

      const dataToSave = {
        slotId: selectedSlotId,
        date: selectedDate,
        time: selectedSlot?.time,
        name,
        address,
        phone,
        summary,
      };

      const res = await fetch("/api/book-appointment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(dataToSave),
      });
      const data = await res.json().catch(() => ({}));

      if (res.ok && (data.status === 200 || data.success)) {
        // toast with selected date & time
        const niceDate = format(new Date(selectedDate), "PPP");
        const niceTime = selectedSlot?.time || "";
        toast.success(`Appointment booked for ${niceDate} at ${niceTime}`);

        // Remove the booked slot and reset selection intelligently
        setSlots((prev) => {
          const newSlots = prev.filter((slot) => slot.id !== selectedSlotId);

          if (!newSlots.length) {
            setSelectedDate(null);
            setSelectedSlotId(null);
            return newSlots;
          }

          // Try to keep same date selected if there are still slots on it
          const sameDateSlots = newSlots
            .filter((s) => s.date === selectedDate)
            .sort((a, b) => new Date(a.expiresAt) - new Date(b.expiresAt));

          if (sameDateSlots.length) {
            setSelectedDate(selectedDate);
            setSelectedSlotId(sameDateSlots[0].id);
          } else {
            // Otherwise, jump to earliest remaining slot overall
            const sortedAll = [...newSlots].sort(
              (a, b) => new Date(a.expiresAt) - new Date(b.expiresAt)
            );
            setSelectedDate(sortedAll[0].date);
            setSelectedSlotId(sortedAll[0].id);
          }

          return newSlots;
        });

        // reset form
        setName("");
        setAddress("");
        setPhone("");
        setSummary("");
      } else {
        toast.error(data.message || "Error booking appointment");
        window.location.reload()
      }
    } catch {
      toast.error("Server error. Try again later.");
    }

    setBookingLoading(false);
  }
  const isMobile = () => window.innerWidth <= 768;
  // If server failed
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className={cardBase + " max-w-md text-center"}>
          <h1 className="text-xl font-semibold mb-2">Server Busy</h1>
          <p className="text-sm text-slate-600 mb-3">
            Could not load appointment slots.
          </p>
          <button
            onClick={fetchSchedule}
            className="px-4 py-2 rounded-xl bg-sky-600 text-white"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-slate-50 via-sky-50 to-slate-100">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Calendar */}
        <section className={`${cardBase} lg:col-span-2`}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold">Choose Your Date</h2>
              <p className="text-xs text-slate-500">
                Select a day to see available time slots
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setMonthOffset((m) => m - 1)}
                className="p-2 rounded-xl shadow-inner cursor-pointer"
              >
                ◀
              </button>
              <button
                onClick={() => {
                  setMonthOffset(0);
                  setSelectedDate(null);
                }}
                className="px-3 py-1 rounded-xl shadow-inner text-xs"
              >
                Reset
              </button>
              <button
                onClick={() => setMonthOffset((m) => m + 1)}
                className="p-2 rounded-xl shadow-inner cursor-pointer"
              >
                ▶
              </button>
            </div>
          </div>

          <div className="text-center mb-3 text-sm font-medium">
            {monthYearLabel}
          </div>

          <div className="grid grid-cols-7 gap-1 text-[11px] text-center mb-1">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
              <div key={d} className="text-slate-400">
                {d}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2">
            {monthGrid.map((week, wi) => (
              <div key={wi} className="contents">
                {week.map((dt, di) => {
                  const iso = dateToYYYYMMDD(dt);
                  const hasSlots = iso && groupedByDate.has(iso);
                  const isSelected = selectedDate === iso;

                  return (
                    <button
                      key={di}
                      type="button"
                      disabled={!iso}
                      onClick={() => {
                        setSelectedDate(iso);
                        const daySlots = groupedByDate.get(iso) || [];
                        setSelectedSlotId(daySlots[0]?.id || null);

                        // clear errors
                        setFieldErrors((prev) => ({
                          ...prev,
                          date: undefined,
                          slot: undefined,
                        }));

                        // mobile smooth scroll to slots
                        if (isMobile() && slotSectionRef.current) {
                          setTimeout(() => {
                            slotSectionRef.current.scrollIntoView({
                              behavior: "smooth",
                              block: "start",
                            });
                          }, 150);
                        }
                      }}
                      className={[
                        "relative flex flex-col items-center justify-center rounded-2xl min-h-[58px] text-xs border shadow-sm transition-all",
                        hasSlots
                          ? "bg-sky-50 hover:bg-sky-100 cursor-pointer"
                          : "bg-white/60 text-slate-300 cursor-not-allowed",
                        isSelected ? "ring-2 ring-sky-400 scale-[1.03]" : "",
                      ].join(" ")}
                    >
                      <span className="font-medium">
                        {dt ? dt.getDate() : ""}
                      </span>
                      {hasSlots && (
                        <span className="mt-1 text-[10px] px-2 py-0.5 rounded-full bg-sky-100 text-sky-700">
                          {groupedByDate.get(iso).length} slot
                          {groupedByDate.get(iso).length > 1 ? "s" : ""}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>

          {fieldErrors.date && (
            <p className="mt-2 text-xs text-red-500">{fieldErrors.date}</p>
          )}
        </section>

        {/* Time Slots + Form */}
        <section className="lg:col-span-3 flex flex-col gap-6">
          {/* Time slots */}
          <div ref={slotSectionRef} className={cardBase}>
            <h2 className="text-lg font-semibold mb-2">
              Available Time Slots for{" "}
              <span className="text-blue-400 font-semibold">
                {format(new Date(selectedDate), "PPPP")}
              </span>
            </h2>

            {loading ? (
              <p className="text-sm text-center text-slate-500 py-4">
                Loading...
              </p>
            ) : !selectedDate ? (
              <p className="py-4 text-center text-sm text-slate-500">
                Select a date.
              </p>
            ) : slotsForSelectedDate.length === 0 ? (
              <p className="py-4 text-center text-sm text-slate-500">
                No slots for this date.
              </p>
            ) : (
              <>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-3">
                  {slotsForSelectedDate.map((slot) => {
                    const active = selectedSlotId === slot.id;
                    return (
                      <button
                        key={slot.id}
                        onClick={() => {
                          setSelectedSlotId(slot.id);
                          setFieldErrors((prev) => ({
                            ...prev,
                            slot: undefined,
                          }));
                        }}
                        className={[
                          "px-3 py-2 cursor-pointer rounded-xl text-sm border shadow-sm text-left bg-white/70 hover:bg-sky-50",
                          active ? "border-sky-500 ring-2 ring-sky-300" : "",
                        ].join(" ")}
                      >
                        <div className="font-medium">{slot.time}</div>
                        <div className="text-[11px] text-slate-400">
                          {format(new Date(slot.expiresAt), "p")}
                        </div>
                      </button>
                    );
                  })}
                </div>
                {fieldErrors.slot && (
                  <p className="mt-2 text-xs text-red-500">
                    {fieldErrors.slot}
                  </p>
                )}
              </>
            )}
          </div>

          {/* Booking form */}
          <div className={cardBase}>
            <h2 className="text-lg font-semibold mb-4">Book Appointment</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium">Full Name *</label>
                  <input
                    className={[
                      "w-full rounded-xl px-3 py-2 bg-white/80 border shadow-inner",
                      fieldErrors.name ? "border-red-400" : "",
                    ].join(" ")}
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      setFieldErrors((prev) => ({ ...prev, name: undefined }));
                    }}
                  />
                  {fieldErrors.name && (
                    <p className="mt-1 text-xs text-red-500">
                      {fieldErrors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label className="text-xs font-medium">Phone *</label>
                  <input
                    className={[
                      "w-full rounded-xl px-3 py-2 bg-white/80 border shadow-inner",
                      fieldErrors.phone ? "border-red-400" : "",
                    ].join(" ")}
                    value={phone}
                    type="number"
                    onChange={(e) => {
                      setPhone(e.target.value);
                      setFieldErrors((prev) => ({ ...prev, phone: undefined }));
                    }}
                  />
                  {fieldErrors.phone && (
                    <p className="mt-1 text-xs text-red-500">
                      {fieldErrors.phone}
                    </p>
                  )}
                </div>
              </div>
 <div className="space-y-3">
      {serviceOptions?.map((option) => (
        <label
          key={option}
          className="flex items-center gap-3 cursor-pointer"
        >
          <input
            type="checkbox"
            checked={selectedService.includes(option)}
            onChange={() => toggleServiceOption(option)}
            className="peer hidden"
          />

          <div
            className="
              h-5 w-5
              rounded border border-gray-400
              flex items-center justify-center
              peer-checked:bg-blue-600
              peer-checked:border-blue-600
              transition
            "
          >
            <svg
              className="h-3 w-3 text-white hidden peer-checked:block"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <span className="text-sm text-gray-700">{option}</span>
        </label>
      ))}

      {/* Debug / Display selected values */}
      <div className="text-sm text-gray-500">
        Selected: {selectedService.join(", ") || "None"}
      </div>
    </div>
              <div>
                <label className="text-xs font-medium">Address *</label>
                <input
                  className={[
                    "w-full rounded-xl px-3 py-2 bg-white/80 border shadow-inner",
                    fieldErrors.address ? "border-red-400" : "",
                  ].join(" ")}
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                    setFieldErrors((prev) => ({ ...prev, address: undefined }));
                  }}
                />
                {fieldErrors.address && (
                  <p className="mt-1 text-xs text-red-500">
                    {fieldErrors.address}
                  </p>
                )}
              </div>

              <div>
                <label className="text-xs font-medium">Problem Summary *</label>
                <textarea
                  className={[
                    "w-full rounded-xl px-3 py-2 bg-white/80 border shadow-inner",
                    fieldErrors.summary ? "border-red-400" : "",
                  ].join(" ")}
                  rows="4"
                  value={summary}
                  onChange={(e) => {
                    setSummary(e.target.value);
                    setFieldErrors((prev) => ({ ...prev, summary: undefined }));
                  }}
                />
                {fieldErrors.summary && (
                  <p className="mt-1 text-xs text-red-500">
                    {fieldErrors.summary}
                  </p>
                )}
              </div>

              <div className="flex justify-between items-center">
                {selectedDate && selectedSlotId ? (
                  <div className="text-xs text-slate-500">
                    Booking for{" "}
                    <span className="font-medium">
                      {format(new Date(selectedDate), "PPP")}
                    </span>{" "}
                    at{" "}
                    <span className="font-medium">
                      {
                        slotsForSelectedDate.find(
                          (s) => s.id === selectedSlotId
                        ).time
                      }
                    </span>
                  </div>
                ) : (
                  <div className="text-xs text-slate-500">
                    Select date & time to continue.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={
                    bookingLoading ||
                    !selectedDate ||
                    !selectedSlotId ||
                    loading
                  }
                  className={`px-5 py-2.5 rounded-xl text-sm font-medium ${
                    bookingLoading ||
                    !selectedDate ||
                    !selectedSlotId ||
                    loading
                      ? "bg-slate-300 text-slate-600 cursor-not-allowed"
                      : "bg-sky-600 text-white hover:bg-sky-700"
                  }`}
                >
                  {bookingLoading ? "Booking..." : "Confirm"}
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Page;
