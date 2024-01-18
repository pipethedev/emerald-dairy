import Image from 'next/image';

export default function Dashboard() {
  return (
    <div>
      <header className='h-[72px] border-b-[1px] border-b-[#F2F2F2]'></header>
      <div className='py-[56px] px-[100px]'>
        <div className='flex items-center gap-[13px] mb-[53px]'>
          <figure className='bg-[#F2F2F2] h-[80px] w-[80px] rounded-full grid place-items-center'>
            <Image
              src='/images/sun.png'
              draggable={false}
              alt='Sun'
              width={55}
              height={55}
            />
          </figure>
          <h1 className='text-[44px] font-bold'>Morning Bimbo</h1>
        </div>
        <div></div>
      </div>
    </div>
  );
}
