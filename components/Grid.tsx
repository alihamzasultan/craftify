import React from 'react';
import Image from 'next/image';

interface ImageData {
  src: string;
  alt?: string;
  prompt?: string;
}

interface ImageGridProps {
  images: ImageData[];
}

const ImageGrid: React.FC<ImageGridProps> = ({ images }) => {
  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '16px',
    padding: '16px',
  };

  const cardStyle: React.CSSProperties = {
    border: '1px solid #ddd',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.2s ease-in-out',
    textAlign: 'center',
  };

  const textStyle: React.CSSProperties = {
    marginTop: '8px',
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#333',
  };

  return (
    <div style={gridStyle}>
      {images.map((image, index) => (
        <div style={cardStyle} key={index}>
          <Image
            src={image.src}
            alt={image.alt || `Image ${index + 1}`}
            layout="responsive"
            width={500}
            height={300}
            onMouseEnter={zoomIn}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          />
          <div style={textStyle}>{image.prompt || 'Professional'}</div>
        </div>
      ))}
    </div>
  );
};


function zoomIn(e: React.MouseEvent<HTMLImageElement>) {
  e.currentTarget.style.transform = 'scale(1.05)';
}

export default ImageGrid;
