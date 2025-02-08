"use client";
import React from 'react'
import { useUser } from '@clerk/nextjs'
import { UserProfile } from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import ImageGrid from '../../../components/Grid';

const page = () => {
    const [images, setImages] = useState<any[]>([]);
    const user = useUser();
    const username = user.user?.username;
    useEffect(() => {
        const fetchImages = () => {
          fetch("/api/MyCreations",{
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username }),
          })
            .then((response) => response.json())
            .then((data) => {
              setImages(data);
            })
            .catch((error) => {
              console.error("Error fetching images:", error);
            });
        };
    
        fetchImages();
      }, [images]);
  return (
    <div>
        <h1
            style={{
                textAlign: "center",
                marginTop: "50px",
                fontSize: "50px",
                color: "#5f6c7b",
            }}
        >Profile</h1>
        <div style={
            {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                backgroundColor: '#f9f9f9',
            }
        }>
        <UserProfile routing='hash' />
        </div>
        <h1
            style={{
                textAlign: "center",
                marginTop: "50px",
                fontSize: "50px",
                color: "#5f6c7b",
            }}
            >Creations</h1>
         {images.length === 0 && <h1 style={{textAlign: 'center'}}>No creations yet</h1>}
         {images.length > 0 && <ImageGrid images={images} />}
    </div>
  )
}

export default page