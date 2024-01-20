"use client";

import Button from "@/app/components/button";
import Input from "@/app/components/input";
import { Hearts, Info, MobileHearts, Verse } from "@/app/components/svgs";
import { H2, H3, H4, P } from "@/utils/typography";
import axios from "axios";
import { useRouter } from "next/navigation";
import { type ChangeEvent, useState, type FormEvent } from "react";
import toast from "react-hot-toast";

interface formData {
  email: string;
  password: string | number;
  firstName: string;
  lastName: string;
}

export default function SignUp() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

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
      let response = await axios.post("api/login", formData);
      console.log(response);
      toast.success("Login successful");
      router.push("/dashboard");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="w-full lg:h-screen flex flex-col lg:grid lg:grid-cols-5 justify-center items-center gap-8">
      <figure className="col-span-3 -mt-11 lg:mt-0 py-16 md:px-0 text-[#FFFBF9] lg:h-full bg-[url(/images/overlay.png)] bg-right bg-no-repeat flex items-center justify-center flex-col w-full lg:w-auto bg-[length:100%]">
        <div className="flex md:w-[90%] lg:w-[70%] flex-col items-center lg:items-start justify-center">
          <div className="lg:gap-11 gap-4 lg:w-3/4 w-5/6 md:w-full flex flex-col">
            <div className="flex flex-col gap-5">
              <span className="flex w-[3rem] h-[3rem] p-4 items-center justify-center rounded-xl bg-[#FEF6F4] lg:bg-lg-heart lg:backdrop-blur-[6px]">
                <span className="hidden lg:inline-block">
                  <Hearts />
                </span>
                <span className="lg:hidden">
                  <MobileHearts />
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
                <Verse />
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

      <div className="h-full w-full flex flex-col lg:col-span-2 items-center justify-center">
        <div className="flex w-[90%] lg:w-auto lg:px-0 flex-col items-start gap-[32px]">
          {/* <H2 className=''>Sign Up</H2> */}
          <h2 className="font-matter text-black leading-normal font-semibold md:text-[48px] text-center md:-tracking-[0.96px] -tracking-[0.64px] text-[32px]">
            Sign In
          </h2>
          <form
            className="flex flex-col py-8 lg:py-0 w-full items-start md:items-center gap-[22px]"
            onSubmit={handleSubmit}
          >
            <div className="w-[382px] lg:w-[420px] flex-wrap flex items-start gap-[12px] lg:gap-[24px] self-stretch">
              <fieldset className="flex flex-col gap-3">
                <div className="flex flex-row justify-between">
                  <label className="text-black font-aeonik -tracking-[0.28px] font-normal text-[14px]">
                    Firstname
                  </label>
                  <Info />
                </div>
                <Input
                  type="text"
                  name="firstName"
                  value={formData?.firstName}
                  onChange={formDataHandler}
                  placeholder="Enter Firstname"
                  className="w-[191px] lg:!w-[198px]"
                />
              </fieldset>
              <fieldset className="flex flex-col gap-3">
                <div className="flex flex-row justify-between">
                  <label className="text-black font-aeonik -tracking-[0.28px] font-normal text-[14px]">
                    Lastname
                  </label>
                  <Info />
                </div>
                <Input
                  type="text"
                  name="lastName"
                  value={formData?.lastName}
                  onChange={formDataHandler}
                  placeholder="Enter Lastname"
                  className="w-[191px] lg:!w-[198px]"
                />
              </fieldset>
            </div>
            <fieldset className="flex flex-col gap-3 w-fit">
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
            <fieldset className="flex flex-col gap-3 w-fit">
              <div className="flex flex-row justify-between">
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
              <Button disabled={isDisabled} loading={loading}>
                Sign In
              </Button>
            </fieldset>
          </form>
        </div>
      </div>
    </main>
  );
}
