import strictAdminCheck from "@/server-fns/strictAdminCheck.mjs";
import dbConnect from "@/services/dbConnect.mjs";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export const PATCH = async (req) => {
  try {
    const body = await req.json();
    const db = await dbConnect();
    const slotCollection = await db.collection("appointment-slots");
    const { _id, ...dataWithoutObjectId } = body;
        const authResult = await strictAdminCheck("admin");
    if (authResult instanceof NextResponse) {
      return authResult;
    }
    const result = await slotCollection.updateOne(
      { _id: new ObjectId(_id) },
      { $set: dataWithoutObjectId }
    );

    if (result?.modifiedCount > 0) {
      return NextResponse.json({
        message: "Success to save the slots",
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
