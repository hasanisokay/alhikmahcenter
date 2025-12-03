import dbConnect from "@/services/dbConnect.mjs";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export const DELETE = async (req) => {
  try {
    const body = await req.json();
    const db = await dbConnect();
    const ids = body.ids;
    if (ids.length < 1) {
      return NextResponse.json({
        message: "No ids provided",
        status: 404,
      });
    }
    const idsWithObjectId = ids.map(i=> new ObjectId(i));
    const slotCollection = await db.collection("appointment-slots");
    const result = await slotCollection.deleteMany({ _id: { $in: idsWithObjectId} });
    console.log({ result });
    if (result?.deletedCount > 0) {
      return NextResponse.json({
        message: "Success to delete the slots",
        status: 200,
      });
    } else {
      return NextResponse.json({ message: "Could not save", status: 500 });
    }
  } catch (err) {
    // console.error("API Error:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};
