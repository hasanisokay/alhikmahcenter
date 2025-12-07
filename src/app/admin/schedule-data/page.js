"use client";

import React, { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { format } from "date-fns";
import combineDateTime from "@/utils/combineDateTime.mjs";
import getSchedules from "@/utils/getSchedules.mjs";

export default function MorphicScheduleManager({
  initialSchedules = [],
  fetchUrl = "/api/get-shcedule",
  deleteUrl = "/api/delete-schedule",
  updateUrl = "/api/update-schedule",
}) {
  const [schedules, setSchedules] = useState(initialSchedules);
  const [loading, setLoading] = useState(!initialSchedules.length);
  const [selected, setSelected] = useState(new Set());
  const [filterDate, setFilterDate] = useState(null);
  const [editing, setEditing] = useState(null);
  const [monthOffset, setMonthOffset] = useState(0);

  useEffect(() => {
    if (initialSchedules.length) return;
    fetchSchedule();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchSchedule() {
    setLoading(true);
    const data = await getSchedules();
    if (data?.status === 200) {
      setSchedules(data?.schedules);
    } else {
      toast.error(data.message || "ERROR");
    }
    setLoading(false)
  }

  const groupedByDate = useMemo(() => {
    const map = new Map();
    schedules.forEach((s) => {
      const day = s.date; // expect YYYY-MM-DD
      if (!map.has(day)) map.set(day, []);
      map.get(day).push(s);
    });
    return map;
  }, [schedules]);

  const visibleSchedules = useMemo(() => {
    if (!filterDate) return schedules;
    return schedules.filter((s) => s.date === filterDate);
  }, [schedules, filterDate]);

  function toggleSelect(id) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleSelectAll() {
    if (selected.size === visibleSchedules.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(visibleSchedules.map((s) => s._id || s.id)));
    }
  }

  async function deleteSelected() {
    if (!selected.size) return;
    const ids = Array.from(selected);
    const remaining = schedules.filter((s) => !ids.includes(s._id || s.id));
    try {
      const res = await fetch(deleteUrl, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ ids }),
      });
      const resData = await res.json();
      if (resData.status === 200) {
        setSchedules(remaining);
        setSelected(new Set());
        toast.success("Deleted");
      } else {
        toast.error("Error deleting. Reload page");
      }
    } catch (e) {
      console.error(e);
      toast.error("Error deleting. Reload page");
    }
  }

  function openEdit(schedule) {
    setEditing({ ...schedule });
  }

  async function saveEdit() {
    if (!editing) return;

    try {
      // 1. Rebuild Date from date + time like your generator
      const baseDate = new Date(editing.date);
      const dt = combineDateTime(baseDate, editing.time);

      if (!dt || Number.isNaN(dt.getTime())) {
        toast.error("Invalid date or time");
        return;
      }

      // 2. Build new slot in same shape as generateSlots
      const iso = dt.toISOString();
      const updatedSlot = {
        ...editing,
        id: iso, // unique slot id = ISO datetime
        time: format(dt, "HH:mm"),
        date: format(dt, "yyyy-MM-dd"),
        readable: format(dt, "PPP p"),
        expiresAt: iso,
      };

      const currentKey = editing._id || editing.id;

      // 3. Ensure uniqueness of id (no duplicate slot at same datetime)
      const hasDuplicate = schedules.some((s) => {
        const key = s._id || s.id;
        return key !== currentKey && s.id === updatedSlot.id;
      });

      if (hasDuplicate) {
        toast.error("A slot already exists at that date & time.");
        return;
      }

      // 4. Optimistic update in local state, sorted by time
      setSchedules((prev) => {
        const next = prev.map((s) =>
          (s._id || s.id) === currentKey ? updatedSlot : s
        );
        return next.sort(
          (a, b) => new Date(a.expiresAt) - new Date(b.expiresAt)
        );
      });

      setEditing(null);

      // 5. Persist to API
      const res = await fetch(updateUrl, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(updatedSlot),
      });

      const resData = await res.json();
      if (res.ok && resData?.status === 200) {
        toast.success("Slot updated");
      } else {
        toast.error("Error updating slot. Please reload.");
      }
    } catch (e) {
      console.error(e);
      toast.error("Error updating slot");
    }
  }

  // -- Calendar helpers
  const today = new Date();
  const firstOfMonth = new Date(
    today.getFullYear(),
    today.getMonth() + monthOffset,
    1
  );
  const monthYearLabel = firstOfMonth.toLocaleString(undefined, {
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

  // Morphic / neumorphism styles used across the component
  const cardBase =
    "rounded-2xl p-4 bg-white/60 backdrop-blur-sm shadow-[8px_8px_20px_rgba(17,24,39,0.06),-8px_-8px_20px_rgba(255,255,255,0.8)] border border-white/40";

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Calendar */}
        <section className={`${cardBase} lg:col-span-1`}>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold">Available slots</h3>
            <div className="flex gap-2 items-center">
              <button
                onClick={() => setMonthOffset((m) => m - 1)}
                className="p-2 rounded-lg shadow-inner"
              >
                ◀
              </button>
              <button
                onClick={() => {
                  setMonthOffset(0);
                  setFilterDate(null);
                }}
                className="p-2 rounded-lg shadow-inner"
              >
                Today
              </button>
              <button
                onClick={() => setMonthOffset((m) => m + 1)}
                className="p-2 rounded-lg shadow-inner"
              >
                ▶
              </button>
            </div>
          </div>

          <div className="text-center mb-3 text-sm text-slate-600">
            {monthYearLabel}
          </div>

          <div className="grid grid-cols-7 gap-1 text-xs text-center">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
              <div key={d} className="text-slate-500">
                {d}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2 mt-2">
            {monthGrid.map((week, wi) => (
              <React.Fragment key={wi}>
                {week.map((dt, di) => {
                  const iso = dt ? dateToYYYYMMDD(dt) : null;
                  const has = iso && groupedByDate.has(iso);
                  const isFiltered = iso === filterDate;
                  return (
                    <div
                      key={di}
                      onClick={() =>
                        iso &&
                        setFilterDate((prev) => (prev === iso ? null : iso))
                      }
                      className={`cursor-pointer select-none flex flex-col items-center justify-center p-2 rounded-xl min-h-[56px] ${
                        isFiltered ? "ring-2 ring-sky-300" : ""
                      } ${
                        has ? "bg-sky-50" : "bg-white/50"
                      } shadow-sm border border-white/30`}
                    >
                      <div className="text-xs font-medium">
                        {dt ? dt.getDate() : ""}
                      </div>
                      {has && (
                        <div className="mt-1 text-[10px] px-2 py-1 rounded-full bg-sky-100">
                          {groupedByDate.get(iso).length} slot
                          {groupedByDate.get(iso).length > 1 ? "s" : ""}
                        </div>
                      )}
                    </div>
                  );
                })}
              </React.Fragment>
            ))}
          </div>

          <div className="mt-4 text-xs text-slate-500">
            Tip: click a date to filter the list. Click again to clear.
          </div>
        </section>

        {/* Right: List and actions */}
        <section className={`lg:col-span-2 ${cardBase} flex flex-col gap-4`}>
          <div className="flex flex-wrap items-center justify-between">
            <h2 className="text-xl font-semibold">Your scheduled slots</h2>
            <div className="flex items-center gap-3">
              <div className="text-sm text-slate-600">
                {visibleSchedules.length} visible
              </div>
              <button
                onClick={toggleSelectAll}
                className="px-3 py-1 rounded-lg shadow-inner"
              >
                {selected.size === visibleSchedules.length
                  ? "Deselect all"
                  : "Select all"}
              </button>
              <button
                onClick={deleteSelected}
                className="px-3 py-1 rounded-lg bg-rose-500 text-white shadow-md"
              >
                Delete
              </button>
            </div>
          </div>

          <div className="overflow-auto max-h-[520px]">
            <ul className="space-y-3">
              {loading ? (
                <li className="p-4">Loading...</li>
              ) : visibleSchedules.length === 0 ? (
                <li className="p-4 text-slate-500">No slots found.</li>
              ) : (
                visibleSchedules.map((s) => {
                  const key = s._id || s.id;
                  const isSel = selected.has(key);
                  return (
                    <li
                      key={key}
                      className="flex items-center justify-between p-3 rounded-xl bg-white/60 border border-white/30 shadow-[inset_6px_6px_14px_rgba(2,6,23,0.02)]"
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={isSel}
                          onChange={() => toggleSelect(key)}
                          className="h-5 w-5"
                        />
                        <div>
                          <div className="text-sm font-medium">
                            {s.readable || `${s.date} ${s.time}`}
                          </div>
                          <div className="text-xs text-slate-500">
                            Expires at: {new Date(s.expiresAt).toLocaleString()}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openEdit(s)}
                          className="px-3 py-1 rounded-lg shadow-inner"
                        >
                          Edit
                        </button>
                        <button
                          onClick={async () => {
                            setSelected(new Set([key]));
                            await deleteSelected();
                          }}
                          className="px-3 py-1 rounded-lg bg-rose-100 text-rose-700"
                        >
                          Delete
                        </button>
                      </div>
                    </li>
                  );
                })
              )}
            </ul>
          </div>

          <div className="mt-2 text-xs text-slate-500">
            Showing {visibleSchedules.length} slot(s). Group-edit and delete are
            supported via the checkboxes.
          </div>
        </section>
      </div>

      {/* Edit Modal (simple) */}
      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/30"
            onClick={() => setEditing(null)}
          />
          <div className="relative w-full max-w-md p-6 rounded-2xl bg-white/80 backdrop-blur-md border border-white/40 shadow-2xl">
            <h3 className="text-lg font-semibold mb-3">Edit slot</h3>
            <label className="block text-sm">Date</label>
            <input
              type="date"
              value={editing.date}
              onChange={(e) =>
                setEditing((p) => ({ ...p, date: e.target.value }))
              }
              className="w-full p-2 rounded-lg mt-1 mb-3"
            />

            <label className="block text-sm">Time</label>
            <input
              type="time"
              value={editing.time}
              onChange={(e) =>
                setEditing((p) => ({ ...p, time: e.target.value }))
              }
              className="w-full p-2 rounded-lg mt-1 mb-3"
            />

            <label className="block text-sm">Readable label</label>
            <input
              type="text"
              value={editing.readable || ""}
              onChange={(e) =>
                setEditing((p) => ({ ...p, readable: e.target.value }))
              }
              className="w-full p-2 rounded-lg mt-1 mb-3"
            />

            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setEditing(null)}
                className="px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={saveEdit}
                className="px-4 py-2 rounded-lg bg-sky-600 text-white"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
