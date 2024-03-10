import { NextResponse } from "next/server";
import { cookies } from "next/headers";

// import { APIResponse } from "@/types";
import { revokeAllSessions } from "@/lib/firebase/firebase-admin";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase/firebase-client";

export async function GET() {
  const sessionCookie = cookies().get("__session")?.value;

  if (!sessionCookie)
    //   return NextResponse.json<APIResponse<string>>({
    return NextResponse.json(
      { success: false, error: "Session not found." },
      { status: 400 }
    );

  await signOut(auth);

  cookies().delete("__session");

  await revokeAllSessions(sessionCookie);

  //   return NextResponse.json<APIResponse<string>>({
  return NextResponse.json({
    success: true,
    data: "Signed out successfully.",
  });
}
