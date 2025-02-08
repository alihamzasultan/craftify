"use client";
import React from 'react'
import Navbar from '../../../components/Navbar'
import { SignedIn } from '@clerk/nextjs'
import BackgroundEditor from '../../../components/BackgroundEditor';
const page = () => {
  return (
    <SignedIn>
        <BackgroundEditor />  
    </SignedIn>
  )
}

export default page