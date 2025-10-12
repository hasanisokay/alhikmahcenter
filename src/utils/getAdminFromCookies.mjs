"use server";
import { cookies } from "next/headers";

const getAdminFromCookies = async () => {
  const cookieStore = await cookies();
  const adminDetails = cookieStore.get("admin")?.value;
  return adminDetails || null;
};

export default getAdminFromCookies;
