import strictAdminCheck from "@/server-fns/strictAdminCheck.mjs";
import dbConnect from "@/services/dbConnect.mjs";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const now = new Date();

    const authResult = await strictAdminCheck("admin");
    if (authResult instanceof NextResponse) {
      return authResult;
    }

    const db = await dbConnect();
    const appointmentCollection = db.collection("booked-appointments");

    // ----- Date Ranges -----
    const startOfToday = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    );
    const endOfToday = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1
    );

    const upcomingEnd = new Date(startOfToday);
    upcomingEnd.setDate(upcomingEnd.getDate() + 10);

    const past10DaysStart = new Date(startOfToday);
    past10DaysStart.setDate(past10DaysStart.getDate() - 10);

    const results = await appointmentCollection
      .aggregate([
        // 1) Convert string "date" -> real Date field "appointmentDate"
        {
          $addFields: {
            appointmentDate: {
              $dateFromString: {
                dateString: "$date",       // your string field
                format: "%Y-%m-%d",        // matches "2025-12-08"
              },
            },
          },
        },
        // 2) Use that field in the facet
        {
          $facet: {
            todayAppointments: [
              {
                $match: {
                  appointmentDate: { $gte: startOfToday, $lt: endOfToday },
                },
              },
              { $sort: { appointmentDate: 1 } },
            ],

            upcoming10Days: [
              {
                $match: {
                  appointmentDate: { $gte: endOfToday, $lt: upcomingEnd },
                },
              },
              { $sort: { appointmentDate: 1 } },
            ],

            recentPast10Days: [
              {
                $match: {
                  appointmentDate: {
                    $gte: past10DaysStart,
                    $lt: startOfToday,
                  },
                },
              },
              { $sort: { appointmentDate: -1 } },
            ],

            totalClients: [
              {
                $group: {
                  _id: {
                    $trim: { input: { $toString: "$phone" } },
                  },
                },
              },
              { $count: "count" },
            ],
          },
        },
      ])
      .toArray();

    const data = results[0] || {};

    return NextResponse.json({
      message: "Dashboard stats fetched successfully.",
      status: 200,
      data: {
        today: {
          count: data.todayAppointments?.length || 0,
          appointments: data.todayAppointments || [],
        },
        upcoming10Days: {
          count: data.upcoming10Days?.length || 0,
          appointments: data.upcoming10Days || [],
        },
        recentPast10Days: {
          count: data.recentPast10Days?.length || 0,
          appointments: data.recentPast10Days || [],
        },
        totalClients: data.totalClients?.[0]?.count || 0,
      },
    });
  } catch (err) {
    console.error("API Error:", err);
    return NextResponse.json({ message: "Server error", status: 500 });
  }
};
