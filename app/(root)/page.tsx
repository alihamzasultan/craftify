"use client";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import { SignIn } from "@clerk/nextjs";
import Hero from "../../components/HeroComponent";
import ImageGrid from "../../components/Grid";

export default function Home() {
  const [images, setImages] = useState<any[]>([]);

  useEffect(() => {
    const fetchImages = () => {
      fetch("/api/Images")
        .then((response) => response.json())
        .then((data) => {
          setImages(data);
        })
        .catch((error) => {
          console.error("Error fetching images:", error);
        });
    };

    fetchImages();
  }, []);

  return (
    <div>
      <SignedOut>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            backgroundColor: "#f9f9f9",
          }}
        >
          <SignIn routing="hash" />
        </div>
      </SignedOut>
      <SignedIn>
        <Hero />
        <h1
          style={{
            textAlign: "center",
            marginTop: "50px",
            fontSize: "50px",
            color: "#5f6c7b",
          }}
        >
          Explore
        </h1>
      </SignedIn>
      <ImageGrid images={images} />
    </div>
  );
}
