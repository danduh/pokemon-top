import { Spin } from 'antd';
import { useState } from 'react';

export interface IProps {
  name?: string;
  src: string;
}

export function PokemonImage({ name, src }: IProps) {
  const [loading, setLoading] = useState(true);

  const imageLoaded = () => {
    setLoading(false);
  };

  return (
    <>
      {loading && <Spin size="large" data-cy="spinner" />}
      <img
        data-cy="pokemon-image"
        src={`${src}`}
        alt={name}
        onLoad={imageLoaded}
        width={250}
        style={{ visibility: loading ? 'hidden' : 'visible' }}
      ></img>
    </>
  );
}
