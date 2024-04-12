import { updateCurrentUser, updatePassword } from "firebase/auth";
import { NextRequest, NextResponse } from "next/server";
import { passwordRegex } from "@/lib/utils/constants";
import { auth, getCurrentUser } from "@/lib/firebase/firebase-admin";

export async function POST(request: NextRequest) {
  try {
    const currentUser = await getCurrentUser();

    console.log({ currentUser });

    if (!currentUser) throw new Error("Unauthorized");

    const requestBody = (await request.json()) as {
      newPassword?: string;
    };

    const newPassword = requestBody.newPassword;

    if (!newPassword || !passwordRegex.test(newPassword))
      throw new Error("Invalid data");

    // await updatePassword(currentUser, newPassword);
    const user = await auth.updateUser(currentUser.uid, {
      password: newPassword,
    });

    console.log("UPDATED_USER: ", { user });

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
