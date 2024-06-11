import { Card, Flex, List } from 'antd';
import { Pokemon, PokemonAbility, PokemonMove, PokemonType } from 'pokenode-ts';

export interface IProps {
  pokemon?: Pokemon;
}

export function PokemonAttributesComponent({ pokemon }: IProps) {
  const boxStyle: React.CSSProperties = {
    width: '100%',
  };
  const listStyle: React.CSSProperties = {
    overflow: 'auto',
    height: '15rem',
    width: '12rem',
  };

  return (
    <Flex gap="middle" justify="center">
      <Card title="Abilities" style={boxStyle}>
        <List
          style={listStyle}
          dataSource={pokemon?.abilities}
          renderItem={(item: PokemonAbility) => (
            <List.Item data-cy="pokemon-ability">{item.ability.name}</List.Item>
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
  );
}
