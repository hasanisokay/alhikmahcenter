'use server'

import { jwtVerify } from "jose";
import { cookies } from "next/headers";

const authUser = async (requiredRole = null) => {
  try {
    const cookieStore = await cookies();
    const rawToken = cookieStore.get("token")?.value;
    if (!rawToken) {
      return { ok: false, status: 401, error: "Missing token" };
    }

    if (!rawToken.startsWith("Bearer ")) {
      return { ok: false, status: 401, error: "Invalid token format" };
    }

    const token = rawToken.replace("Bearer ", "").trim();
    const secret = new TextEncoder().encode(process.env.JWT_ENCRYPTION_KEY);
    let payload;

    const verifyOptions = {
      algorithms: ["HS256"],
      requiredClaims: ["sub", "role", "iat", "exp"],
    };

    try {
      const { payload: userPayload } = await jwtVerify(
        token,
        secret,
        verifyOptions
      );
      payload = userPayload;
    } catch (err) {
      console.error("JWT verification failed:", err);
      return { ok: false, status: 401, error: "Invalid or expired token" };
    }

    if (requiredRole && payload.role !== requiredRole) {
      return { ok: false, status: 403, error: "Forbidden (insufficient role)" };
    }

    return {
      ok: true,
      status: 200,
      user: {
        id: payload.sub,
        username: payload.username,
        name: payload.name,
        role: payload.role,
        status: payload.status,
      },
    };
  } catch (err) {
    console.error("Auth error:", err);
    return { ok: false, status: 500, error: "Server error" };
  }
};


export default authUser;