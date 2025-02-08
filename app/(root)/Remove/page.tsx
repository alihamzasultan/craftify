"use client";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import React from "react";
import BackgroundRemover from "../../../components/BackgroundRemover";


export default function Home() {
  return (
    <div>
      <SignedIn>
      <BackgroundRemover />
      </SignedIn>
    </div>
  );
}
