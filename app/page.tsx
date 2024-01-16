'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useState } from 'react';
import { H2 } from '@/utils/typography';
import toast from 'react-hot-toast';
import axios from 'axios';
import { Info } from '@/components/svgs';
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

      <figure>
        <img
          src='/images/bimbo.png'
          alt='bimbo'
          // width={`100%`}
          // height={100}
          // priority
          loading='lazy'
          draggable={false}
        />
      </figure>
    </main>
  );
}
