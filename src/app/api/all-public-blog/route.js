import dbConnect from "@/services/dbConnect.mjs";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    const searchParams = req.nextUrl.searchParams;
    const limit = parseInt(searchParams.get("limit")) || 10;
    const keyword = searchParams.get("keyword") || "";
    const page = parseInt(searchParams.get("page")) || 1;
    const skip = (page - 1) * limit;
    const query = {
      privacy: "public",
      ...(keyword && {
        title: { $regex: keyword, $options: "i" },
        content: { $regex: content, $options: "i" },
      }),
    };

    const db = await dbConnect();
    const blogsCollection = await db.collection("blogs");

    const blogs = await blogsCollection
      .find(query)
      .skip(skip)
      .limit(limit)
      .toArray();
    const total = await blogsCollection.countDocuments(query);
    if (blogs) {
      return NextResponse.json({
        message: "Success to find blogs.",
        status: 200,
        blogs,
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
      });
    } else {
      return NextResponse.json({ message: "Could not found.", status: 404 });
    }
  } catch (err) {
    console.error("API Error:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};
