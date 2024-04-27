import { updatePassword } from "firebase/auth";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/firebase/firebase-client";
import { passwordRegex } from "@/lib/utils/constants";
import { getCurrentUser } from "@/lib/firebase/firebase-admin";

export async function POST(request: NextRequest) {
  try {
    const curUser = await getCurrentUser();

    console.log({ curUser });

    const currentUser = auth.currentUser;
    if (!currentUser) throw new Error("Unauthorized");

    const requestBody = (await request.json()) as {
      newPassword?: string;
    };

    const newPassword = requestBody.newPassword;

    if (!newPassword || !passwordRegex.test(newPassword))
      throw new Error("Invalid data");

    await updatePassword(currentUser, newPassword);

    return NextResponse.json({
      success: true,
      message: "Password Updated Successfully",
    });
  } catch (error) {
    const errorM = error as Error;
    console.error("CHANGE_PASSWORD_Error:", { errorM });
    return NextResponse.json({ success: false, message: errorM.message });
  }
}
