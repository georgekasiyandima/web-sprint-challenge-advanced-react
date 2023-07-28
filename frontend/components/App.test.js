// Write your tests here
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import AppFunctional from "./AppFunctional";
import { render, fireEvent, screen } from "@testing-library/react";



test('renders "Coordinates" ', async () => {
    const {queryByText} = render (<AppFunctional />);

    const hasCoordinatesText = queryByText(/Coordinates/i);
    expect(hasCoordinatesText).toBeInTheDocument();
});

test('renders "steps" ', async () => {
  const {queryByText} = render (<AppFunctional />);

  const hasStepstText = queryByText(/Steps/i);
  expect(hasStepstText).toBeInTheDocument
});

test('renders "keypad" ', async () => {
  const {queryByText} = render (<AppFunctional />);

  const hasKeypadText = queryByText(/keypad/i);
  expect(hasKeypadText).toBeInTheDocument
});

test('renders "submit" ', async () => {
  const {queryByText} = render (<AppFunctional />);

  const hasSubmitText = queryByText(/submit/i);
  expect(hasSubmitText).toBeInTheDocument
});

test('type email', async () => {
  render(<AppFunctional placeholder="type email" />)
  const input = screen.getByPlaceholderText('type email')
  fireEvent.change(input, {target: {value: 'Typed email'}})

  expect(input).toHaveValue("Typed email")
})

test('sanity', () => {
  expect(true).toBe(true);
});
