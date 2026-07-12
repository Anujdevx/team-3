export interface CandidateSession {
  id: string;
  name: string;
  avatarInitials: string;
  avatarUrl?: string;
  trustScore: number;
  warningsCount: number;
  status: "SECURE" | "FLAGGED" | "SUSPENDED" | "DISCONNECTED" | "SUBMITTED";
  lastActive: string;
  logs: ActivityLogEntry[];
  webcamUrl?: string;
  screenShareUrl?: string;
  details: {
    connectionStable: boolean;
    screenRecordingActive: boolean;
    audioLevelNormal: boolean;
    browserFocus: boolean;
    gazeDeviations: number;
    phoneDetections: number;
    tabSwitches: number;
    copyPastes: number;
    idleTimeSeconds: number;
    typingAnomaly: boolean;
    keystrokesCount: number;
  };
}

export interface ActivityLogEntry {
  id: string;
  timestamp: string;
  candidateId: string;
  candidateName: string;
  eventDescription: string;
  eventCode: string;
  severity: "HIGH" | "MEDIUM" | "LOW" | "INFO";
  resolved?: boolean;
}

export const MOCK_CANDIDATES: CandidateSession[] = [
  {
    id: "AS-8890",
    name: "Alex Simmons",
    avatarInitials: "AS",
    trustScore: 98,
    warningsCount: 0,
    status: "SECURE",
    lastActive: "Just now",
    webcamUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300",
    screenShareUrl: "/images/code-editor-screen.jpg",
    details: {
      connectionStable: true,
      screenRecordingActive: true,
      audioLevelNormal: true,
      browserFocus: true,
      gazeDeviations: 0,
      phoneDetections: 0,
      tabSwitches: 0,
      copyPastes: 0,
      idleTimeSeconds: 45,
      typingAnomaly: false,
      keystrokesCount: 1420
    },
    logs: [
      {
        id: "l1",
        timestamp: "10:45:22 AM",
        candidateId: "AS-8890",
        candidateName: "Alex Simmons",
        eventDescription: "Exam session initialized securely.",
        eventCode: "SYS-INIT-001",
        severity: "INFO"
      }
    ]
  },
  {
    id: "BM-1102",
    name: "Beatriz Martinez",
    avatarInitials: "BM",
    trustScore: 64,
    warningsCount: 3,
    status: "FLAGGED",
    lastActive: "2 mins ago",
    webcamUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=300",
    screenShareUrl: "/images/browser-screen.jpg",
    details: {
      connectionStable: true,
      screenRecordingActive: true,
      audioLevelNormal: true,
      browserFocus: true,
      gazeDeviations: 8,
      phoneDetections: 0,
      tabSwitches: 2,
      copyPastes: 0,
      idleTimeSeconds: 120,
      typingAnomaly: false,
      keystrokesCount: 850
    },
    logs: [
      {
        id: "l2",
        timestamp: "10:38:15 AM",
        candidateId: "BM-1102",
        candidateName: "Beatriz Martinez",
        eventDescription: "Extended gaze deviation away from screen (sustained 15s).",
        eventCode: "AI-GAZ-009",
        severity: "MEDIUM"
      },
      {
        id: "l3",
        timestamp: "10:35:12 AM",
        candidateId: "BM-1102",
        candidateName: "Beatriz Martinez",
        eventDescription: "Window focus lost. Switched browser tab.",
        eventCode: "SYS-FOC-002",
        severity: "LOW"
      },
      {
        id: "l4",
        timestamp: "10:20:44 AM",
        candidateId: "BM-1102",
        candidateName: "Beatriz Martinez",
        eventDescription: "Background noise threshold exceeded.",
        eventCode: "AI-AUD-002",
        severity: "LOW"
      }
    ]
  },
  {
    id: "CP-4421",
    name: "Chris Peterson",
    avatarInitials: "CP",
    trustScore: 12,
    warningsCount: 8,
    status: "SUSPENDED",
    lastActive: "1 min ago",
    webcamUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=300",
    screenShareUrl: "/images/mobile-chat.jpg",
    details: {
      connectionStable: true,
      screenRecordingActive: true,
      audioLevelNormal: false,
      browserFocus: false,
      gazeDeviations: 24,
      phoneDetections: 3,
      tabSwitches: 14,
      copyPastes: 6,
      idleTimeSeconds: 420,
      typingAnomaly: true,
      keystrokesCount: 2200
    },
    logs: [
      {
        id: "l5",
        timestamp: "10:43:10 AM",
        candidateId: "CP-4421",
        candidateName: "Chris Peterson",
        eventDescription: "Mobile phone detected in camera frame.",
        eventCode: "AI-DEV-004",
        severity: "HIGH"
      },
      {
        id: "l6",
        timestamp: "10:41:05 AM",
        candidateId: "CP-4421",
        candidateName: "Chris Peterson",
        eventDescription: "Impure function / copy-paste pattern detected in editor.",
        eventCode: "SYS-KBD-004",
        severity: "HIGH"
      },
      {
        id: "l7",
        timestamp: "10:39:15 AM",
        candidateId: "CP-4421",
        candidateName: "Chris Peterson",
        eventDescription: "Multiple voices detected in room.",
        eventCode: "AI-AUD-001",
        severity: "HIGH"
      },
      {
        id: "l8",
        timestamp: "10:35:22 AM",
        candidateId: "CP-4421",
        candidateName: "Chris Peterson",
        eventDescription: "Repeated tab switches detected (14 times).",
        eventCode: "SYS-FOC-002",
        severity: "MEDIUM"
      }
    ]
  },
  {
    id: "DH-2045",
    name: "David Hong",
    avatarInitials: "DH",
    trustScore: 92,
    warningsCount: 1,
    status: "SECURE",
    lastActive: "Just now",
    webcamUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300",
    screenShareUrl: "/images/code-editor-screen2.jpg",
    details: {
      connectionStable: true,
      screenRecordingActive: true,
      audioLevelNormal: true,
      browserFocus: true,
      gazeDeviations: 1,
      phoneDetections: 0,
      tabSwitches: 0,
      copyPastes: 0,
      idleTimeSeconds: 15,
      typingAnomaly: false,
      keystrokesCount: 1950
    },
    logs: [
      {
        id: "l9",
        timestamp: "10:30:15 AM",
        candidateId: "DH-2045",
        candidateName: "David Hong",
        eventDescription: "Temporary gaze deviation detected.",
        eventCode: "AI-GAZ-009",
        severity: "LOW"
      }
    ]
  },
  {
    id: "EF-5532",
    name: "Elena Fischer",
    avatarInitials: "EF",
    trustScore: 58,
    warningsCount: 4,
    status: "FLAGGED",
    lastActive: "5 mins ago",
    webcamUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=300",
    screenShareUrl: "/images/google-search.jpg",
    details: {
      connectionStable: true,
      screenRecordingActive: true,
      audioLevelNormal: false,
      browserFocus: true,
      gazeDeviations: 5,
      phoneDetections: 0,
      tabSwitches: 1,
      copyPastes: 0,
      idleTimeSeconds: 85,
      typingAnomaly: false,
      keystrokesCount: 1100
    },
    logs: [
      {
        id: "l10",
        timestamp: "10:42:01 AM",
        candidateId: "EF-5532",
        candidateName: "Elena Fischer",
        eventDescription: "Speech/Voice activity detected in candidate room.",
        eventCode: "AI-AUD-001",
        severity: "MEDIUM"
      },
      {
        id: "l11",
        timestamp: "10:37:12 AM",
        candidateId: "EF-5532",
        candidateName: "Elena Fischer",
        eventDescription: "Right-click or developer tools attempt blocked.",
        eventCode: "SYS-KBD-002",
        severity: "MEDIUM"
      }
    ]
  }
];

export const MOCK_ALERTS: ActivityLogEntry[] = [
  {
    id: "a1",
    timestamp: "10:45:22 AM",
    candidateId: "CP-4421",
    candidateName: "Chris Peterson",
    eventDescription: "Unauthorized Device Detected in webcam frame.",
    eventCode: "AI-DEV-004",
    severity: "HIGH"
  },
  {
    id: "a2",
    timestamp: "10:42:01 AM",
    candidateId: "EF-5532",
    candidateName: "Elena Fischer",
    eventDescription: "Voice Activity Detected in background.",
    eventCode: "AI-AUD-001",
    severity: "MEDIUM"
  },
  {
    id: "a3",
    timestamp: "10:38:15 AM",
    candidateId: "BM-1102",
    candidateName: "Beatriz Martinez",
    eventDescription: "Extended Eye Absence from webcam frame.",
    eventCode: "AI-GAZ-009",
    severity: "LOW"
  }
];

export interface KeystrokeEntry {
  timestamp: string;
  char: string;
  timeGapMs: number;
  wpm: number;
  isAnomaly: boolean;
}

export const MOCK_KEYSTROKES: KeystrokeEntry[] = [
  { timestamp: "10:35:10 AM", char: "f", timeGapMs: 120, wpm: 75, isAnomaly: false },
  { timestamp: "10:35:10 AM", char: "u", timeGapMs: 110, wpm: 80, isAnomaly: false },
  { timestamp: "10:35:10 AM", char: "n", timeGapMs: 130, wpm: 82, isAnomaly: false },
  { timestamp: "10:35:11 AM", char: "c", timeGapMs: 100, wpm: 85, isAnomaly: false },
  { timestamp: "10:35:11 AM", char: "t", timeGapMs: 120, wpm: 80, isAnomaly: false },
  { timestamp: "10:35:11 AM", char: "i", timeGapMs: 90, wpm: 85, isAnomaly: false },
  { timestamp: "10:35:12 AM", char: "o", timeGapMs: 95, wpm: 90, isAnomaly: false },
  { timestamp: "10:35:12 AM", char: "n", timeGapMs: 110, wpm: 88, isAnomaly: false },
  { timestamp: "10:35:12 AM", char: " ", timeGapMs: 150, wpm: 80, isAnomaly: false },
  { timestamp: "10:35:13 AM", char: "s", timeGapMs: 105, wpm: 82, isAnomaly: false },
  { timestamp: "10:35:13 AM", char: "o", timeGapMs: 115, wpm: 85, isAnomaly: false },
  { timestamp: "10:35:13 AM", char: "l", timeGapMs: 95, wpm: 88, isAnomaly: false },
  { timestamp: "10:35:14 AM", char: "v", timeGapMs: 110, wpm: 80, isAnomaly: false },
  { timestamp: "10:35:14 AM", char: "e", timeGapMs: 105, wpm: 82, isAnomaly: false },
  { timestamp: "10:35:15 AM", char: "Ctrl+V (Paste)", timeGapMs: 10, wpm: 240, isAnomaly: true },
  { timestamp: "10:35:18 AM", char: "K", timeGapMs: 200, wpm: 50, isAnomaly: false },
  { timestamp: "10:35:19 AM", char: "n", timeGapMs: 120, wpm: 60, isAnomaly: false },
  { timestamp: "10:35:19 AM", char: "a", timeGapMs: 110, wpm: 65, isAnomaly: false },
  { timestamp: "10:35:20 AM", char: "p", timeGapMs: 115, wpm: 70, isAnomaly: false },
  { timestamp: "10:35:20 AM", char: "s", timeGapMs: 100, wpm: 75, isAnomaly: false },
  { timestamp: "10:35:21 AM", char: "a", timeGapMs: 120, wpm: 72, isAnomaly: false },
  { timestamp: "10:35:21 AM", char: "c", timeGapMs: 110, wpm: 78, isAnomaly: false },
  { timestamp: "10:35:22 AM", char: "k", timeGapMs: 115, wpm: 80, isAnomaly: false },
];

export interface FlaggedStudentEntry {
  id: string;
  name: string;
  major: string;
  flags: string[];
  risk: string;
  avatar: string;
}

export const FLAGGED_STUDENTS: FlaggedStudentEntry[] = [
  {
    id: "SEC-84920-X",
    name: "Adrian Thorne",
    major: "Computer Science • Year 3",
    flags: ["Audio Detected", "+2 others"],
    risk: "Critical",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120",
  },
  {
    id: "SEC-11029-B",
    name: "Elena Rodriguez",
    major: "Biochemistry • Year 1",
    flags: ["Device Detected"],
    risk: "Critical",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120",
  },
  {
    id: "SEC-99231-P",
    name: "Marcus Vane",
    major: "Applied Physics • Year 4",
    flags: ["Off-screen Gaze"],
    risk: "Moderate",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=120",
  },
];

export interface ChartLinePoint {
  name: string;
  score: number;
  baseline: number;
}

export const LINE_DATA: ChartLinePoint[] = [
  { name: "Mon", score: 92, baseline: 90 },
  { name: "Tue", score: 94, baseline: 90 },
  { name: "Wed", score: 91, baseline: 90 },
  { name: "Thu", score: 95, baseline: 90 },
  { name: "Fri", score: 96, baseline: 90 },
  { name: "Sat", score: 94, baseline: 90 },
  { name: "Sun", score: 95, baseline: 90 },
];

export interface ChartPieSegment {
  name: string;
  value: number;
  color: string;
}

export const PIE_DATA: ChartPieSegment[] = [
  { name: "Off-screen Gaze", value: 54, color: "oklch(0.43 0.18 330)" },
  { name: "Speech/Talking", value: 28, color: "oklch(0.94 0.01 320)" },
  { name: "Multiple People", value: 18, color: "oklch(0.55 0.01 280)" },
];

