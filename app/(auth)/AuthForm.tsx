"use client";

import Button from "@/app/components/button";
import Input from "@/app/components/input";
import { Hearts, Info, MobileHearts, Verse } from "@/app/components/svgs";
import { H2, H3, H4, P } from "@/lib/utils/typography";
import { clsx } from "clsx";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { type ChangeEvent, useState, type FormEvent } from "react";
// import toast from "react-hot-toast";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { app, db } from "../config/firebase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import BibleVerseComponent from "@/lib/utils/bibleApi";

interface formData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

type Props = {
  route: "sign-up" | "sign-in";
};

const auth = getAuth(app);

export default function AuthForm({ route = "sign-in" }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const [formData, setFormData] = useState<formData>({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  const formDataHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const isDisabled =
    (route === "sign-in" && !(formData.email && formData.password)) ||
    (route === "sign-up" &&
      !(
        formData?.email &&
        formData?.password &&
        formData?.firstName &&
        formData?.lastName
      ));

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    try {
      if (route === "sign-in") {
        // HANDLE SIGN-IN LOGIC
        // const userCredential = await signInWithEmailAndPassword(
        //   auth,
        //   formData?.email,
        //   formData?.password
        // );
        // // User signed in successfully
        // const user = userCredential.user;
        // const idToken = await userCredential.user.getIdToken();

        // const response = await fetch("/api/auth/sign-in", {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify({ idToken }),
        // });
        const response = await fetch("/api/auth/sign-in", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        });

        const resBody = await response.json();

        const user = resBody.data;

        if (!user) return;

        console.log({ resBody });

        // Store user details in local storage
        localStorage.setItem("currentUser", JSON.stringify(user));

        // Add success message
        // alert("Login Successful");
        toast.success("Login Successful");
        console.log("User signed in:", user);
        console.log("Success: User signed in successfully.");
        router.push("/dashboard");
      } else {
        // Handle sign-up logic
        const response = await fetch("/api/auth/sign-up", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData?.email,
            firstname: formData?.firstName,
            lastname: formData?.lastName,
          }),
        });

        const resBody = await response.json();

        const user = resBody.data;

        if (!user) return;

        console.log({ resBody });

        // alert("signup successful");
        toast.success("signup successful!🎉");
        router.push("/signin");
      }
    } catch (error: any) {
      // Handle sign-in error
      let errorMessage = "Login not successful. Please try again later.";
      switch (error.code) {
        case "auth/invalid-email":
          errorMessage = "Invalid email address.";
          break;
        case "auth/user-disabled":
          errorMessage = "User account is disabled.";
          break;
        case "auth/user-not-found":
        case "auth/wrong-password":
          errorMessage = "Invalid email or password.";
          break;
        case "auth/email-already-in-use":
          errorMessage = "Email already in use";
          break;
        case "auth/weak-password":
          errorMessage = "Weak password";
          break;
        // Add more cases for other Firebase error codes as needed
        default:
          break;
      }
      // Display error message
      // alert(errorMessage);
      toast(errorMessage);
      console.error("Error signing in:", error);
      console.error("Error: Sign-in failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      className={clsx(
        "w-full lg:h-screen flex flex-col lg:grid lg:grid-cols-5 justify-center items-center gap-8"
      )}
    >
      <figure className="col-span-3 -mt-11 py-16 lg:py-0 lg:mt-0 md:px-0 text-[#FFFBF9] lg:h-full bg-[url(/images/overlay.png)] bg-right bg-no-repeat flex items-center justify-center flex-col w-full lg:w-auto bg-[length:100%]">
        <div className="flex md:w-[90%] lg:w-[70%] flex-col items-center lg:items-start justify-center">
          <div className="lg:gap-11 gap-4 lg:w-3/4 w-5/6 md:w-full flex flex-col">
            <div className="flex flex-col gap-5">
              <span className="flex w-[3rem] h-[3rem] p-4 items-center justify-center rounded-xl bg-[#FEF6F4] lg:bg-lg-heart lg:backdrop-blur-[6px]">
                <span className="hidden lg:inline-block">
                  <Hearts className="!stroke-primary-14" />
                </span>
                <span className="lg:hidden">
                  <MobileHearts className="!stroke-primary" />
                </span>
              </span>
              <h3 className="font-aeonikBold leading-[55px] lg:leading-[144px] text-[3rem] lg:text-[7.5rem] font-bold md:max-w-[447px] tracking-[-0.06rem] lg:-tracking-[5%]">
                Emerald{" "}
                <span className="block md:hidden !h-1 whitespace-pre"> </span>{" "}
                Diary
              </h3>
            </div>
            <div
              className="group lg:w-[566px] rounded-[12px] flex pt-[16px] pr-[33px] pb-[16px] pl-[12px] lg:p-0 lg:pr-2 items-center justify-start gap-4 transition-all duration-300 hover:scale-[0.99] backdrop-blur"
              style={{
                background: "rgba(255, 255, 255, 0.06)",
              }}
            >
              <figure className="hidden lg:inline-block">
                <Verse className="!stroke-primary-14" />
              </figure>

              <div className="flex flex-col items-start gap-[12px] lg:gap-[24px]">
                <H3 className="text-[#FFFBF9] text-[20px] font-bold tracking-[-0.42px]">
                  Verse of the Day
                </H3>
                <P className="text-[#CCCCCC] text-[12px] font-normal leading-[140%] lg:max-w-[384px]">
                  Behold, God is my salvation; I will trust, and will not be
                  afraid; for the LORD GOD is my strength and my song, and he
                  has become my salvation.
                </P>
                <H4 className="text-#FFFBF9 mt-[9px]">Isaiah 12 : 2</H4>
              </div>
              {/* <BibleVerseComponent /> */}
            </div>
          </div>
        </div>
      </figure>

      <div className="h-full w-full flex flex-col lg:pt-20 lg:pb-8 lg:col-span-2 items-center justify-center overflow-auto">
        <div className="flex w-[90%] lg:w-auto_ lg:px-0 mx-auto flex-col items-start gap-[32px]">
          <h2 className="font-matter text-black leading-normal font-semibold md:text-[48px] text-center md:-tracking-[0.96px] -tracking-[0.64px] text-[32px]">
            Sign {route === "sign-up" ? "Up" : "In"}
          </h2>

          <form
            className="flex flex-col py-8 lg:py-0 w-full items-start md:items-center gap-[22px]"
            onSubmit={handleSubmit}
          >
            {/* SIGN UP */}
            {route === "sign-up" && (
              <>
                <fieldset className="flex flex-col gap-3 w-full">
                  <div className="flex flex-row justify-between w-full">
                    <label className="text-black font-aeonik -tracking-[0.28px] font-normal text-[14px]">
                      First Name
                    </label>
                    <Info />
                  </div>
                  <Input
                    type="text"
                    name="firstName"
                    value={formData?.firstName}
                    onChange={formDataHandler}
                    placeholder="Enter your First Name"
                  />
                </fieldset>
                <fieldset className="flex flex-col gap-3 w-full">
                  <div className="flex flex-row justify-between w-full">
                    <label className="text-black font-aeonik -tracking-[0.28px] font-normal text-[14px]">
                      Last Name
                    </label>
                    <Info />
                  </div>
                  <Input
                    type="text"
                    name="lastName"
                    value={formData?.lastName}
                    onChange={formDataHandler}
                    placeholder="Enter your Last Name"
                  />
                </fieldset>
                <fieldset className="flex flex-col gap-3 w-full">
                  <div className="flex flex-row justify-between w-full">
                    <label className="text-black font-aeonik -tracking-[0.28px] font-normal text-[14px]">
                      Email
                    </label>
                    <Info />
                  </div>
                  <Input
                    type="email"
                    name="email"
                    value={formData?.email}
                    onChange={formDataHandler}
                    placeholder="Enter your Email Address"
                  />
                </fieldset>
                <fieldset className="flex flex-col gap-3 w-full">
                  <div className="flex flex-row justify-between w-full">
                    <label className="text-black font-aeonik -tracking-[0.28px] font-normal text-[14px]">
                      Password
                    </label>
                    <Info />
                  </div>
                  <Input
                    type="password"
                    name="password"
                    value={formData?.password}
                    onChange={formDataHandler}
                    placeholder="Enter your Password"
                  />
                </fieldset>
                <Button
                  disabled={isDisabled}
                  loading={loading}
                  className="capitalize w-full"
                >
                  {"Sign up"}
                </Button>
              </>
            )}

            {/* sign in */}
            {route === "sign-in" && (
              <>
                <fieldset className="flex flex-col gap-3 w-full">
                  <div className="flex flex-row justify-between">
                    <label className="text-black font-aeonik -tracking-[0.28px] font-normal text-[14px]">
                      Email Address
                    </label>
                    <Info />
                  </div>
                  <Input
                    type="email"
                    name="email"
                    value={formData?.email}
                    onChange={formDataHandler}
                    placeholder="Enter your Email Address"
                  />
                </fieldset>
                <fieldset className="flex flex-col gap-3 w-full">
                  <div className="flex flex-row justify-between w-full">
                    <label className="text-black font-aeonik -tracking-[0.28px] font-normal text-[14px]">
                      Password
                    </label>
                    <Info />
                  </div>
                  <Input
                    type="password"
                    name="password"
                    value={formData?.password}
                    onChange={formDataHandler}
                    placeholder="Enter Password"
                  />
                </fieldset>
                <fieldset className="w-full">
                  <Button
                    disabled={isDisabled}
                    loading={loading}
                    className="capitalize w-full"
                  >
                    {"Sign In"}
                  </Button>
                </fieldset>
              </>
            )}
          </form>

          <p className="text-gray-700 w-fit mx-auto">
            {route === "sign-in"
              ? "Don't have an account?"
              : "Already have an account?"}{" "}
            <Link
              href={route === "sign-in" ? "/signup" : "/signin"}
              className="text-primary font-semibold"
            >
              {route === "sign-in" ? "Sign Up" : "Sign In"}
            </Link>
          </p>
        </div>
      </div>

      {/* TOASTIFY */}
      <ToastContainer />
    </main>
  );
}
