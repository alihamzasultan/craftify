"use client"

import Navbar from '../../components/Navbar'
import { SidebarProvider,SidebarTrigger } from '@/components/ui/sidebar'
import { AppSidebar } from '../../components/app-sidebar'
import { SignedIn } from '@clerk/nextjs'
import React from 'react'

const Layout = ({children} : {children:React.ReactNode}) => {
  return (
    <main className='root'>
      <div className='root-container'>
        <div className='wrapper'>
          <SidebarProvider>
            <AppSidebar />
            {children}
            <SidebarTrigger />
          </SidebarProvider>
        </div>
      </div>
    </main>
  )
}

export default Layout