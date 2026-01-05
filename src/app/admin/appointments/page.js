"use client";

import { useEffect, useMemo, useState } from "react";
import { format } from "date-fns";
import toast from "react-hot-toast";

const DEFAULT_LIMIT = 100;

const Page = () => {
  const [loading, setLoading] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState(null);

  const [limit, setLimit] = useState(DEFAULT_LIMIT);
  const [search, setSearch] = useState("");
  const [dateFilter, setDateFilter] = useState(""); // YYYY-MM-DD
  const [upcomingOnly, setUpcomingOnly] = useState(true);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  // fetch appointments from API
  const fetchAppointments = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(
        `/api/get-appointments?limit=${limit}&&search=${search}`,
        {
          credentials: "include",
        }
      );
      const data = await res.json().catch(() => ({}));

      if (res.ok && (data.status === 200 || data.success)) {
        setAppointments(data.appointments || data.data || []);
      } else {
        setError(data.message || "Failed to load appointments");
        toast.error(data.message || "Failed to load appointments");
      }
    } catch (err) {
      console.error(err);
      setError("Server error while fetching appointments");
      toast.error("Server error while fetching appointments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
    // re-fetch when limit changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit]);

  // helper: normalize appointment datetime
  function getAppointmentDate(apt) {
    if (apt.expiresAt) return new Date(apt.expiresAt);
    if (apt.datetime) return new Date(apt.datetime);
    if (apt.date && apt.time) return new Date(`${apt.date}T${apt.time}`);
    if (apt.date) return new Date(apt.date);
    return null;
  }

  const filteredAppointments = useMemo(() => {
    const now = new Date();
    return appointments.filter((apt) => {
      const dt = getAppointmentDate(apt);

      // upcoming filter
      if (upcomingOnly && dt && dt < now) return false;

      // date filter (exact date)
      if (dateFilter && apt.date !== dateFilter) return false;

      // search by name / phone
      if (search.trim()) {
        const q = search.toLowerCase();
        const name = (apt.name || "").toLowerCase();
        const phone = (apt.phone || apt.mobile || "").toLowerCase();
        if (!name.includes(q) && !phone.includes(q)) return false;
      }

      return true;
    });
  }, [appointments, upcomingOnly, dateFilter, search]);

  const cardBase =
    "rounded-2xl p-5 bg-white/70 backdrop-blur-md shadow-[8px_8px_20px_rgba(15,23,42,0.08),-8px_-8px_20px_rgba(255,255,255,0.9)] border border-white/60";

  const Detail = ({ label, value, multiline }) => (
    <div>
      <div className="text-xs text-slate-500 mb-1">{label}</div>
      <div
        className={`text-slate-800 ${
          multiline ? "whitespace-pre-wrap h-[200px]  overflow-y-auto" : ""
        }`}
      >
        {value || "-"}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen md:p-6 bg-gradient-to-br from-slate-50 via-sky-50 to-slate-100">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-800">
              Appointments
            </h1>
            <p className="text-xs text-slate-500">
              View, filter, and search all booked appointments.
            </p>
          </div>
          <button
            onClick={fetchAppointments}
            disabled={loading}
            className={`px-4 py-2 rounded-xl text-sm font-medium shadow-md ${
              loading
                ? "bg-slate-300 text-slate-600 cursor-not-allowed"
                : "bg-sky-600 text-white hover:bg-sky-700"
            }`}
          >
            {loading ? "Refreshing..." : "Refresh"}
          </button>
        </div>

        {/* Controls */}
        <div className={cardBase + " flex flex-col gap-4"}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-slate-600 mb-1">
                Search (name or mobile)
              </label>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Type name or phone..."
                className="w-full rounded-xl border border-white/70 bg-white/80 px-3 py-2 text-sm shadow-inner focus:outline-none focus:ring-2 focus:ring-sky-400"
              />
            </div>

            {/* Date filter */}
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">
                Filter by date
              </label>
              <input
                type="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="w-full rounded-xl border border-white/70 bg-white/80 px-3 py-2 text-sm shadow-inner focus:outline-none focus:ring-2 focus:ring-sky-400"
              />
            </div>

            {/* Limit selector */}
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">
                Items per fetch
              </label>
              <select
                value={limit}
                onChange={(e) => setLimit(Number(e.target.value))}
                className="w-full rounded-xl border border-white/70 bg-white/80 px-3 py-2 text-sm shadow-inner focus:outline-none focus:ring-2 focus:ring-sky-400"
              >
                <option value={100}>100 (default)</option>
                <option value={200}>200</option>
                <option value={300}>300</option>
                <option value={400}>400</option>
              </select>
            </div>
          </div>

          {/* Upcoming toggle + summary */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <label className="inline-flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={upcomingOnly}
                onChange={(e) => setUpcomingOnly(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300"
              />
              <span>Show only upcoming appointments</span>
            </label>

            <div className="text-xs text-slate-500">
              Showing{" "}
              <span className="font-semibold">
                {filteredAppointments.length}
              </span>{" "}
              of <span className="font-semibold">{appointments.length}</span>{" "}
              loaded appointments
              {dateFilter && (
                <>
                  {" "}
                  on{" "}
                  <span className="font-medium">
                    {format(new Date(dateFilter), "PPP")}
                  </span>
                </>
              )}
              {upcomingOnly && <span> (upcoming only)</span>}
            </div>
          </div>
        </div>

        {/* List */}
        <div className={cardBase}>
          {error && (
            <div className="mb-4 text-sm text-red-500">
              {error} – try refreshing.
            </div>
          )}

          {loading && !appointments.length ? (
            <div className="py-10 text-center text-sm text-slate-500">
              Loading appointments...
            </div>
          ) : filteredAppointments.length === 0 ? (
            <div className="py-10 text-center text-sm text-slate-500">
              No appointments found with current filters.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-left text-xs text-slate-500 border-b border-slate-100">
                    <th className="py-2 pr-4">Patient</th>
                    <th className="py-2 pr-4">Mobile</th>
                    <th className="py-2 pr-4">Service</th>
                    <th className="py-2 pr-4">Date & Time</th>
                    <th className="py-2 pr-4">Summary</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAppointments.map((apt) => {
                    const dt = getAppointmentDate(apt);
                    const isPast = dt && dt < new Date();

                    return (
                      <tr
                        key={apt.id || apt._id}
                        className="border-b border-slate-100 last:border-none"
                      >
                        {/* <td className="py-3 pr-4 align-top">
                          <div className="font-medium text-slate-800">
                            {apt.name || "-"}
                          </div>
                        </td> */}
                        <td className="py-3 pr-4 align-top">
                          <button
                            onClick={() => setSelectedAppointment(apt)}
                            className="font-medium text-sky-700 hover:underline focus:outline-none"
                          >
                            {apt.name || "-"}
                          </button>
                        </td>

                        <td className="py-3 pr-4 align-top">
                          <div className="text-slate-700">
                            {apt.phone || apt.mobile || "-"}
                          </div>
                        </td>
                        <td className="py-3 pr-4 align-top">
                          <div className="text-slate-700">
                            {apt.service || apt.service || "-"}
                          </div>
                        </td>
                        <td className="py-3 pr-4 align-top">
                          {dt ? (
                            <>
                              <div className="text-slate-800">
                                {format(dt, "PPP")}
                              </div>
                              <div className="text-xs text-slate-500">
                                {format(dt, "p")}{" "}
                                {isPast && (
                                  <span className="ml-1 text-[10px] rounded-full bg-slate-100 px-2 py-0.5 text-slate-500">
                                    Past
                                  </span>
                                )}
                              </div>
                            </>
                          ) : (
                            <span className="text-slate-400 text-xs">—</span>
                          )}
                        </td>
                        <td className="py-3 pr-4 align-top max-w-xs">
                          <div className="text-slate-700 line-clamp-3">
                            {apt.summary || apt.problem || "-"}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      {selectedAppointment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl bg-white shadow-xl p-6 relative">
            {/* Close */}
            <button
              onClick={() => setSelectedAppointment(null)}
              className="absolute top-3 right-3 text-slate-400 hover:text-slate-600"
            >
              ✕
            </button>

            <h2 className="text-lg font-semibold text-slate-800 mb-4">
              Appointment Details
            </h2>

            <div className="space-y-3 text-sm">
              <Detail label="Name" value={selectedAppointment.name} />

              <Detail label="Address" value={selectedAppointment.address} />

              <Detail label="Age" value={selectedAppointment.age} />

              <Detail
                label="Marital Status"
                value={selectedAppointment.maritalStatus}
              />

              <Detail
                label="Mobile Number"
                value={selectedAppointment.phone || selectedAppointment.mobile}
              />

              <Detail label="Service" value={selectedAppointment.service} />

              <Detail
                label="Summary"
                value={
                  selectedAppointment.summary || selectedAppointment.problem
                }
                multiline
              />
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelectedAppointment(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 text-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
