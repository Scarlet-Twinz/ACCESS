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

export type Difficulty = "Beginner" | "Intermediate";

export type Challenge = {
  id: string;
  title: string;
  category: string;
  difficulty: Difficulty;
  summary: string;
  scenario: string;
  impact: string;
  principle: string;
  investigation: string;
  issue: string;
  why: string;
  repair: string;
  verification: string;
  references: string[];
};

export type Finding = {
  id: string;
  challengeId: string;
  title: string;
  status: "verified" | "review";
  detail: string;
};

export type InspectionSeverity = "Critical" | "Serious" | "Moderate";

export type InspectionFinding = {
  id: string;
  title: string;
  severity: InspectionSeverity;
  element: string;
  why: string;
  repair: string;
  verification: string;
};

export type Activity = {
  id: string;
  type: "challenge" | "inspection" | "contrast" | "keyboard";
  label: string;
  detail: string;
  at: string;
};

export type ContrastCheck = {
  id: string;
  foreground: string;
  background: string;
  ratio: number;
  normal: boolean;
  large: boolean;
  nonText: boolean;
  at: string;
};

export type ReportState = {
  completed: string[];
  attempts: Record<string, number>;
  findings: Finding[];
  inspectionFindings: InspectionFinding[];
  contrastChecks: number;
  contrastHistory: ContrastCheck[];
  keyboardCompleted: boolean;
  activity: Activity[];
};