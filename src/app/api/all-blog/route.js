import strictAdminCheck from "@/server-fns/strictAdminCheck.mjs";
import dbConnect from "@/services/dbConnect.mjs";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const authResult = await strictAdminCheck("admin");
    if (authResult instanceof NextResponse) {
      return authResult;
    }
    const db = await dbConnect();
    const blogsCollection = await db.collection("blogs");
  const result = await blogsCollection
  .find({}, { projection: { title: 1, slug: 1, _id: 1 } })
  .toArray();


    if (result) {
      return NextResponse.json({
        message: "Success to find blogs.",
        status: 200,
        blogs: result,
      });
    } else {
      return NextResponse.json({ message: "Could not found.", status: 404 });
    }
  } catch (err) {
    // console.error("API Error:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};
