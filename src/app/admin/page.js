"use client";
export default function Dashboard({ today, upcoming, clients, recent }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl shadow backdrop-blur-xl bg-white/60 dark:bg-gray-800/50 border border-white/20 dark:border-gray-700/40">
          <h3 className="text-lg font-semibold mb-2">Today’s Appointments</h3>
          <p className="text-3xl font-bold">{today}</p>
        </div>

        <div className="p-6 rounded-2xl shadow backdrop-blur-xl bg-white/60 dark:bg-gray-800/50 border border-white/20 dark:border-gray-700/40">
          <h3 className="text-lg font-semibold mb-2">Upcoming Appointments</h3>
          <p className="text-3xl font-bold">{upcoming}</p>
        </div>

        <div className="p-6 rounded-2xl shadow backdrop-blur-xl bg-white/60 dark:bg-gray-800/50 border border-white/20 dark:border-gray-700/40">
          <h3 className="text-lg font-semibold mb-2">Total Clients</h3>
          <p className="text-3xl font-bold">{clients}</p>
        </div>
      </div>

      <div className="p-6 rounded-2xl shadow backdrop-blur-xl bg-white/60 dark:bg-gray-800/50 border border-white/20 dark:border-gray-700/40">
        <h3 className="text-xl font-semibold mb-4">Recent Appointments</h3>
        <ul className="divide-y divide-gray-300 dark:divide-gray-700">
          {recent?.map((r, i) => (
            <li key={i} className="py-3 flex justify-between">
              <span>{r.name}</span>
              <span>{r.time}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}