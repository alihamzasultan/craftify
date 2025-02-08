"use client";
import React, { use, useState,useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import ImageGrid from "./Grid";

const ImageGenerator: React.FC = () => {
  const user = useUser();
  const username = user.user?.username;
  const [description, setDescription] = useState<string>("");
  const [details, setDetails] = useState<"minimal" | "detailed">("minimal");
  const [loading, setLoading] = useState<boolean>(false);
  const [imageData, setImageData] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [images, setImages] = useState<any[]>([]);
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
  }, [imageData]);

  const handleGenerate = async () => {
    setLoading(true);
    setError("");
    setImageData("");

    try {
      const response = await fetch("/api/genImage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        
        body: JSON.stringify({ description, details, username }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data: { image: string } = await response.json();
      setImageData(data.image);
    } catch (err) {
      setError("Failed to generate image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
    <div
      style={{
        maxWidth: "700px",
      
        marginLeft: "500 px",
        padding: "30px",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        textAlign: "center",
        backgroundColor: "#f1f2f6",
        borderRadius: "15px",
        boxShadow: "0 6px 20px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h1 style={{ color: "#2c3e50", marginBottom: "20px" }}>AI Image Generator</h1>
      <p style={{ color: "#7f8c8d", marginBottom: "25px" }}>
        Describe the image you want to create, and let AI bring it to life!
      </p>
      <input
        type="text"
        placeholder="E.g., A sunset over a mountain range"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{
          width: "100%",
          padding: "12px",
          fontSize: "16px",
          marginBottom: "20px",
          border: "1px solid #ddd",
          borderRadius: "8px",
        }}
      />
      <div style={{ marginBottom: "20px" }}>
        <label style={{ marginRight: "15px" }}>
          <input
            type="radio"
            value="minimal"
            checked={details === "minimal"}
            onChange={() => setDetails("minimal")}
            style={{ marginRight: "8px" }}
          />
          Minimal
        </label>
        <label>
          <input
            type="radio"
            value="detailed"
            checked={details === "detailed"}
            onChange={() => setDetails("detailed")}
            style={{ marginRight: "8px" }}
          />
          Detailed
        </label>
      </div>
      <button
        onClick={handleGenerate}
        disabled={loading || !description}
        style={{
          padding: "12px 25px",
          fontSize: "16px",
          backgroundColor: "#2c3e50",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          cursor: loading ? "default" : "pointer",
          opacity: loading ? 0.7 : 1,
          transition: "background-color 0.3s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#2980b9")}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor= "#2c3e50")}
      >
        {loading ? "Generating..." : "Generate Image"}
      </button>
      {error && <p style={{ color: "#e74c3c", marginTop: "20px" }}>{error}</p>}
      {imageData && (
        <div style={{ marginTop: "30px" }}>
          <h2 style={{ color: "#2c3e50", marginBottom: "15px" }}>Generated Image:</h2>
          <img
            src={imageData}
            alt="Generated content"
            style={{
              maxWidth: "100%",
              borderRadius: "10px",
              border: "1px solid #ddd",
              boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
            }}
          />
        </div>
      )}
    </div>
    <h1
          style={{
            textAlign: "center",
            marginTop: "50px",
            fontSize: "50px",
            color: "#5f6c7b",
          }}
        >
          Your Creations
        </h1>
        {images.length> 0 && (
        <ImageGrid images={images} />
        )}
    </div>
  );
};

export default ImageGenerator;
