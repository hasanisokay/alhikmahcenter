"use server";

import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import dbConnect from "@/services/dbConnect.mjs";
import { ObjectId } from "mongodb";

const strictAdminCheck = async (requiredRole = "admin") => {
  try {
    const cookieStore = await cookies();
    const rawToken = cookieStore.get("token")?.value;

    if (!rawToken) {
      return NextResponse.json(
        { ok: false, error: "Missing token" },
        { status: 401 }
      );
    }

    if (!rawToken.startsWith("Bearer ")) {
      return NextResponse.json(
        { ok: false, error: "Invalid token format" },
        { status: 401 }
      );
    }

    const token = rawToken.replace("Bearer ", "").trim();
    const secret = new TextEncoder().encode(process.env.JWT_ENCRYPTION_KEY);

    const verifyOptions = {
      algorithms: ["HS256"],
      requiredClaims: ["sub", "role", "iat", "exp"],
    };

    let payload;
    try {
      const { payload: decoded } = await jwtVerify(
        token,
        secret,
        verifyOptions
      );
      payload = decoded;
    } catch (err) {
      console.error("JWT verification failed:", err);
      return NextResponse.json(
        { ok: false, error: "Invalid or expired token" },
        { status: 401 }
      );
    }

    if (requiredRole && payload.role !== requiredRole) {
      return NextResponse.json(
        { ok: false, error: "Forbidden (insufficient role)" },
        { status: 403 }
      );
    }

    const db = await dbConnect();
    const userCollection = db.collection("users");

    const userCheckInDb = await userCollection.findOne(
      { _id: new ObjectId(payload.sub) },
      { projection: { _id: 1 } }
    );

    if (!userCheckInDb?._id) {
      return NextResponse.json(
        { ok: false, error: "User not in db." },
        { status: 500 }
      );
    }

    // ✅ SUCCESS: return user object (not a Response)
    return {
      id: payload.sub,
      username: payload.username,
      name: payload.name,
      role: payload.role,
      status: payload.status,
    };
  } catch (err) {
    console.error("Auth error:", err);
    return NextResponse.json(
      { ok: false, error: "Server error" },
      { status: 500 }
    );
  }
};

export default strictAdminCheck;
