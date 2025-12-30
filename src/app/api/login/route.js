import dbConnect from "@/services/dbConnect.mjs";
import { NextResponse } from "next/server";
import argon2 from "argon2";
import { SignJWT } from "jose";
import { cookies } from "next/headers";

export const POST = async (req) => {
  try {
    const body = await req.json();
    const { username, password } = body;
    if (!username || !password) {
      return NextResponse.json(
        { message: "Missing username or password" },
        { status: 400 }
      );
    }
    // MSelim!123
    const db = await dbConnect();
    const userCollection = db.collection("users");
    const user = await userCollection.findOne({ username });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    const valid = await argon2.verify(user.password, password);

    if (!valid) {
      return NextResponse.json(
        { message: "Invalid password" },
        { status: 401 }
      );
    }
    const { password: removed, ...userToSend } = user;

    const secret = new TextEncoder().encode(process.env.JWT_ENCRYPTION_KEY);
    const token = await new SignJWT({
      sub: user._id.toString(),
      username: user.username,
      status: user?.status,
      name: user.name,
      role: user.role,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("60d")
      .sign(secret);
    (await cookies()).set({
      name: "token",
      value: `Bearer ${token}`,
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 60,
    });

    return NextResponse.json(
      { message: "Login success", user: userToSend, status:200 }
    );
  } catch (err) {
    console.error("API Error:", err);
    return NextResponse.json({ message: "Server error", status: 500, err });
  }
};
