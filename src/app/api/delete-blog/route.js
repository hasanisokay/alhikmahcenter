import strictAdminCheck from "@/server-fns/strictAdminCheck.mjs";
import dbConnect from "@/services/dbConnect.mjs";
import { NextResponse } from "next/server";

export const DELETE = async (req) => {
  try {
    const searchParams = req.nextUrl.searchParams;
    const slug = searchParams.get("slug")?.trim() || "";
    const authResult = await strictAdminCheck("admin");
    if (authResult instanceof NextResponse) {
      return authResult;
    }
    const db = await dbConnect();
    const blogsCollection = await db.collection("blogs");
    const result = await blogsCollection.deleteOne({ slug });    
    if (result.deletedCount > 0) {
      return NextResponse.json({
        message: "Success to delete the blog.",
        status: 200,
      });
    } else {
      return NextResponse.json({ message: "Could not delete.", status: 404 });
    }
  } catch (err) {
    // console.error("API Error:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};
