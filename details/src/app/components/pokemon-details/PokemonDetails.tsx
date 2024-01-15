import { Button, Card, Flex, List } from 'antd';

import PokeAPI, { IPokemon } from 'pokeapi-typescript';
import { useEffect, useState } from 'react';
/* eslint-disable-next-line */
export interface PokemonDetailsProps {
  index?: number;
}

export function PokemonDetails(props: PokemonDetailsProps) {
  const [currentIndex, setCurrentIndex] = useState(props.index || 1);
  const [pokemon, setPokemon] = useState<IPokemon | undefined>(undefined);

  const fetchPokemon = async (index: number) => {
    const pokemon = await PokeAPI.Pokemon.resolve(index);
    setPokemon(pokemon);
  };

  useEffect(() => {
    fetchPokemon(currentIndex);
  }, [currentIndex]);

  const boxStyle: React.CSSProperties = {
    width: '100%',
  };
  const listStyle: React.CSSProperties = {
    overflow: 'auto',
    height: '300px',
    width: '240px',
  };

  return (
    <Flex gap="middle" align="center" vertical>
      <img
        data-cy="pokemon-image"
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${currentIndex}.png`}
      ></img>
      <h1 data-cy="pokemon-name">{pokemon?.name}</h1>

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
      <Flex gap="middle" justify="center">
        <Card title="Abilities" style={boxStyle}>
          <List
            style={listStyle}
            dataSource={pokemon?.abilities}
            renderItem={(item) => (
              <List.Item data-cy="pokemon-ability">
                {item.ability.name}
              </List.Item>
            )}
          />
        </Card>
        <Card title="Types" style={boxStyle}>
          <List
            style={listStyle}
            dataSource={pokemon?.types}
            renderItem={(item) => (
              <List.Item data-cy="pokemon-type">{item.type.name}</List.Item>
            )}
          />
        </Card>
        <Card title="Held Items" style={boxStyle}>
          <List
            style={listStyle}
            dataSource={pokemon?.held_items}
            renderItem={(item) => (
              <List.Item data-cy="pokemon-held-item">
                {item.item.name}
              </List.Item>
            )}
          />
        </Card>
        <Card title="Moves" style={boxStyle}>
          <List
            style={listStyle}
            dataSource={pokemon?.moves}
            renderItem={(item) => (
              <List.Item data-cy="pokemon-move">{item.move.name}</List.Item>
            )}
          />
        </Card>
      </Flex>
    </Flex>
  );
}

export default PokemonDetails;
