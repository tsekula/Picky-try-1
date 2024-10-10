import React from 'react';
import Masonry from 'react-masonry-css';
import Image from 'next/image';

const MasonryGallery = ({ images }) => {
  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1
  };

  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="flex w-auto"
      columnClassName="bg-clip-padding px-2"
    >
      {images.map((image) => (
        <div key={image.id} className="mb-4">
          <Image
            src={image.file_path}
            alt={image.file_name}
            width={300}
            height={300}
            layout="responsive"
            objectFit="cover"
            loading="lazy"
          />
        </div>
      ))}
    </Masonry>
  );
};

export default MasonryGallery;
