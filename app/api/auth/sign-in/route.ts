import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// import { APIResponse } from "@/types";
import { createSessionCookie } from "@/lib/firebase/firebase-admin";
import { auth } from "@/lib/firebase/firebase-client";
import { signInWithEmailAndPassword } from "firebase/auth";

export async function POST(request: NextRequest) {
  try {
    const reqBody = (await request.json()) as {
      email: string;
      password: string;
    };

    const userCredential = await signInWithEmailAndPassword(
      auth,
      reqBody?.email,
      reqBody?.password
    );
    // User signed in successfully
    const user = userCredential.user;
    const idToken = await userCredential.user.getIdToken();

    // const reqBody = (await request.json()) as {email:string idToken: string };

    // const idToken = reqBody.idToken;

    const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days

    const sessionCookie = await createSessionCookie(idToken, { expiresIn });

    cookies().set("__session", sessionCookie, {
      maxAge: expiresIn,
      httpOnly: true,
      secure: true,
    });

    //   return NextResponse.json<APIResponse<string>>({
    return NextResponse.json({
      success: true,
      message: "Signed in successfully.",
      data: { uid: user.uid, displayName: user.displayName },
    });
  } catch (error) {
    console.error("SIGN_IN: ", { error });
    return NextResponse.json({
      success: false,
      data: "Could'nt sign in.",
    });
  }
}
