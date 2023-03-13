import React, { useState } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from './StarWarsContext';
import useFetchApi from '../components/services/useFetchApi';
// aqui eu importo o useFetchApi que é o meu custom hook
// e o StarWarsContext que é o meu context

function StarWarsProvider({ children }) {
  const { planetLista, getPlanets, setPlanetLista, planetListOriginal } = useFetchApi();

  const [filterByNome, setFilterByNome] = useState('');
  const [columnSelect, setColumnSelect] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);
  // aqui eu crio um array com os valores que vão ser usados no select
  // e passo esse array para o meu context
  // para que eu possa usar no meu componente
  // e assim eu consigo fazer o meu select dinâmico
  // e não preciso criar um select para cada coluna
  // referencia do select dinâmico: https://www.youtube.com/watch?v=8gKX9JZ0Y0o
  const [comparisonSelect, setComparisonSelect] = useState('maior que');
  const [values, setValues] = useState(0);
  const [filterByNumericValues, setFilterByNumericValues] = useState({
    column: columnSelect[0],
    comparison: 'maior que',
    valueF: 0,
  });

  const [concatFilters, setConcatFilters] = useState([]);

  const filteredPlanetName = filterByNome.length > 0 ? planetLista
    .filter((planet) => (planet.name).toLowerCase()
      .includes(filterByNome.toLowerCase())) : planetLista;

  const handleChangeNome = ({ target: { value } }) => {
    setFilterByNome(value);
  };
  // aqui eu crio uma função que vai ser usada no meu input
  // para que eu possa filtrar os planetas pelo nome
  // e passo essa função para o meu context
  const handleChangeAll = ({ target: { value, name } }) => {
    setFilterByNumericValues({
      ...filterByNumericValues,
      [name]: value });
  };

  const context = {
    planetLista,
    getPlanets,
    setPlanetLista,
    filterByNome,
    setFilterByNome,
    filteredPlanetName,
    handleChangeNome,
    concatFilters,
    columnSelect,
    setColumnSelect,
    comparisonSelect,
    setComparisonSelect,
    values,
    setValues,
    filterByNumericValues,
    setFilterByNumericValues,
    setConcatFilters,
    handleChangeAll,
    planetListOriginal,
  };

  return (
    <main>
      <StarWarsContext.Provider value={ context }>
        { children }
      </StarWarsContext.Provider>
    </main>
  );
}

StarWarsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StarWarsProvider;
