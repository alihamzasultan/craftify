import React from "react";
import Link from "next/link";
import { useRouter } from 'next/router';


const Hero: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#2c3e50",
        color: "white",
        textAlign: "center",
        padding: "40px",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          padding: "30px",
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          borderRadius: "15px",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.2)",
        }}
      >
        <h1
          style={{
            fontSize: "3.5rem",
            fontWeight: "600",
            marginBottom: "20px",
          }}
        >
          AI Image Generation at Your Fingertips
        </h1>
        <p
          style={{
            fontSize: "1.2rem",
            color: "#bdc3c7",
            marginBottom: "30px",
            lineHeight: "1.8",
          }}
        >
          Unlock the power of artificial intelligence to create stunning images
          with just a simple description. Whether you're designing artwork,
          generating unique visuals, or experimenting with creative concepts, our
          AI technology brings your ideas to life.
        </p>
        <button
          style={{
            padding: "15px 30px",
            fontSize: "1.1rem",
            backgroundColor: "#3498db",
            color: "white",
            border: "none",
            borderRadius: "30px",
            cursor: "pointer",
            transition: "background-color 0.3s ease, transform 0.3s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#2980b9")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#3498db")}
          onClick={() => {window.location.href = "/Generate";}}
         
        >
          Start Creating
          
        </button>
      </div>
    </div>
  );
};

export default Hero;
