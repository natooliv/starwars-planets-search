import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import App from '../App';
import testData from '../../cypress/mocks/testData'
import userEvent from '@testing-library/user-event';

beforeEach(() => {
  global.fetch = jest.fn().mockReturnValue({
    json: jest.fn().mockReturnValue(testData)
  })
  render(<App />)
});

test('testa se tem o planeta Alderaan e quando filtrado por nome "ta" o planeta não seja mais renderizado', () => {
  const planet = screen.getByText(/Alderaan/i)
  expect(planet).toBeInTheDocument()
  const input = screen.getByTestId('name-filter')
  expect(input).toBeInTheDocument()
  userEvent.type(input, 'ta');
  expect(planet).not.toBeInTheDocument()
  expect(screen.getByText('Tatooine')).toBeInTheDocument()
});

test('testa o filtro "greater than"', () => {
  fireEvent.change(screen.getByTestId('column-filter'), {target: {value: 'diameter'}})
  fireEvent.change(screen.getByTestId('comparison-filter'), {target: {value: 'greater than'}})
  const input = screen.getByTestId('value-filter')
  userEvent.type(input, '12500');
  userEvent.click(screen.getByTestId('button-filter'))
  expect(screen.getByText(/Bespin/i)).toBeInTheDocument()
  const tr = screen.getAllByRole('row')
  expect(tr.length).toBe(3)
});

test('testa o filtro "less than"', () => {
  fireEvent.change(screen.getByTestId('column-filter'), {target: {value: 'orbital_period'}})
  fireEvent.change(screen.getByTestId('comparison-filter'), {target: {value: 'less than'}})
  const input = screen.getByTestId('value-filter')
  userEvent.type(input, '350');
  userEvent.click(screen.getByTestId('button-filter'))
  expect(screen.getByText(/Dagobah/i)).toBeInTheDocument()
  const tr = screen.getAllByRole('row')
  expect(tr.length).toBe(4)
});

test('testa o filtro "equal to"', () => {
  fireEvent.change(screen.getByTestId('column-filter'), {target: {value: 'rotation_period'}})
  fireEvent.change(screen.getByTestId('comparison-filter'), {target: {value: 'equal to'}})
  const input = screen.getByTestId('value-filter')
  userEvent.type(input, '18');
  userEvent.click(screen.getByTestId('button-filter'))
  expect(screen.getByText(/Endor/i)).toBeInTheDocument()
  const tr = screen.getAllByRole('row')
  expect(tr.length).toBe(2)
});

test('testa o botão de deletar filtro e remover todos os filtros', () => {
  //filtro 1
  fireEvent.change(screen.getByTestId('column-filter'), {target: {value: 'population'}})
  fireEvent.change(screen.getByTestId('comparison-filter'), {target: {value: 'greater than'}})
  const input = screen.getByTestId('value-filter')
  userEvent.type(input, '1000');
  userEvent.click(screen.getByTestId('button-filter'))
  //filtro 2
  fireEvent.change(screen.getByTestId('column-filter'), {target: {value: 'orbital_period'}})
  fireEvent.change(screen.getByTestId('comparison-filter'), {target: {value: 'less than'}})
  userEvent.type(input, '400');
  userEvent.click(screen.getByTestId('button-filter'))
  //filtro 3
  fireEvent.change(screen.getByTestId('column-filter'), {target: {value: 'rotation_period'}})
  fireEvent.change(screen.getByTestId('comparison-filter'), {target: {value: 'equal to'}})
  userEvent.type(input, '24');
  userEvent.click(screen.getByTestId('button-filter'))
  expect(screen.getAllByRole('row').length).toBe(3)

  const deleteButton = screen.getAllByTestId(/DeleteIcon/i)
  expect(deleteButton.length).toBe(3)
  userEvent.click(deleteButton[2])
  expect(screen.getAllByRole('row').length).toBe(5)

  const buttonRemoveAllFilters = screen.getByText(/Remove All Filters/)
  userEvent.click(buttonRemoveAllFilters)
  expect(screen.getAllByRole('row').length).toBe(11)

});

test('testa ordenar de forma "ascendente"', () => {
  fireEvent.change(screen.getByTestId("column-sort"), {target: {value: 'population'}})
  const asc = screen.getByTestId('column-sort-input-asc')
  userEvent.click(asc)
  userEvent.click(screen.getByText(/SORT/))
  const tr = screen.getAllByRole('row')
  expect(tr[1]).toHaveTextContent(/Yavin/)
});

test('testa ordenar de forma "descendente"', () => {
  fireEvent.change(screen.getByTestId("column-sort"), {target: {value: 'population'}})
  const asc = screen.getByTestId("column-sort-input-desc")
  userEvent.click(asc)
  userEvent.click(screen.getByText(/SORT/))
  const tr = screen.getAllByRole('row')
  expect(tr[1]).toHaveTextContent(/Coruscant/)
});
