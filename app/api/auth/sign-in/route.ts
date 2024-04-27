import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// import { APIResponse } from "@/types";
import {
  auth,
  createSessionCookie,
  getCurrentUser,
} from "@/lib/firebase/firebase-admin";
// import { auth } from "@/lib/firebase/firebase-client";
import { signInWithEmailAndPassword } from "firebase/auth";

export async function POST(request: NextRequest) {
  try {
    // const reqBody = (await request.json()) as {
    //   email: string;
    //   password: string;
    // };

    // const userCredential = await signInWithEmailAndPassword(
    //   auth,
    //   reqBody?.email,
    //   reqBody?.password
    // );
    // // User signed in successfully
    // const user = userCredential.user;
    // const idToken = await userCredential.user.getIdToken();

    // console.log("UserCredential: ", user);

    const reqBody = (await request.json()) as {
      // email: string;
      idToken: string;
    };

    const idToken = reqBody.idToken;

    const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days

    const currentUser = await getCurrentUser(idToken);

    if (!currentUser)
      return NextResponse.json<APIResponse<Partial<User>>>(
        {
          success: true,
          message: "Unauthorized!",
          // data: { uid: currentUser.uid, displayName: user.displayName as string },
        },
        { status: 401 }
      );

    const user = await auth.getUser(currentUser.uid);

    const sessionCookie = await createSessionCookie(idToken, { expiresIn });

    cookies().set("__session", sessionCookie, {
      maxAge: expiresIn,
      httpOnly: true,
      secure: true,
    });

    //   return NextResponse.json<APIResponse<string>>({
    return NextResponse.json<APIResponse<Partial<User>>>({
      success: true,
      message: "Signed in successfully.",
      data: {
        displayName: user.displayName,
        email: user.email,
        photo: user.photoURL,
        uid: user.uid,
      },
    });
  } catch (error) {
    const errorM = error as Error;
    console.error("SIGN_IN: ", { error });
    return NextResponse.json<APIResponse>({
      success: false,
      message: errorM.message,
    });
  }
}
