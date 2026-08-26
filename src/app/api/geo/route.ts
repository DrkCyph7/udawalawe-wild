import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  // Extract client IP from headers
  const forwardedFor = request.headers.get("x-forwarded-for");
  let ip = forwardedFor ? forwardedFor.split(",")[0].trim() : request.headers.get("x-real-ip");

  // If local or not found, try to use a fallback or leave empty
  if (!ip) {
    ip = null;
  }

  try {
    // If we are on localhost, we cannot query ipapi for "::1"
    let geoUrl = "https://ipapi.co/json/";
    if (ip && ip !== "::1" && ip !== "127.0.0.1") {
      geoUrl = `https://ipapi.co/${ip}/json/`;
    }

    const res = await fetch(geoUrl, {
      headers: {
        "User-Agent": "NodeJS",
        Accept: "application/json",
      },
    });

    if (res.ok) {
      const data = await res.json();
      if (data.error) {
        return NextResponse.json({ ip });
      }
      return NextResponse.json({
        ip: data.ip || ip,
        country_code: data.country_code,
        country_name: data.country_name,
        city: data.city,
        timezone: data.timezone,
      });
    }
  } catch (error) {
    console.error("Server-side geo lookup failed:", error);
  }

  return NextResponse.json({ ip });
}
