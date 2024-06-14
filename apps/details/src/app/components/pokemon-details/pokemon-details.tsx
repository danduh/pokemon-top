import { LeftOutlined } from '@ant-design/icons';
import { PokemonDetailsComponent } from '@pokemon/pokemon-details';
import { Button, Flex } from 'antd';
import { Pokemon, PokemonClient } from 'pokenode-ts';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';

export function PokemonDetails() {
  const params = useParams();
  const [name] = useState<string | undefined>(params.name);
  const [currentIndex, setCurrentIndex] = useState<number | undefined>(
    undefined
  );
  const [pokemon, setPokemon] = useState<Pokemon | undefined>(undefined);

  useEffect(() => {
    const api = new PokemonClient();

    const fetchPokemonByInput = async (name?: string, id?: number) => {
      if (id) return api.getPokemonById(id);
      return name ? api.getPokemonByName(name) : api.getPokemonById(1);
    };
    const shouldFetchPokemon = (name?: string, id?: number) =>
      !((!name && !id) || (id && pokemon?.id === id));
    const fetchPokemon = async (name?: string, id?: number) => {
      if (!shouldFetchPokemon(name, id)) return;
      try {
        const fetchedPokemon = await fetchPokemonByInput(name, id);
        setPokemon(fetchedPokemon);
        setCurrentIndex(fetchedPokemon?.id);
      } catch (e) {
        console.log(e);
        alert('Pokemon not found, showing the first pokemon');
        setCurrentIndex(1);
      }
    };
    fetchPokemon(name, currentIndex);
  }, [name, currentIndex]);

  const navigate = useNavigate();

  return (
    <Flex gap="middle" align="center" vertical>
      <Button
        onClick={() => navigate(-1)}
        size="large"
        type="default"
        data-cy="back"
        shape="round"
      >
        <LeftOutlined />
        Back
      </Button>
      <PokemonDetailsComponent
        pokemon={pokemon}
        onNext={() => setCurrentIndex((currentIndex) => currentIndex! + 1)}
        onPrev={() => setCurrentIndex((currentIndex) => currentIndex! - 1)}
        isNextDisabled={currentIndex === 1000}
        isPrevDisabled={currentIndex === 1}
      ></PokemonDetailsComponent>
    </Flex>
  );
}
