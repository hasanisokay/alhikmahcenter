import authUser from "@/server-fns/authUser.mjs";
import strictAdminCheck from "@/server-fns/strictAdminCheck.mjs";
import { NextResponse } from "next/server";

export async function GET() {
  const auth = await authUser("admin");
  await strictAdminCheck();
  if (!auth.ok) {
    return NextResponse.json(
      { error: auth.error, message: "failed admin auth" },
      { status: auth.status }
    );
  }
  return NextResponse.json(
    {
      message: "Protected",
      user: auth.user,
    },
    { status: 200 }
  );
}
