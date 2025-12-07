import strictAdminCheck from "@/server-fns/strictAdminCheck.mjs";
import dbConnect from "@/services/dbConnect.mjs";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    const body = await req.json();
    const docs = body?.slots?.map((d) => ({
      ...d,
      expiresAt: new Date(d.expiresAt),
    }));
    const authResult = await strictAdminCheck("admin");
    if (authResult instanceof NextResponse) {
      return authResult;
    }

    const db = await dbConnect();
    const slotCollection = await db.collection("appointment-slots");

    const result = await slotCollection.insertMany(docs);
    // await slotCollection.createIndex({ id: 1 }, { unique: true });

    // await slotCollection.createIndex(
    //   { expiresAt: 1 },
    //   { expireAfterSeconds: 0 }
    // );
    if (result?.insertedCount > 0) {
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
