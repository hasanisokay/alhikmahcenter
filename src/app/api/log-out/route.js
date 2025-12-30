import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export const POST = async () => {
  try {
    // Clear auth cookie
    (await cookies()).set({
      name: "token",
      value: "",
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      maxAge: 0, 
      path: "/",
    });

    return NextResponse.json(
      { message: "Logout successful", status: 200 },
      { status: 200 }
    );
  } catch (err) {
    console.error("Logout Error:", err);
    return NextResponse.json(
      { message: "Server error during logout" },
      { status: 500 }
    );
  }
};
