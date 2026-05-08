export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;

// Audio is 158.688s. It starts after intro+promise+stack (12s = frame 360),
// runs through to the end. Total composition = 175s.
export const AUDIO_START_FRAME = 360;

export const SCENE_FRAMES = {
  intro: 90,         // 3s
  promise: 120,      // 4s
  stack: 150,        // 5s   ← audio starts after this
  phone: 150,        // 5s
  twilio: 150,       // 5s
  conversation: 1800, // 60s
  calendar: 360,     // 12s
  airtable: 450,     // 15s
  zoom: 1800,        // 60s — 4 sub-zooms × 450f
  outro: 180,        // 6s
} as const;

export const TOTAL_FRAMES = Object.values(SCENE_FRAMES).reduce((a, b) => a + b, 0); // 5250

export const colors = {
  bg: '#0B0B12',
  bgSoft: '#13131F',
  surface: '#1B1B2C',
  border: 'rgba(159, 122, 255, 0.18)',
  violet: '#9F7AFF',
  violetSoft: 'rgba(159, 122, 255, 0.35)',
  gold: '#FFD86E',
  goldSoft: 'rgba(255, 216, 110, 0.4)',
  text: '#F2F2F8',
  textMuted: '#9090A8',
  agent: '#9F7AFF',
  caller: '#3FD9C5',
  success: '#3FD9C5',
} as const;
