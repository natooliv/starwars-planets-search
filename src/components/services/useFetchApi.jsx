import { useEffect, useState } from 'react';

function useFetchApi() {
  const [planetLista, setPlanetLista] = useState([]);
  const [planetListOriginal, setPlanetListOriginal] = useState([]);

  useEffect(() => {
    const getPlanets = async () => {
      try {
        const url = 'https://swapi.dev/api/planets';
        const response = await fetch(url);
        const { results } = await response.json();
        // aqui é api que eu quero consumir
        const filteredResults = results.filter((item) => delete item.residents);
        // aqui eu quero filtrar o array de planetas
        setPlanetLista(filteredResults);
        setPlanetListOriginal(filteredResults);
      } catch (error) {
        // aqui  é o erro que eu quero tratar
      }
    };
    getPlanets();
  }, []);

  return { planetLista, setPlanetLista, planetListOriginal };
}

export default useFetchApi;
