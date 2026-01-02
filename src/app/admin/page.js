"use client";

import { useEffect, useState } from "react";
import {
  AiFillCalendar,
  AiOutlineClockCircle,
  AiOutlineUsergroupAdd,
  AiOutlineHistory,
  AiOutlineClose,
} from "react-icons/ai";

export default function Dashboard() {
  const [todayAppointments, setTodayAppointments] = useState([]);
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [recentAppointments, setRecentAppointments] = useState([]);
  const [totalClients, setTotalClients] = useState(0);
  const [loading, setLoading] = useState(true);

  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchDashboardData = async () => {
    try {
      const res = await fetch("/api/dashboard-data", {
        credentials: "include",
      });
      const json = await res.json();
      const data = json.data;
      setTodayAppointments(data.today.appointments);
      setUpcomingAppointments(data.upcoming10Days.appointments);
      setRecentAppointments(data.recentPast10Days.appointments);
      setTotalClients(data.totalClients);

      setLoading(false);
    } catch (err) {
      console.error("Dashboard fetch error:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const openModal = (appointment) => {
    setSelectedAppointment(appointment);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAppointment(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh] text-xl font-semibold">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Dashboard Title */}
      <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
        Admin Dashboard
      </h1>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-4 gap-6">
        <DashboardCard
          title="Today's Appointments"
          count={todayAppointments.length}
          icon={<AiFillCalendar size={32} />}
          gradient="from-blue-500 to-cyan-500"
        />

        <DashboardCard
          title="Upcoming (Next 10 Days)"
          count={upcomingAppointments.length}
          icon={<AiOutlineClockCircle size={32} />}
          gradient="from-purple-500 to-pink-500"
        />

        <DashboardCard
          title="Total Clients"
          count={totalClients}
          icon={<AiOutlineUsergroupAdd size={32} />}
          gradient="from-green-500 to-emerald-500"
        />

        <DashboardCard
          title="Recent (Last 10 Days)"
          count={recentAppointments.length}
          icon={<AiOutlineHistory size={32} />}
          gradient="from-orange-500 to-red-500"
        />
      </div>

      {/* Detailed Lists */}
      <div className="mt-10 grid md:grid-cols-3 gap-6">
        <ListCard
          title="Today's Appointments"
          list={todayAppointments}
          color="blue"
          onSelect={openModal}
        />
        <ListCard
          title="Upcoming Appointments"
          list={upcomingAppointments}
          color="purple"
          onSelect={openModal}
        />
        <ListCard
          title="Recent Appointments"
          list={recentAppointments}
          color="orange"
          onSelect={openModal}
        />
      </div>

      {/* Modal */}
      {isModalOpen && selectedAppointment && (
        <AppointmentModal
          appointment={selectedAppointment}
          onClose={closeModal}
        />
      )}
    </div>
  );
}

/* REUSABLE COLORFUL CARD */
function DashboardCard({ title, count, icon, gradient }) {
  return (
    <div
      className={`p-5 rounded-xl shadow-lg bg-gradient-to-br ${gradient} text-white transform transition hover:scale-[1.03] hover:shadow-2xl`}
    >
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">{title}</h2>
        {icon}
      </div>
      <p className="text-4xl font-bold mt-4">{count}</p>
    </div>
  );
}

/* LIST CARD WITH line-clamp + click-to-open-modal */
function ListCard({ title, list, color, onSelect }) {
  const colorClassMap = {
    blue: "text-blue-600",
    purple: "text-purple-600",
    orange: "text-orange-600",
  };
  const headingColor = colorClassMap[color] || "text-slate-700";

  return (
    <div className="p-5 border rounded-xl shadow-md  bg-white text-black">
      <h3 className={`text-xl font-bold mb-4 ${headingColor}`}>{title}</h3>

      {list.length === 0 ? (
        <p className="text-gray-500">No appointments</p>
      ) : (
        <ul className="space-y-3">
          {list.map((a) => {
            const dateLabel =
              a.date ||
              (a.appointmentDate &&
                new Date(a.appointmentDate).toISOString().slice(0, 10));
            const timeLabel = a.time || "";

            return (
              <li
                key={a._id}
                onClick={() => onSelect && onSelect(a)}
                className="p-4 rounded-xl bg-gradient-to-r from-slate-50 to-blue-50 border border-blue-100 flex justify-between items-start gap-3 cursor-pointer hover:shadow-md hover:border-blue-200 transition"
              >
                {/* Left: basic info (clamped) */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-semibold text-slate-800 line-clamp-1">
                      {a.name || "Unknown Patient"}
                    </span>
                    {a.phone && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-white/80 text-slate-700 border border-slate-200">
                        {a.phone}
                      </span>
                    )}
                  </div>
                  {a.summary && (
                    <p className="text-xs text-slate-600 line-clamp-2">
                      {a.summary}
                    </p>
                  )}

                  {a.address && (
                    <p className="mt-1 text-[11px] text-slate-500 line-clamp-1">
                      {a.address}
                    </p>
                  )}
                                    {a.service && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-white/80 text-slate-700 border border-slate-200">
                      {a.service}
                    </span>
                  )}

                </div>

                {/* Right: date / time */}
                <div className="flex flex-col items-end gap-1 text-right">
                  {dateLabel && (
                    <span className="text-xs font-semibold px-2 py-1 rounded-full bg-white/90 text-blue-700 border border-blue-100">
                      {dateLabel}
                    </span>
                  )}
                  {timeLabel && (
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-blue-600/10 text-blue-700">
                      {timeLabel}
                    </span>
                  )}
                  
                  <span className="mt-1 text-[11px] text-blue-700 underline">
                    View details
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

/* MODAL COMPONENT */
function AppointmentModal({ appointment, onClose }) {
  const {
    name,
    phone,
    date,
    time,
    address,
    summary,
    service,
    appointmentDate,
    _id,
  } = appointment || {};

  const formattedDate =
    date ||
    (appointmentDate &&
      new Date(appointmentDate).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      }));

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white max-w-lg w-full mx-4 rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
          <div>
            <h2 className="text-lg font-semibold">Appointment Details</h2>
            {_id && <p className="text-xs text-white/80 mt-0.5">ID: {_id}</p>}
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/20 transition"
            aria-label="Close"
          >
            <AiOutlineClose size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="px-5 py-4 space-y-3 text-sm text-slate-800">
          <DetailRow label="Name" value={name} />
          <DetailRow label="Phone" value={phone} />
          <DetailRow label="Service" value={service} />
          <DetailRow
            label="Date & Time"
            value={
              formattedDate || time
                ? `${formattedDate || ""}${time ? ` • ${time}` : ""}`
                : "N/A"
            }
          />
          <DetailRow label="Address" value={address} multiline />
          <DetailRow label="Summary" value={summary} multiline />
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t flex justify-end bg-slate-50">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-full text-sm font-medium bg-slate-800 text-white hover:bg-slate-900 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

/* Small helper for modal rows */
function DetailRow({ label, value, multiline }) {
  if (!value) return null;
  return (
    <div>
      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
        {label}
      </p>
      <p
        className={`text-sm mt-0.5 ${
          multiline ? "whitespace-pre-wrap" : "truncate"
        }`}
      >
        {value}
      </p>
    </div>
  );
}
