import { Button, Flex } from 'antd';
import { useEffect, useState } from 'react';

/* eslint-disable-next-line */
export interface PokemonDetailsProps {
  index?: number;
}

export function PokemonDetails(props: PokemonDetailsProps) {
  const [currentIndex, setCurrentIndex] = useState(props.index || 1);
  const [pokemon, setPokemon] = useState<any>(null);

  const fetchPokemon = async (index: number) => {
    await fetch(`https://pokeapi.co/api/v2/pokemon/${index}`)
      .then((res) => res.json())
      .then((data) => setPokemon(data));
  };

  useEffect(() => {
    fetchPokemon(currentIndex);
  }, [currentIndex]);
  const boxStyle: React.CSSProperties = {
    width: '100%',
  };
  return (
    <Flex gap="middle" align="center" vertical>
      <h1 data-cy="name">{pokemon?.name}</h1>
      <img
        data-cy="image"
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${currentIndex}.png`}
      ></img>
      <Flex gap="middle" justify="center" style={boxStyle}>
        <Button
          size="large"
          type="primary"
          data-cy="prev"
          shape="round"
          onClick={() => setCurrentIndex((currentIndex) => currentIndex - 1)}
        >
          Prev
        </Button>
        <Button
          type="primary"
          size="large"
          shape="round"
          data-cy="next"
          onClick={() => setCurrentIndex((currentIndex) => currentIndex + 1)}
        >
          Next
        </Button>
      </Flex>
    </Flex>
  );
}

export default PokemonDetails;
