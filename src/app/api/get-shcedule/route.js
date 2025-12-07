import dbConnect from "@/services/dbConnect.mjs";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    const db = await dbConnect();
    const slotCollection = await db.collection("appointment-slots");
    const result = await slotCollection.find({}).toArray()

    if (result && result?.length > 0) {
      return NextResponse.json({
        message: "Success to get schedules.",
        status: 200,
        schedules:result 
      });
    } else {
      return NextResponse.json({ message: "Could not find any schedule.", status: 500 });
    }
  } catch (err) {
    console.error("API Error:", err);
    return NextResponse.json({ message: "Server error", status: 500 });
  }
};
