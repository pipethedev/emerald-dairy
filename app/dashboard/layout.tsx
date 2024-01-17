"use client"

import DashboardSideNavigation from "@/components/dashboard/side-navigation"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {

    return (
        <div className="flex h-[100vh]">
            <DashboardSideNavigation />
            <main className="flex-1 w-full">
                {children}
            </main>
        </div>
    )
}
