import strictAdminCheck from "@/server-fns/strictAdminCheck.mjs";
import dbConnect from "@/services/dbConnect.mjs";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    const searchParams = req.nextUrl.searchParams;
    const slug = searchParams.get("slug")?.trim() || "";
    const db = await dbConnect();
    const blogsCollection = await db.collection("blogs");
    const result = await blogsCollection.findOne({ slug });
    if (result?.privacy !== "public") {
      const authResult = await strictAdminCheck("admin");
      if (authResult instanceof NextResponse) {
        return authResult;
      }
    }

    if (result) {
      return NextResponse.json({
        message: "Success to find the blog.",
        status: 200,
        blog: result,
      });
    } else {
      return NextResponse.json({ message: "Could not found.", status: 404 });
    }
  } catch (err) {
    // console.error("API Error:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};
