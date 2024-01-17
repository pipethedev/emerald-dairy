'use client';

import { useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useState } from 'react';
import { H2, H3, H4, P } from '@/utils/typography';
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
    <main className='w-full h-screen flex flex-col-reverse lg:grid grid-cols-5 justify-center items-center gap-8'>
      <div className='h-full flex flex-col col-span-2 items-center justify-center'>
        <div className='flex flex-col items-start gap-[32px]'>
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
              <h3 className='font-aeonikBold leading-[144px] text-[7.5rem] font-bold md:max-w-[447px] -tracking-[5%]'>
                Emerald Diary
              </h3>
            </div>
            <div
              className='group w-[566px] rounded-2xl flex pr-2 items-center justify-start gap-4 transition-all duration-300 hover:scale-[0.99]'
              style={{
                background: 'rgba(255, 255, 255, 0.06)',
                backdropFilter: 'blur(6px)',
              }}
            >
              <figure>
                <Verse />
              </figure>

              <div className='flex flex-col items-start gap-[24px]'>
                <H3 className='text-[#FFFBF9]'>Verse of the Day</H3>
                <P className='text-[#CCCCCC] max-w-[384px]'>
                  Behold, God is my salvation; I will trust, and will not be
                  afraid; for the LORD GOD is my strength and my song, and he
                  has become my salvation.
                </P>
                <H4 className='text-#FFFBF9 mt-[9px]'>Isaiah 12 : 2</H4>
              </div>
            </div>
          </div>
        </div>
      </figure>
    </main>
  );
}
