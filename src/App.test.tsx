import { beforeEach, describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import App, { contrastRatio } from "./App";
import { challenges, learnTopics } from "./data";

describe("ACCESS Level 2", () => {
  beforeEach(() => {
    window.location.hash = "#/home";
    localStorage.clear();
  });

  it("renders the home experience and primary navigation", () => {
    render(<App />);
    expect(screen.getByRole("heading", { name: /build for everyone/i })).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: /primary navigation/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /skip to content/i })).toHaveAttribute("href", "#main-content");
  });

  it("keeps ten complete challenge records", () => {
    expect(challenges).toHaveLength(10);
    expect(challenges.every((c) => c.scenario && c.impact && c.investigation && c.issue && c.repair && c.verification && c.references.length)).toBe(true);
  });

  it("connects every learning topic to a challenge", () => {
    expect(learnTopics).toHaveLength(10);
    expect(learnTopics.every((topic) => challenges.some((c) => c.id === topic.challengeId))).toBe(true);
  });

  it("calculates reference contrast ratios correctly", () => {
    expect(contrastRatio("#ffffff", "#000000")).toBeCloseTo(21, 5);
    expect(contrastRatio("#000000", "#ffffff")).toBeCloseTo(21, 5);
  });

  it("filters the challenge library", () => {
    window.location.hash = "#/challenges";
    render(<App />);
    expect(screen.getAllByRole("article")).toHaveLength(10);
    fireEvent.change(screen.getByLabelText("Difficulty"), { target: { value: "Beginner" } });
    expect(screen.getByText(/of 10 challenges/i)).toBeInTheDocument();
    expect(screen.getAllByRole("article").length).toBeLessThan(10);
  });

  it("completes the full challenge flow and persists the result", () => {
    window.location.hash = "#/challenge/accessible-name";
    render(<App />);
    fireEvent.click(screen.getByRole("button", { name: /i have investigated/i }));
    fireEvent.click(screen.getByLabelText(/the control exposes no useful accessible name/i));
    fireEvent.click(screen.getByRole("button", { name: /check finding/i }));
    expect(screen.getByText(/apply the repair/i)).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Apply repair →" }));
    expect(screen.getByRole("heading", { name: /repair verified/i })).toBeInTheDocument();
    const saved = JSON.parse(localStorage.getItem("access-report-v2") || "{}");
    expect(saved.completed).toContain("accessible-name");
    expect(saved.attempts["accessible-name"]).toBe(1);
  });

  it("returns structured Inspector findings", () => {
    window.location.hash = "#/inspector";
    render(<App />);
    fireEvent.click(screen.getByRole("button", { name: /run inspection/i }));
    expect(screen.getByText(/button has no accessible name/i)).toBeInTheDocument();
    expect(screen.getAllByText(/element:/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/repair:/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/verify:/i).length).toBeGreaterThan(0);
  });

  it("records a contrast check", () => {
    window.location.hash = "#/contrast";
    render(<App />);
    fireEvent.click(screen.getByRole("button", { name: /record this check/i }));
    const saved = JSON.parse(localStorage.getItem("access-report-v2") || "{}");
    expect(saved.contrastChecks).toBe(1);
    expect(saved.contrastHistory).toHaveLength(1);
  });

  it("completes the keyboard lab", () => {
    window.location.hash = "#/keyboard";
    render(<App />);
    fireEvent.click(screen.getByRole("button", { name: "Support" }));
    expect(screen.getByText(/practice complete/i)).toBeInTheDocument();
    const saved = JSON.parse(localStorage.getItem("access-report-v2") || "{}");
    expect(saved.keyboardCompleted).toBe(true);
  });

  it("shows and resets the local report", () => {
    window.location.hash = "#/report";
    render(<App />);
    expect(screen.getByRole("heading", { name: /see what you verified/i })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /reset local report/i }));
    expect(screen.getByText(/no activity yet/i)).toBeInTheDocument();
  });

  it("exposes the ACCESS self-audit boundary", () => {
    window.location.hash = "#/about";
    render(<App />);
    expect(screen.getByRole("heading", { name: /the product should practice what it teaches/i })).toBeInTheDocument();
    expect(screen.getByText(/keyboard navigation/i)).toBeInTheDocument();
    expect(screen.getByText(/not a claim of universal accessibility conformance/i)).toBeInTheDocument();
  });
});
