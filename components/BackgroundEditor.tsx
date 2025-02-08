import React, { useState } from "react";
import { CldImage, CldUploadWidget } from "next-cloudinary";

const BackgroundEditor: React.FC = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isBackgroundRemoved, setIsBackgroundRemoved] = useState(false);
  const [loading, setLoading] = useState(false);
  const [prompt,setprompt] = useState<string | "">("");

  const onUploadSuccessHandler = (result: any) => {
    setImageUrl(result.info.secure_url);
    setIsBackgroundRemoved(false);
  };

  const onUploadErrorHandler = () => {
    console.error("Upload failed");
  };

  const handleRemoveBackground = () => {
    setLoading(true);
    setIsBackgroundRemoved(true);
    setTimeout(() => {
      setLoading(false);
    }, 20000); 
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Background Editor</h1>
      <input
        type="text"
        placeholder="E.g., A sunset over a mountain range"
        value={prompt}
        onChange={(e) => setprompt(e.target.value)}
        style={{
          width: "100%",
          padding: "12px",
          fontSize: "16px",
          marginBottom: "20px",
          border: "1px solid #ddd",
          borderRadius: "8px",
        }}
      />
      <CldUploadWidget
        uploadPreset="AI_burhan"
        options={{
          multiple: false,
          resourceType: "image",
        }}
        onSuccess={onUploadSuccessHandler}
        onError={onUploadErrorHandler}
      >
        {({ open }) => (
          <button style={styles.uploadButton} onClick={() => open()}>
            Upload
          </button>
        )}
      </CldUploadWidget>
      {imageUrl && !isBackgroundRemoved && !loading && (
        <div>
          <CldImage
            width="500"
            height="500"
            src={imageUrl}
            crop="fill"
            sizes="100vw"
            alt="Uploaded image"
            style={styles.image}
          />
          <button style={styles.removeButton} onClick={handleRemoveBackground}>
            Replace Background
          </button>
        </div>
      )}
      {loading && <div style={styles.loading}>Processing...</div>}
      {imageUrl && isBackgroundRemoved && !loading && (
        <CldImage
          width="500"
          height="500"
          src={imageUrl}
          crop="fill"
          replaceBackground={prompt}
          sizes="100vw"
          alt="Background removed image"
          style={styles.image}
        />
      )}
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column" as "column" | "row" | "row-reverse" | "column-reverse",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    width: "80%",
    maxWidth: "600px",
    margin: "auto",
  },
  title: {
    fontSize: "24px",
    marginBottom: "20px",
    color: "#333",
  },
  uploadButton: {
    backgroundColor: "#2c3e50",
    color: "white",
    border: "none",
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
    borderRadius: "4px",
    transition: "background-color 0.3s",
  },
  removeButton: {
    backgroundColor: "#2c3e50",
    color: "white",
    border: "none",
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
    borderRadius: "4px",
    transition: "background-color 0.3s",
    marginTop: "10px",
  },
  image: {
    marginTop: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  loading: {
    fontSize: "18px",
    color: "#FF5722",
    marginTop: "20px",
  },
};

export default BackgroundEditor;
