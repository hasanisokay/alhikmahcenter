"use client";
import React, { useState, useMemo } from "react";
import DatePicker from "react-datepicker";
import { FiTrash2, FiPlus, FiDownload, FiCalendar } from "react-icons/fi";
import { format, addMinutes, addDays } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import toast from "react-hot-toast";

export default function SchedulePage() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("17:00");
  const [gapMinutes, setGapMinutes] = useState(30);
  const [slots, setSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const combineDateTime = (dateObj, timeStr) => {
    if (!dateObj || !timeStr) return null;
    const [h, m] = timeStr.split(":").map(Number);
    const d = new Date(dateObj);
    d.setHours(h, m, 0, 0);
    return d;
  };

  const generateSlots = () => {
    setError(null);
    if (!startDate || !endDate) {
      setError("Select start and end date");
      return;
    }
    if (startDate > endDate) {
      setError("Start date cannot be after end date");
      return;
    }

    const newSlots = [];
    for (let d = new Date(startDate); d <= endDate; d = addDays(d, 1)) {
      const first = combineDateTime(d, startTime);
      const last = combineDateTime(d, endTime);
      if (!first || !last) continue;
      if (first > last) continue;
      let cursor = new Date(first);
      while (cursor <= last) {
        const iso = cursor.toISOString();
        newSlots.push({
          id: iso,
          time: format(cursor, "HH:mm"),
          //   datetime: iso,
          date: format(cursor, "yyyy-MM-dd"),
          readable: format(cursor, "PPP p"),
          expiresAt: iso,
        });
        cursor = addMinutes(cursor, Number(gapMinutes));
      }
    }

    const merged = [...slots];
    const seen = new Set(merged.map((s) => s.id));
    newSlots.forEach((s) => {
      if (!seen.has(s.id)) merged.push(s);
    });
    merged.sort((a, b) => new Date(a.datetime) - new Date(b.datetime));
    setSlots(merged);
  };

  const deleteSlot = (id) => setSlots((p) => p.filter((s) => s.id !== id));

  const submitSchedule = async () => {
    setLoading(true);
    setError(null);
    try {
      const payload = {
        slots: slots.map((s) => ({
          id: s.id,
          date: s.date,
          time: s.time,
          readable: s.readable,
          expiresAt: s.expiresAt,
        })),
      };
      const res = await fetch("/api/add-schedule", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        toast.error(res?.status || res?.message || "error");
      }
      const resData = await res.json();
      if (resData?.status === 200) {
        toast.success("Success");
        resetAll();
      } else {
        toast.error(res?.message || "Error");
      }
    } catch (err) {
      setError(err.message || "Failed");
    } finally {
      setLoading(false);
    }
  };
  const resetAll = () => {
    setStartDate(null);
    setEndDate(null);
    setStartTime("09:00");
    setEndTime("17:00");
    setGapMinutes(30);
    setSlots([]);
  };
  const grouped = useMemo(() => {
    const map = {};
    slots.forEach((s) => {
      if (!map[s.date]) map[s.date] = [];
      map[s.date].push(s);
    });
    const ordered = Object.keys(map).sort();
    return { map, ordered };
  }, [slots]);

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 text-gray-100">
      <div className="max-w-6xl mx-auto">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Schedule — Admin
          </h1>
          <div className="flex items-center gap-3">
            {/* <button 
            
            onClick={() => { const blob = new Blob([JSON.stringify(slots, null, 2)], { type: "application/json" }); const url = URL.createObjectURL(blob); const a = document.createElement("a"); a.href = url; a.download = "schedule.json"; a.click(); URL.revokeObjectURL(url); }} 
            
            className="inline-flex items-center gap-2 px-4 py-2 rounded-3xl bg-gradient-to-r from-purple-600 via-indigo-600 to-sky-500 shadow-lg hover:scale-[1.03] transform transition">
              <FiDownload /> Export
            </button> */}
          </div>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <section className="col-span-1 lg:col-span-2 p-6 rounded-3xl bg-gradient-to-bl from-gray-900/60 to-gray-800/50 ring-1 ring-gray-700 backdrop-blur-sm shadow-2xl">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-gray-300">Start Date</label>
                <div className="mt-2 flex items-center gap-2 bg-gray-900/40 p-2 rounded-xl ring-1 ring-gray-700">
                  <FiCalendar />
                  <DatePicker
                    selected={startDate}
                    onChange={(d) => setStartDate(d)}
                    dateFormat="yyyy-MM-dd"
                    className="bg-transparent outline-none w-full text-sm"
                    placeholderText="Pick start date"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-gray-300">End Date</label>
                <div className="mt-2 flex items-center gap-2 bg-gray-900/40 p-2 rounded-xl ring-1 ring-gray-700">
                  <FiCalendar />
                  <DatePicker
                    selected={endDate}
                    onChange={(d) => setEndDate(d)}
                    dateFormat="yyyy-MM-dd"
                    className="bg-transparent outline-none w-full text-sm"
                    placeholderText="Pick end date"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-gray-300">Start Time</label>
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="mt-2 w-full p-2 rounded-xl bg-gray-900/40 ring-1 ring-gray-700"
                />
              </div>

              <div>
                <label className="text-xs text-gray-300">End Time</label>
                <input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="mt-2 w-full p-2 rounded-xl bg-gray-900/40 ring-1 ring-gray-700"
                />
              </div>

              <div>
                <label className="text-xs text-gray-300">Gap (minutes)</label>
                <input
                  type="number"
                  min={1}
                  value={gapMinutes}
                  onChange={(e) => setGapMinutes(Number(e.target.value))}
                  className="mt-2 w-full p-2 rounded-xl bg-gray-900/40 ring-1 ring-gray-700"
                />
              </div>

              <div className="col-span-2 flex gap-3 mt-2">
                <button
                  onClick={generateSlots}
                  className="flex items-center gap-2 px-5 py-3 rounded-3xl bg-gradient-to-r from-rose-500 via-pink-500 to-indigo-600 shadow-2xl transform hover:-translate-y-0.5 transition"
                >
                  <FiPlus /> Generate
                </button>

                <button
                  onClick={() => resetAll()}
                  className="px-5 py-3 rounded-3xl bg-gray-900/30 ring-1 ring-gray-700 hover:brightness-105 transition"
                >
                  Reset
                </button>

                <button
                  onClick={submitSchedule}
                  disabled={loading || slots.length === 0}
                  className="ml-auto px-5 py-3 rounded-3xl bg-gradient-to-r from-green-400 to-emerald-600 text-black font-semibold shadow-lg disabled:opacity-50"
                >
                  {loading ? "Saving..." : "Save to server"}
                </button>
              </div>
            </div>

            {error && <div className="mt-4 text-red-400">{error}</div>}

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {slots.length === 0 ? (
                <div className="text-gray-400">
                  No slots yet — generate to preview.
                </div>
              ) : (
                grouped.ordered.map((date) => (
                  <div
                    key={date}
                    className="p-4 rounded-2xl bg-gradient-to-br from-gray-900/50 to-gray-800/40 ring-1 ring-gray-700"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="text-sm text-gray-300">
                        {format(new Date(date), "PPP")}
                      </div>
                      <div className="text-xs text-gray-500">
                        {grouped.map[date].length} slots
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {grouped.map[date].map((s) => (
                        <div
                          key={s.id}
                          className="flex items-center justify-between p-2 rounded-lg bg-gray-900/30"
                        >
                          <div className="text-sm">{s.time}</div>
                          <button
                            onClick={() => deleteSlot(s.id)}
                            className="p-2 rounded-md hover:bg-gray-800"
                          >
                            <FiTrash2 />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>

          <aside className="p-6 rounded-3xl bg-gradient-to-bl from-gray-900/60 to-gray-800/50 ring-1 ring-gray-700 shadow-inner">
            <h3 className="text-lg mb-3 font-semibold">
              Calendar & Quick List
            </h3>
            <div className="mb-4 rounded-xl overflow-hidden ring-1 ring-gray-700 w-full">
              <DatePicker
                inline
                selected={selectedDate}
                onChange={(d) => setSelectedDate(d)}
                calendarClassName="react-datepicker-custom"
              />
            </div>

            <div>
              <h4 className="text-sm text-gray-300 mb-2">
                Slots on{" "}
                {selectedDate
                  ? format(new Date(selectedDate), "PPP")
                  : "(pick a date)"}
              </h4>
              <div className="space-y-2 max-h-56 overflow-auto">
                {selectedDate &&
                grouped.map[format(new Date(selectedDate), "yyyy-MM-dd")] &&
                grouped.map[format(new Date(selectedDate), "yyyy-MM-dd")]
                  .length > 0 ? (
                  grouped.map[format(new Date(selectedDate), "yyyy-MM-dd")].map(
                    (s) => (
                      <div
                        key={s.id}
                        className="flex items-center justify-between p-2 rounded-lg bg-gray-900/30"
                      >
                        <div>
                          <div className="text-sm">{s.time}</div>
                          {s.expiresAt && (
                            <div className="text-xs text-gray-500">
                              expires: {format(new Date(s.expiresAt), "PPP p")}
                            </div>
                          )}
                        </div>
                        <button
                          onClick={() => deleteSlot(s.id)}
                          className="p-2 rounded-md hover:bg-gray-800"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    )
                  )
                ) : (
                  <div className="text-xs text-gray-500">
                    No slots for selected date.
                  </div>
                )}
              </div>
            </div>
          </aside>
        </main>

        <footer className="mt-6 text-xs text-gray-500">
          Each slot will be automatically deleted after successfull shcedule or
          expiry.
        </footer>
      </div>
      <style jsx>{`
        .react-datepicker-custom {
          background: transparent;
          border: none;
        }
        .react-datepicker__day--selected {
          background: linear-gradient(
            90deg,
            rgba(99, 102, 241, 0.9),
            rgba(79, 70, 229, 0.9)
          );
          color: black;
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
}
