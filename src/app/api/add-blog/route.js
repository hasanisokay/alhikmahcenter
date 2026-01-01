import strictAdminCheck from "@/server-fns/strictAdminCheck.mjs";
import dbConnect from "@/services/dbConnect.mjs";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    const body = await req.json();
    const authResult = await strictAdminCheck("admin");

    if (authResult instanceof NextResponse) {
      return authResult;
    }
    const db = await dbConnect();
    const blogsCollection = await db.collection("blogs");
    body.date = new Date();
    const result = await blogsCollection.insertOne(body);

    if (result?.insertedId) {
      return NextResponse.json({
        message: "Success to save the blog.",
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
