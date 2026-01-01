import strictAdminCheck from "@/server-fns/strictAdminCheck.mjs";
import dbConnect from "@/services/dbConnect.mjs";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export const PUT = async (req) => {
  try {
    const body = await req.json();
    const db = await dbConnect();
    const blogCollection = await db.collection("blogs");
    const { slug, originalSlug, ...dataWithoutSlug } = body;
    const authResult = await strictAdminCheck("admin");
    const updatedData = dataWithoutSlug;
    if (authResult instanceof NextResponse) {
      return authResult;
    }
    updatedData.slug = slug;
    updatedData.lastUpdated = new Date();
    const result = await blogCollection.updateOne(
      { slug: originalSlug },
      { $set: updatedData }
    );

    if (result?.modifiedCount > 0) {
      return NextResponse.json({
        message: "Success to update the blog.",
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
