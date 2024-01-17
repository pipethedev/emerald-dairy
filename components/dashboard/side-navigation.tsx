import Image from 'next/image';
import { AddIcon, HeartsIcon, SearchIcon, SettingsIcon } from '../svgs';
import { sideNavigationLinksData } from '@/data/links';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

export default function DashboardSideNavigation() {
  const pathname = usePathname();

  return (
    <div className='flex'>
      <div className='w-[255px] border-r-[1px] border-r-[#F2F2F2]'>
        <header className='h-[72px] border-b-[1px] border-b-[#F2F2F2] px-[12px] py-[14px] flex items-center gap-[11px]'>
          <div className='h-[44px] w-[44px] rounded-[8px] p-[10px] grid place-items-center bg-[#FEF6F4]'>
            <HeartsIcon />
          </div>
          <h1 className='font-bold text-black'>
            <span className='text-[#956E60]'>Emerald</span> Diary
          </h1>
          <div className='h-[40px] w-[40px] ml-auto rounded-[8px] p-[8px] grid place-items-center bg-[#FAFAFA]'>
            <SettingsIcon />
          </div>
        </header>
        <div className='h-[72px] px-[12px] py-[16px] flex items-center gap-[11px] border-b-[1px] border-b-[#F2F2F2]'>
          <figure>
            <Image
              src='/images/bimbo-profile.png'
              width={40}
              height={40}
              draggable={false}
              alt='Bimbo Profile'
              className='rounded-[8px]'
            />
          </figure>
          <div>
            <h2 className='text-[12px]'>Bimbo</h2>
            <p className='text-[#999999] text-[10px]'>bimbo@gmail.com</p>
          </div>
        </div>
        <div className='border-b-[1px] border-b-[#F2F2F2] px-[12px] gap-[12px] py-[8px]'>
          <h1 className='text-[#AE8779] font-extrabold text-[10px] py-[12px]'>
            QUICK LINKS
          </h1>
          <div>
            {sideNavigationLinksData.map((link, i) => {
              const isAllNotesActiveRoute = pathname === link.href;

              const isActiveRoute = pathname.includes(link.href);

              const linkItem =
                link.href === '/dashboard' ? (
                  <Link href={link.href} key={i}>
                    <button
                      className={clsx(
                        'w-full rounded-[8px] px-[12px] py-[12px] flex items-center gap-[8px] text-[12px]',
                        isAllNotesActiveRoute &&
                          'bg-[#FEF2EE] font-extrabold text-[#956E60]'
                      )}
                    >
                      <link.leading
                        className={
                          isAllNotesActiveRoute
                            ? 'stroke-[#956E60]'
                            : 'stroke-[#AAAAAD]'
                        }
                      />
                      <p>{link.linkText}</p>
                    </button>
                  </Link>
                ) : (
                  <Link href={link.href} key={i}>
                    <button
                      className={clsx(
                        'w-full rounded-[8px] px-[12px] py-[12px] flex items-center gap-[8px] text-[12px]',
                        isActiveRoute &&
                          'bg-[#FEF2EE] font-extrabold text-[#956E60]'
                      )}
                    >
                      <link.leading
                        className={
                          isActiveRoute
                            ? 'stroke-[#956E60] stroke-1'
                            : 'stroke-[#AAAAAD] stroke-1'
                        }
                      />
                      <p>{link.linkText}</p>
                    </button>
                  </Link>
                );

              return linkItem;
            })}
          </div>
        </div>
      </div>
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
      </div>
    </div>
  );
}
