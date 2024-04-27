import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// import { APIResponse } from "@/types";
import {
  auth,
  createSessionCookie,
  getCurrentUser,
} from "@/lib/firebase/firebase-admin";
import { db, storage } from "@/lib/firebase/firebase-client";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import {
  DocumentData,
  Timestamp,
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { UserRecord } from "firebase-admin/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

type PatchProps = {
  params: {
    userId: string;
  };
};

type UserData = {
  firstname: string;
  lastname: string;
  email: string;
};

const serializeUserData = async (
  data: UserData
): Promise<Partial<UserData>> => {
  const userData = {
    firstname: data.firstname,
    lastname: data.lastname,
    email: data.email,
  };

  const serializedUserData: any = {};

  Object.entries(userData).forEach((item) => {
    if (item[1]) {
      serializedUserData[item[0]] = item[1];
    }
  });

  return serializedUserData;
};

export async function PATCH(
  request: NextRequest,
  { params: { userId } }: PatchProps
) {
  try {
    // const reqBody = (await request.json()) as {
    //   email: string;
    //   firstName: string;
    //   lastName: string;
    //   photo: string;
    // };

    const currentUser = await getCurrentUser();

    console.log({ currentUser, userId });

    if (!currentUser || currentUser?.uid !== userId)
      return NextResponse.json(
        {
          message: "Unauthorized",
        },
        {
          status: 401,
        }
      );

    const formData = await request.formData();

    const firstname = formData.get("firstname") as string;
    const lastname = formData.get("lastname") as string;
    const email = formData.get("email") as string;
    let photoURL = "";

    console.log({ firstname, lastname, email });

    const file = formData.get("photo") as File;
    if (file && file.name) {
      console.log({ fileName: file.name, file });

      const storageRef = ref(storage, "images/" + file.name);
      // imageFile.name
      await uploadBytes(storageRef, file);

      // Get the download URL of the uploaded image
      const imageUrl = await getDownloadURL(storageRef);
      console.log({ imageUrl });
      photoURL = imageUrl;
    }

    const q = query(
      collection(db, "users"),
      where("uid", "==", currentUser.uid)
    );

    const querySnapshot = await getDocs(q);
    const userDoc = querySnapshot.docs[0];
    const currentUserDetails = !querySnapshot.empty
      ? (userDoc.data() as {
          firstname: string;
          lastname: string;
          email: string;
        })
      : undefined;

    console.log({ currentUserDetails });

    // const user = currentUser;
    const updatedUser = await auth.updateUser(currentUser.uid, {
      displayName: `${firstname || currentUserDetails?.firstname} ${
        lastname || currentUserDetails?.lastname
      }`,
      email: email || currentUserDetails?.email,
      photoURL: photoURL || currentUser.picture,
    });

    const serializedUserData = await serializeUserData({
      firstname,
      lastname,
      email,
    });

    await updateDoc(doc(db, "users", userDoc.id), {
      ...serializedUserData,
      // timestamp: Timestamp.fromDate(new Date()),
    });

    console.log({ updatedUser });

    // await addDoc(collection(db, "users"), {
    //   uid: user?.uid,
    //   email: user?.email,
    //   firstname: reqBody?.firstName,
    //   lastname: reqBody?.lastName,
    // });

    // const reqBody = (await request.json()) as {email:string idToken: string };
    return NextResponse.json(
      {
        displayName: updatedUser.displayName,
        email: updatedUser.email,
        photo: updatedUser.photoURL,
        photoURL,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("UPDATE_PROFILE: ", { error });
    return NextResponse.json(
      {
        success: false,
        data: "Could'nt update profile.",
      },
      {
        status: 500,
      }
    );
  }
}
