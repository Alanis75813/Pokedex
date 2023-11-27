import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';

const Pokedex = () => {
  const [pokemonData, setPokemonData] = useState([]);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const pokemonList = ['pikachu', 'bulbasaur', 'charmander'];
        const promises = pokemonList.map(async (pokemon) => {
          const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
          if (response.ok) {
            const data = await response.json();
            return {
              name: data.name,
              image: data.sprites.front_default,
              height: data.height,
              weight: data.weight
            };
          }
          throw new Error('Failed to fetch Pokémon data');
        });
        const results = await Promise.all(promises);
        setPokemonData(results);
      } catch (error) {
        console.error('Error fetching Pokémon data', error);
      }
    };

    fetchPokemonData();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {pokemonData.map((pokemon, index) => (
        <View key={index} style={styles.pokemonContainer}>
          <Text style={styles.title}>{pokemon.name}</Text>
          <Image source={{ uri: pokemon.image }} style={styles.image} />
          <Text>Height: {pokemon.height}</Text>
          <Text>Weight: {pokemon.weight}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: 20,
  },
  pokemonContainer: {
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 10,
  },
});

export default Pokedex;
