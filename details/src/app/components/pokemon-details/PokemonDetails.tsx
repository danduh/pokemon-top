import { Button, Card, Flex, List } from 'antd';
import {
  Pokemon,
  PokemonAbility,
  PokemonClient,
  PokemonMove,
  PokemonType,
} from 'pokenode-ts';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
export interface PokemonDetailsProps {
  index?: number;
}

export function PokemonDetails() {
  const { id } = useParams();

  const [currentIndex, setCurrentIndex] = useState<number>(Number(id) || 1);
  const [pokemon, setPokemon] = useState<Pokemon | undefined>(undefined);
  const api = new PokemonClient();

  const fetchPokemonByIndex = async (index: number) => {
    const pokemon: Pokemon = await api.getPokemonById(index);
    setPokemon(pokemon);
    setCurrentIndex(pokemon.id);
  };

  const fetchPokemonByName = async (name: string) => {
    const pokemon: Pokemon = await api.getPokemonByName(name);
    setPokemon(pokemon);
    setCurrentIndex(pokemon.id);
  };

  useEffect(() => {
    fetchPokemonByIndex(currentIndex);
  }, [currentIndex]);

  const boxStyle: React.CSSProperties = {
    width: '100%',
  };
  const listStyle: React.CSSProperties = {
    overflow: 'auto',
    height: '15rem',
    width: '12rem',
  };

  return (
    <Flex gap="middle" align="center" vertical>
      <img
        data-cy="pokemon-image"
        src={`${
          pokemon?.sprites.other?.['official-artwork'].front_default ||
          pokemon?.sprites.front_default
        }`}
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
            renderItem={(item: PokemonAbility) => (
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
            renderItem={(item: PokemonType) => (
              <List.Item data-cy="pokemon-type">{item.type.name}</List.Item>
            )}
          />
        </Card>
        <Card title="Moves" style={boxStyle}>
          <List
            style={listStyle}
            dataSource={pokemon?.moves}
            renderItem={(item: PokemonMove) => (
              <List.Item data-cy="pokemon-move">{item.move.name}</List.Item>
            )}
          />
        </Card>
      </Flex>
    </Flex>
  );
}
