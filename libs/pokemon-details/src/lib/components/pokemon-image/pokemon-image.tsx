import { useEffect, useState, type SyntheticEvent } from 'react';
import fallback from '../../../missing.png';
export interface IProps {
  name?: string;
  src: string;
}

export function PokemonImage({ name, src }: IProps) {
  const [showFallbackImage, setShowFallbackImage] = useState(false);
  useEffect(() => setShowFallbackImage(false), [src]);

  const onImageError = (event: SyntheticEvent<HTMLImageElement, Event>) => {
    setShowFallbackImage(true);
  };

  return (
    <>
      {showFallbackImage ? (
        <img
          data-cy="pokemon-fallback-image"
          src={fallback}
          alt="missing"
          width={250}
        />
      ) : (
        <img
          data-cy="pokemon-image"
          src={`${src}`}
          alt={name}
          width={250}
          onError={onImageError}
        ></img>
      )}
    </>
  );
}
