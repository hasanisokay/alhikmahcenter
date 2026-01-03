import dbConnect from "@/services/dbConnect.mjs";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    const searchParams = req.nextUrl.searchParams;
    const slug = searchParams.get("slug")?.trim() || "";
    if (!slug || slug.length < 1) {
      return NextResponse.json({ message: "No slug provided", status: 400 });
    }
    const db = await dbConnect();
    const blogsCollection = await db.collection("blogs");
    const result = await blogsCollection.findOne(
      { slug },
      { projection: { _id: 1 } }
    );

    if (result) {
      return NextResponse.json({
        message: "Slug is not available",
        status: 200,
        availability:false
      });
    } else {
      return NextResponse.json({ message: "Slug is available.", availability:true, status: 200 });
    }
  } catch (err) {
    // console.error("API Error:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};
