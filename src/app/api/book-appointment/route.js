import dbConnect from "@/services/dbConnect.mjs";
import sendEmail from "@/services/sendEmail.mjs";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    const body = await req.json();
    const { slotId, ...dataToSave } = body;
    const db = await dbConnect();
    const appointmentCollection = await db.collection("booked-appointments");
    const slotCollection = await db.collection("appointment-slots");
    const slotDeleted = await slotCollection.deleteOne({ id: slotId });
    let result;
    if (slotDeleted.deletedCount > 0) {
      result = await appointmentCollection.insertOne(dataToSave);
    } else {
      return NextResponse.json({
        message: "This slot is already booked.",
        status: 500,
      });
    }
    if (result?.insertedId) {
      await sendEmail(dataToSave);
      return NextResponse.json({
        message: "Successfully booked new appointment.",
        status: 200,
      });
    } else {
      return NextResponse.json({ message: "Could not book.", status: 500 });
    }
  } catch (err) {
    console.error("API Error:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};
