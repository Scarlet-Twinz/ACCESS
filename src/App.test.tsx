import { render, screen } from "@testing-library/react";
import { describe, expect, it, beforeEach } from "vitest";
import App, { contrastRatio } from "./App";

describe("ACCESS", () => {
  beforeEach(() => {
    window.location.hash = "#/home";
    localStorage.clear();
  });

  it("renders the home page with a clear primary action", () => {
    render(<App />);
    expect(screen.getByRole("heading", { name: /build for everyone/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /explore challenges/i })).toBeInTheDocument();
  });

  it("contains all ten challenge entries", () => {
    window.location.hash = "#/challenges";
    render(<App />);
    expect(screen.getAllByText(/challenge/i).length).toBeGreaterThanOrEqual(10);
  });

  it("calculates white-on-black contrast as 21:1", () => {
    expect(contrastRatio("#ffffff", "#000000")).toBeCloseTo(21, 5);
  });

  it("shows the contrast tool", () => {
    window.location.hash = "#/contrast";
    render(<App />);
    expect(screen.getByRole("heading", { name: /make contrast measurable/i })).toBeInTheDocument();
    expect(screen.getByText(/contrast ratio/i)).toBeInTheDocument();
  });

  it("provides a skip link and primary navigation", () => {
    render(<App />);
    expect(screen.getByRole("link", { name: /skip to content/i })).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: /primary navigation/i })).toBeInTheDocument();
  });
});