import strictAdminCheck from "@/server-fns/strictAdminCheck.mjs";
import dbConnect from "@/services/dbConnect.mjs";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const db = await dbConnect();
    const blogsCollection = await db.collection("blogs");
    const result = await blogsCollection
      .find({ privacy: "public" }, { projection: { slug: 1, _id:0 } })
      .toArray();
    if (result) {
      return NextResponse.json({
        message: "Success to find blogs.",
        status: 200,
        slugs: result,
      });
    } else {
      return NextResponse.json({ message: "Could not found.", status: 404 });
    }
  } catch (err) {
    // console.error("API Error:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};
