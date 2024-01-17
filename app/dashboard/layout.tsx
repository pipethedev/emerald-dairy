'use client';

import DashboardSideNavigation from '@/components/dashboard/side-navigation';
import { Metadata } from 'next';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='flex h-[100vh]'>
      <DashboardSideNavigation />
      <main className='flex-1 w-full'>{children}</main>
    </div>
  );
}
