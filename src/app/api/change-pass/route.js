import dbConnect from "@/services/dbConnect.mjs";
import { NextResponse } from "next/server";
import argon2 from "argon2";
import strictAdminCheck from "@/server-fns/strictAdminCheck.mjs";

export const POST = async (req) => {
  try {
    const body = await req.json();
    const { username, newPassword, oldPassword } = body;
    if (!username || !newPassword || !oldPassword) {
      return NextResponse.json(
        { message: "Missing username or password" },
        { status: 400 }
      );
    }
        const authResult = await strictAdminCheck("admin");
    if (authResult instanceof NextResponse) {
      return authResult;
    }

    // MSelim!123
    const db = await dbConnect();
    const userCollection = db.collection("users");
    const user = await userCollection.findOne({ username });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    const valid = await argon2.verify(user.password, oldPassword);

    if (!valid) {
      return NextResponse.json(
        { message: "Invalid old password" },
        { status: 401 }
      );
    }
    const newPasswordHash = await argon2.hash(newPassword, {
      type: argon2.argon2id,
    });
    const result = await userCollection.updateOne(
      { username },
      { $set: { password: newPasswordHash } }
    );

    if (result.modifiedCount === 0) {
      return NextResponse.json(
        { message: "Password was already the same" },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { message: "Password changed successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.error("API Error:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};
