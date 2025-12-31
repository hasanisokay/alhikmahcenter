import strictAdminCheck from "@/server-fns/strictAdminCheck.mjs";
import dbConnect from "@/services/dbConnect.mjs";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    const searchParams = req.nextUrl.searchParams;

    const limit = Number(searchParams.get("limit")) || 20;
    const search = searchParams.get("search")?.trim() || "";
    const date = searchParams.get("date") || "";
    const upcoming = searchParams.get("upcoming") === "true";

    const now = new Date();
    
    const authResult = await strictAdminCheck("admin");
    if (authResult instanceof NextResponse) {
      return authResult;
    }
    const db = await dbConnect();
    const appointmentCollection = await db.collection("booked-appointments");

    // Base query
    const query = {};

    // Filter by date (exact match)
    if (date) {
      query.date = date;
    }

    // Search by name or phone
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
        { mobile: { $regex: search, $options: "i" } },
      ];
    }

    // Upcoming only filter
    if (upcoming) {
      query.expiresAt = { $gte: now };
    }

    // Fetch from Mongo
    const result = await appointmentCollection
      .find(query)
      .sort({ expiresAt: 1 })   // soonest first
      .limit(limit)
      .toArray();

    if (!result.length) {
      return NextResponse.json({
        message: "No appointments found.",
        status: 404,
        appointments: [],
      });
    }

    return NextResponse.json({
      message: "Appointments fetched successfully.",
      status: 200,
      appointments: result,
    });
  } catch (err) {
    console.error("API Error:", err);
    return NextResponse.json({ message: "Server error", status: 500 });
  }
};
