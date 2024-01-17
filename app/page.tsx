'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useState } from 'react';
import { H2 } from '@/utils/typography';
import toast from 'react-hot-toast';
import axios from 'axios';
import { Hearts, Info, MobileHearts, Verse } from '@/components/svgs';
import Input from '@/components/input';
import Button from '@/components/button';

export default function SignIn() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
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
      let response = await axios.post('api/login', formData);
      console.log(response);
      toast.success('Login successful');
      router.push('/dashboard');
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className='flex flex-row justify-center items-center gap-[80px]'>
      <div className='py-[172px] px-[88px] flex flex-col items-start gap-[32px]'>
        <H2>Sign In</H2>
        {/* <h2 className='font-matter text-black leading-normal font-semibold md:text-[48px] text-center md:-tracking-[0.96px] -tracking-[0.64px] text-[32px]'>
          Sign In
        </h2> */}

        <form
          className='flex flex-col items-center md:gap-[22px]'
          onSubmit={handleSubmit}
        >
          <fieldset className='flex flex-col gap-3'>
            <div className='flex flex-row justify-between'>
              <label className='text-black font-aeonik -tracking-[0.28px] font-normal text-[14px]'>
                Email Address
              </label>
              <Info />
            </div>
            <Input
              type='email'
              name='email'
              value={formData?.email}
              onChange={formDataHandler}
              placeholder='Enter your Email Address'
            />
          </fieldset>
          <fieldset className='flex flex-col gap-3'>
            <div className='flex flex-row justify-between'>
              <label className='text-black font-aeonik -tracking-[0.28px] font-normal text-[14px]'>
                Password
              </label>
              <Info />
            </div>
            <Input
              type='password'
              name='password'
              value={formData?.password}
              onChange={formDataHandler}
              placeholder='Enter Password'
            />
          </fieldset>
          <fieldset>
            <Button disabled={isDisabled} loading={loading}>
              Sign In
            </Button>
          </fieldset>
        </form>
      </div>

      <figure
        className='col-span-3 text-[#FFFBF9] h-full bg-[url(/images/bimbo.png)] bg-right bg-no-repeat flex items-center justify-center flex-col w-full lg:w-auto'
        style={{ backgroundSize: '95%' }}
      >
        <div className='flex w-[70%] flex-col items-start justify-center'>
          <div className='gap-11 w-3/4 flex flex-col'>
            <div className='flex flex-col gap-5'>
              <span
                className='flex w-[3rem] h-[3rem] p-2 items-center justify-center rounded-xl bg-[#FEF6F4] lg:bg-lg-heart lg:backdrop-blur-[6px]'
                // style={{ background: "rgba(254, 246, 244, 0.12)", backdropFilter: "blur(6px)" }}
              >
                <span className='hidden lg:inline-block'>
                  <Hearts />
                </span>
                <span className='lg:hidden'>
                  <MobileHearts />
                </span>
              </span>
              <p className='font-aeonik text-[7.5rem] leading-[6.5rem] font-bold tracking-[-0.375rem]'>
                Emerald Diary
              </p>
            </div>
            <div
              className='rounded-2xl flex pr-2 items-center justify-start gap-4'
              style={{
                background: 'rgba(255, 255, 255, 0.06)',
                backdropFilter: 'blur(6px)',
              }}
            >
              <Verse />
              <div>
                <p className='font-aeonik text-[0.875rem] leading-[155%]'>
                  <b className='font-bold text-[1.25rem] mb-2.5 block'>
                    Verse of the Day
                  </b>
                  Behold, God is my salvation; I will trust, and will not be
                  afraid; for the LORD GOD is my strength and my song, and he
                  has become my salvation.
                  <span className='font-medium text-[1rem] mt-2.5 block'>
                    Isaiah 12 : 2
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </figure>
    </main>
  );
}
