// Write your tests here
import React from 'react';
import AppFunctional from "./AppFunctional";
import { queryByText, render } from "@testing-library/react";

test('renders "Welcome to the grid" text', () => {
    render (<AppFunctional />);
    const hasWelcomeText = queryByText(/Welcome to the grid/i);
    expect(hasWelcomeText).toBeInTheDocument();
});

test('sanity', () => {
  expect(true).toBe(true);
});
