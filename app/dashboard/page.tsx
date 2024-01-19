import { AddIcon, ExpandMoreIcon, SearchIcon } from '@/components/svgs';
import Image from 'next/image';

export default function Dashboard() {
  return (
    <div className='flex flex-row'>
      <div className='w-[360px] border-r-[1px] border-r-[#F2F2F2]'>
        <header className='h-[72px] border-b-[1px] border-b-[#F2F2F2] flex px-[24px] gap-[12px] py-[16px]'>
          <div className='h-[40px] px-[16px] rounded-[10px] gap-[8px] flex-1 w-full bg-[#FAFAFA] flex items-center'>
            <SearchIcon />
            <input
              className='outline-none placeholder-[#B3B3B3] text-[14px] bg-transparent'
              placeholder='Search...'
            />
          </div>
          <div className='h-[40px] w-[40px] ml-auto rounded-[8px] p-[8px] grid place-items-center bg-[#956E60]'>
            <AddIcon />
          </div>
        </header>
        {/* ALL NOTES - SHOULD BE MOVED TO A SEPARATE COMPONENTS SOON */}
        <div className='py-[32px] px-[24px]'>
          <header className='flex items-center gap-[5px] mb-[24px]'>
            <h1 className='text-[24px] font-bold'>All Notes</h1>
            <ExpandMoreIcon />
          </header>
          <div className='h-[463px] bg-[#FAFAFA] w-full px-[24px] rounded-[14px] justify-center pt-[51px]'>
            <figure className='flex flex-col items-center'>
              <Image src="/icons/docs-icon2x.svg" alt="Docs icon 2x" width={180} height={180} />
              <figcaption className='text-[20px] pt-5 text-center'>
              You have no saved notes 
in your account.
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
      <div>
        <header className='h-[72px] border-b-[1px] border-b-[#F2F2F2]'></header>
        <div className='p-[56px]'>
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
          <div className='flex gap-[24px] flex-wrap'>
            <div className="p-[24px] bg-[#FEF6F4] rounded-[20px] w-full max-w-[308px]">
              <figure className='mb-[50px]'>
                <Image alt="Docs Icon" src="/icons/docs-icon.svg" width={72} height={72} />
              </figure>
              <h1 className='text-[#AE8779] text-[20px] font-bold mb-[5px]'>Create your First note</h1>
              <p>You have no saved notes
                in your account.</p>
            </div>
            <div className="p-[24px] bg-[#FAFAFA] rounded-[20px] w-full max-w-[308px]">
              <figure className='mb-[32px]'>
                <Image alt="Folder Icon" src="/icons/folder-icon.svg" width={90} height={90} />
              </figure>
              <h1 className='text-[20px] font-bold mb-[5px]'>Create a Folder</h1>
              <p className='text-[#808080]'>You have no saved notes
                in your account.</p>
            </div>
            <div className="p-[24px] bg-[#FAFAFA] rounded-[20px] w-full max-w-[308px]">
              <figure className='mb-[32px]'>
                <Image alt="Camera Icon" src="/icons/camera-icon.svg" width={90} height={90} />
              </figure>
              <h1 className='text-[20px] font-bold mb-[5px]'>Add a Profile Picture</h1>
              <p className='text-[#808080]'>You have no saved notes
                in your account.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
