"use client";

import Button from "@/app/components/button";
import Input from "@/app/components/input";
import { Hearts, Info, MobileHearts, Verse } from "@/app/components/svgs";
import { H2, H3, H4, P } from "@/utils/typography";
import axios from "axios";
import { clsx } from "clsx";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { type ChangeEvent, useState, type FormEvent } from "react";
import toast from "react-hot-toast";
import { app } from "../config/firebase";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword  } from 'firebase/auth';

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

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const [formData, setFormData] = useState<formData>({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  const formDataHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const isDisabled = !(formData.email && formData.password);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, formData?.email, formData?.password);
      // User signed in successfully
      const user = userCredential.user;
      console.log('User signed in:', user);
    } catch (error) {
      console.error('Error signing in:');
    }

    // try {
    //   // NOTE: Check route value. Send request to the API endpoint accordingly
    //   let response = await axios.post("api/login", formData);
    //   console.log(response);
    //   toast.success("Login successful"); // Or sign-up successful
    //   router.push("/dashboard");
    // } catch (error) {
    //   console.log(error);
    // } finally {
    //   setLoading(false);
    // }
  };

  const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // User signed up successfully
      const user = userCredential.user;
      console.log('User signed up:', user);
    } catch (error) {
      console.error('Error signing up:');
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
            </div>
          </div>
        </div>
      </figure>

      <div className="h-full w-full flex flex-col lg:pt-20 lg:pb-8 lg:col-span-2 items-center justify-center overflow-auto">
        <div className="flex w-[90%] lg:w-auto_ lg:px-0 mx-auto flex-col items-start gap-[32px]">
          {/* <H2 className=''>Sign Up</H2> */}
          <h2 className="font-matter text-black leading-normal font-semibold md:text-[48px] text-center md:-tracking-[0.96px] -tracking-[0.64px] text-[32px]">
            Sign {route === "sign-up" ? "Up" : "In"}
          </h2>
          
            {route === "sign-up" ? (
              <form
              className="flex flex-col py-8 lg:py-0 w-full items-start md:items-center gap-[22px]"
              onSubmit={handleSignUp}
            >
             
              
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              <button type="submit">Sign Up</button>
      
            </form>
            ) : (
<form onSubmit={handleSubmit}>  <fieldset className="flex flex-col gap-3 w-full">
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

                {/* <Button
                  disabled={isDisabled}
                  loading={loading}
                  className="capitalize w-full"
                >
                  {"Sign In"}
                </Button> */}

                <button type="submit">Sign In</button>
            </fieldset></form>
            )}
          
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
    </main>
  );
}
