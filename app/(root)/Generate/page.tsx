"use client";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import React from "react";
import { SignIn } from "@clerk/nextjs";
import Link from "next/link";
import LogoGenerator from "../../../components/LogoGenerator";
import Hero from "../../../components/HeroComponent";
import { useClerk } from "@clerk/nextjs";


export default function Home() {


  return (
    <div>
      <SignedIn>
      <LogoGenerator />
      </SignedIn>

    </div>
  );
}
