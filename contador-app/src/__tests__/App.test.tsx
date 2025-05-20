import { fireEvent, render, screen } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import App from "../App";

describe("Selector Numérico - Funcionalidad Básica", () => {
  test("Muestra un contador con valor inicial configurable", () => {
    render(<App />);

    const counterValue = screen.getByText("5"); // Valor inicial por defecto

    expect(counterValue).toBeInTheDocument();
  });

  test("Debe poder incrementar el valor mostrado", () => {
    render(<App />);

    const boton = screen.getByRole("button", { name: "+" });
    fireEvent.click(boton);
    const counterValueIncremented = screen.getByText("6"); // Valor después de incrementar

    expect(counterValueIncremented).toBeInTheDocument();
  });
});
