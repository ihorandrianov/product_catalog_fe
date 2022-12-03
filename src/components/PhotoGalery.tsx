import { FC } from 'react';
import { PhotoSlider } from './PhotoSlider';

type Props = {
  photos: string[];
};

export const PhotoGalery: FC<Props> = ({ photos }) => {
  const filteredPhotos = photos.filter((_, index) => {
    return ![1, 3].includes(index);
  });

  return (
    <section>
      <PhotoSlider photos={filteredPhotos} />
    </section>
  );
};
