import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import App from '../App';
import testData from '../../cypress/mocks/testData'
import userEvent from '@testing-library/user-event';

 // aqui eu importo o meu mock de dados
 // e o userEvent que é uma biblioteca que eu uso para simular eventos
 // como o click e o type
 // e o fireEvent que é uma função que eu uso para simular eventos
 // como o change e o click e o screen que é uma função que eu uso para pegar elementos
  // do meu documento
 // e o render que é uma função que eu uso para renderizar o meu componente
  // e o App que é o meu componente
  // e o jest.fn() que é uma função que eu uso para criar uma função falsa
  // e o mockReturnValue que é uma função que eu uso para retornar um valor
  // e o json que é uma função que eu uso para retornar um json

beforeEach(() => {
  global.fetch = jest.fn().mockReturnValue({
    json: jest.fn().mockReturnValue(testData)
  })
  render(<App />)
});

 // aqui testo se o planeta Alderaan está renderizado na tela
// e se o input de filtro por nome está renderizado na tela
test('testa se tem o planeta Alderaan e quando filtrado por nome "ta" o planeta não seja mais renderizado', () => {
  const planet = screen.getByText(/Alderaan/i)
  expect(planet).toBeInTheDocument()
  const input = screen.getByTestId('name-filter')
  expect(input).toBeInTheDocument()
  userEvent.type(input, 'ta');
  expect(planet).not.toBeInTheDocument()
  expect(screen.getByText('Tatooine')).toBeInTheDocument()
});
 // aqui testo se o filtro  maior que está funcionando

test('testa o filtro "maior que"', () => {
  fireEvent.change(screen.getByTestId('column-filter'), {target: {value: 'diameter'}})
  fireEvent.change(screen.getByTestId('comparison-filter'), {target: {value: 'maior que'}})
  const input = screen.getByTestId('value-filter')
  userEvent.type(input, '12500');
  userEvent.click(screen.getByTestId('button-filter'))
  expect(screen.getByText(/Bespin/i)).toBeInTheDocument()
  const tr = screen.getAllByRole('row')
  expect(tr.length).toBe(3)
});
 // aqui testa se o filtro menor que está funcionando
test('testa o filtro "menor que"', () => {
  fireEvent.change(screen.getByTestId('column-filter'), {target: {value: 'orbital_period'}})
  fireEvent.change(screen.getByTestId('comparison-filter'), {target: {value: 'menor que'}})
  const input = screen.getByTestId('value-filter')
  userEvent.type(input, '350');
  userEvent.click(screen.getByTestId('button-filter'))
  expect(screen.getByText(/Dagobah/i)).toBeInTheDocument()
  const tr = screen.getAllByRole('row')
  expect(tr.length).toBe(4)
});
 // aqui testa se o filtro igual a está funcionando

test('testa o filtro "igual a"', () => {
  fireEvent.change(screen.getByTestId('column-filter'), {target: {value: 'rotation_period'}})
  fireEvent.change(screen.getByTestId('comparison-filter'), {target: {value: 'igual a'}})
  const input = screen.getByTestId('value-filter')
  userEvent.type(input, '18');
  userEvent.click(screen.getByTestId('button-filter'))
  expect(screen.getByText(/Endor/i)).toBeInTheDocument()
  const tR = screen.getAllByRole('row')
  expect(tR.length).toBe(2)
});
 // aqui testa se o botao de deletar e remover todos os filtros está funcionando
test('testa o botão de deletar filtro e remover todos os filtros', () => {

  //primeiro filtro

  fireEvent.change(screen.getByTestId('column-filter'), {target: {value: 'population'}})
  fireEvent.change(screen.getByTestId('comparison-filter'), {target: {value: 'greater than'}})
  const input = screen.getByTestId('value-filter')
  userEvent.type(input, '1000');
  userEvent.click(screen.getByTestId('button-filter'))

  //segundo filtro
  fireEvent.change(screen.getByTestId('column-filter'), {target: {value: 'orbital_period'}})
  fireEvent.change(screen.getByTestId('comparison-filter'), {target: {value: 'maior que'}})
  userEvent.type(input, '400');
  userEvent.click(screen.getByTestId('button-filter'))

  //terceito filtro
  fireEvent.change(screen.getByTestId('column-filter'), {target: {value: 'rotation_period'}})
  fireEvent.change(screen.getByTestId('comparison-filter'), {target: {value: 'igual a '}})
  userEvent.type(input, '24');
  userEvent.click(screen.getByTestId('button-filter'))
  expect(screen.getAllByRole('row').length).toBe(3)

// aqui eu testo se o botão de deletar está funcionando
  const deletarBotao = screen.getAllByTestId(/DeleteIcon/i)
  expect(deletarBotao.length).toBe(3)
  userEvent.click(deletarBotao[2])
  expect(screen.getAllByRole('row').length).toBe(5)

 // aqui eu testo se o botão de remover todos os filtros está funcionando
  const botaoQueRemoveTodosFiltros = screen.getByText(/Remove All Filters/)
  userEvent.click(botaoQueRemoveTodosFiltros)
  expect(screen.getAllByRole('row').length).toBe(11)

});
 // aqui testa se o botão de ordenar está funcionando de forma ascendente

test('testa ordenar de forma "ascendente"', () => {
  fireEvent.change(screen.getByTestId("column-sort"), {target: {value: 'population'}})
  const asc = screen.getByTestId('column-sort-input-asc')
  userEvent.click(asc)
  userEvent.click(screen.getByText(/SORT/))
  const tR = screen.getAllByRole('row')
  expect(tR[1]).toHaveTextContent(/Yavin/)
});
 // aqui testa se o botão de ordenar está funcionando de forma descendente
test('testa ordenar de forma "descendente"', () => {
  fireEvent.change(screen.getByTestId("column-sort"), {target: {value: 'population'}})
  const desc = screen.getByTestId("column-sort-input-desc")
  userEvent.click(desc)
  userEvent.click(screen.getByText(/SORT/))
  const tR = screen.getAllByRole('row')
  expect(tR[1]).toHaveTextContent(/Coruscant/)
});
