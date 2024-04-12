import { NextResponse } from "next/server";
import { cookies, headers } from "next/headers";

// import { APIResponse } from "@/types";
import { auth, revokeAllSessions } from "@/lib/firebase/firebase-admin";
import { revokeAccessToken, signOut } from "firebase/auth";
import { auth as clientAuth } from "@/lib/firebase/firebase-client";

export async function POST() {
  try {
    const headersList = headers();
    const idToken = headersList.get("authorization");
    console.log("----AUTH_TOKEN------ | LOGOUT", { idToken });

    if (!idToken) throw new Error("Invalid Auth Token");

    const sessionCookie = cookies().get("__session")?.value;

    // if (!sessionCookie)
    //   //   return NextResponse.json<APIResponse<string>>({
    //   return NextResponse.json(
    //     { success: false, error: "Session not found." },
    //     { status: 400 }
    //   );

    cookies().delete("__session");

    if (sessionCookie) await revokeAllSessions(sessionCookie);

    // NOTE: Check if these are necessary
    await signOut(clientAuth);
    revokeAccessToken(clientAuth, idToken);

    await auth.revokeRefreshTokens(idToken);

    //   return NextResponse.json<APIResponse<string>>({
    return NextResponse.json({
      success: true,
      data: "Signed out successfully.",
    });
  } catch (error) {
    const err = error as Error;
    return NextResponse.json({
      success: false,
      message: err.message,
    });
  }
}
