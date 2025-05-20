import { fireEvent, render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { describe, test, expect, vi } from "vitest";
import App from "../App";
import { RandomNumberService } from "../services/randomNumber";

describe("Selector Numérico - Funcionalidad Básica", () => {
  test("Muestra un contador con valor inicial configurable", () => {
    render(<App />);

    const counterValue = screen.getByText("5"); // Valor inicial por defecto

    expect(counterValue).toBeInTheDocument();
  });

  test("Debe poder incrementar el valor mostrado", async () => {
    render(<App />);

    const boton = screen.getByRole("button", { name: "+" });
    await userEvent.click(boton);
    const counterValueIncremented = screen.getByText("6"); // Valor después de incrementar

    expect(counterValueIncremented).toBeInTheDocument();
  });

  test("Debe poder decrementar el valor mostrado", () => {
    render(<App />);

    const boton = screen.getByRole("button", { name: "-" });
    fireEvent.click(boton);
    const counterValueDecremented = screen.getByText("4"); // Valor después de decrementar

    expect(counterValueDecremented).toBeInTheDocument();
  });

  test("Debe ser el minimo un 1", () => {
    render(<App />);

    const boton = screen.getByRole("button", { name: "-" });
    for (let i = 0; i < 10; i++) {
      fireEvent.click(boton);
    }
    const counterValueDecremented = screen.getByText("1"); // Valor después de decrementar hasta 0

    expect(counterValueDecremented).toBeInTheDocument();
  });

  test("Debe ser el maximo un 10", async () => {
    render(<App />);

    const boton = screen.getByRole("button", { name: "+" });
    for (let i = 0; i < 10; i++) {
      await userEvent.click(boton);
    }
    const counterValueDecremented = screen.getByText("10"); // Valor después de decrementar hasta 0

    expect(counterValueDecremented).toBeInTheDocument();
  });

  test("Debe mostrar un titulo descriptivo en la parte superior", () => {
    render(<App />);

    const titulo = screen.getByRole("heading");

    expect(titulo).toBeInTheDocument();
  });

  test("Debe mostrar un titulo personalizable", () => {
    render(<App title="prueba" />);

    const tituloPersonalizable = screen.getByRole("heading", {
      name: "prueba",
    });

    expect(tituloPersonalizable).toBeInTheDocument();
  });

  test("Debe mostrar un valor inicial personalizable", () => {
    render(<App initialCount={3} />);

    const numeroInicial = screen.getByText("3");

    expect(numeroInicial).toBeInTheDocument();
  });
});

describe("Interfaz y Experiencia de Usuario", () => {
  test("Debe mostrar un mensaje informativo antes de ninguna seleccion", () => {
    render(<App />);

    const paragraphInicial = screen.getByRole("paragraph");

    expect(paragraphInicial).toBeInTheDocument();
  });
});

describe("Mecánica del Juego", () => {
  test("Se debe mostrar un resultado si se tiene exito", async () => {
    vi.spyOn(RandomNumberService, "getRandomNumber").mockReturnValue(5);

    render(<App />);

    const boton = screen.getByRole("button", { name: "Comprobar" });
    await userEvent.click(boton);
    const successResult = screen.getByText(
      "¡Felicidades! Has acertado el número 5! 🎉"
    );

    expect(successResult).toBeInTheDocument();
  });
});
