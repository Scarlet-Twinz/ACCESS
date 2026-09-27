export type Page =
  | "home"
  | "learn"
  | "challenges"
  | "challenge"
  | "inspector"
  | "contrast"
  | "keyboard"
  | "report"
  | "about";

export type Challenge = {
  id: string;
  title: string;
  category: string;
  difficulty: "Beginner" | "Intermediate";
  summary: string;
  issue: string;
  why: string;
  repair: string;
  verification: string;
};

export type Finding = {
  id: string;
  challengeId: string;
  title: string;
  status: "verified" | "review";
  detail: string;
};

export type ReportState = {
  completed: string[];
  findings: Finding[];
  contrastChecks: number;
  keyboardCompleted: boolean;
};