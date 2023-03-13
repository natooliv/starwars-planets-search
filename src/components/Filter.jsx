import React, { useContext, useEffect } from 'react';
import StarWarsContext from '../context/StarWarsContext';
// aqui importo o useContext para poder usar o context e o useEffect para poder usar o hook
function Filter() {
  const {
    filterByName,
    handleChangeName,
    handleChangeAll,
    setPlanetList,
    columnSelect,
    planetListOrigin,
    filterByNumericValues,
    setFilterByNumericValues,
    setColumnSelect,
    concatFilters,
    setConcatFilters } = useContext(StarWarsContext);
    // console.log(concatFilters);
    // aqui eu tenho que fazer um map para pegar os valores de cada objeto e colocar no span
    // e depois fazer um filter para remover o objeto do array concatFilters
    //  referencia para fazer o filter: https://www.w3schools.com/jsref/jsref_filter.asp

  const removendoFiltros = ({ target: { id } }) => {
    setConcatFilters(concatFilters.filter((fil) => fil.column !== id));
    setColumnSelect([...columnSelect, id]);
  };
  //  aqui eu tenho que fazer um filter para remover todos os objetos do array concatFilters
  const removeAllFilters = () => {
    setConcatFilters([]);
    setColumnSelect([
      'population',
      'orbital_period',
      'diameter',
      'rotation_period',
      'surface_water',
    ]);
  };
  // aqui eu tenho que fazer um filter para remover o objeto do array concatFilters
  // e depois fazer um filter para remover o valor do array columnSelect
  // e também do array concatFilters
  useEffect(() => {
    if (!concatFilters.length) return setPlanetList(planetListOrigin);
    let filtered = planetListOrigin;
    concatFilters.forEach((filter) => {
      const { column, comparison, valueF } = filter;
      if (comparison === 'maior que') {
        filtered = filtered.filter((a) => Number(a[column]) > Number(valueF));
      } if (comparison === 'menor que') {
        filtered = filtered.filter((a) => Number(a[column]) < Number(valueF));
      } if (comparison === 'igual a') {
        filtered = filtered.filter((a) => Number(a[column]) === Number(valueF));
      }
      setPlanetList(filtered);
    });
  }, [concatFilters]);

  // aqui eu tenho que fazer um filter para remover o valor do array columnSelect  e
  // também do array concatFilters

  const filter = () => {
    setConcatFilters([...concatFilters, filterByNumericValues]);
    setColumnSelect(columnSelect
      .filter((option) => option !== filterByNumericValues.column));
    setFilterByNumericValues({
      column: columnSelect[0],
      comparison: 'maior que',
      valueF: 0,
    });
  };
  // aqui renderizo os filtros que foram selecionados
  // e também o botão para remover todos os filtros
  return (
    <main>
      <input
        type="text"
        name="filterByName"
        id="filterByName"
        data-testid="name-filter"
        value={ filterByName }
        onChange={ handleChangeName }
        placeholder="Nome"
      />
      <label htmlFor="column-filter">
        Filter for column:
        <select
          id="column-filter"
          data-testid="column-filter"
          name="column"
          value={ filterByNumericValues.column }
          onChange={ handleChangeAll }
        >
          {/* // aqui eu faço um map para renderizar as opções do select */}
          {columnSelect.map((option) => (
            <option value={ option } key={ option }>
              {option}
            </option>
          ))}
        </select>
      </label>
      <label htmlFor="comparison-filter">
        Comparison Filter:
        <select
          id="comparison-filter"
          data-testid="comparison-filter"
          name="comparison"
          value={ filterByNumericValues.comparison }
          onChange={ handleChangeAll }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
      </label>
      <label htmlFor="value-filter">
        Value filter:
        <input
          name="valueF"
          id="value-filter"
          data-testid="value-filter"
          type="number"
          value={ filterByNumericValues.valueF }
          onChange={ handleChangeAll }
        />
      </label>
      <button
        id="button-filter"
        type="button"
        data-testid="button-filter"
        onClick={ filter }
      >
        Filter
      </button>
      {/*  aqui faz o map dos filtros que foram selecionados e renderiza na tela */}
      {concatFilters.length > 0 && concatFilters.map(({ column, comparison, valueF }) => (
        <div data-testid="filter" key={ column }>
          <span>{ `${column} ${comparison} ${valueF}` }</span>
          <button type="button" id={ column } onClick={ removendoFiltros }>X</button>
        </div>
      ))}
      <button
      // aqui  é o botao para remover todos os filtros */
        type="button"
        data-testid="button-remove-filters"
        onClick={ removeAllFilters }
      >
        Remover todos

      </button>
    </main>
  );
} // fim da função Filter

export default Filter;
