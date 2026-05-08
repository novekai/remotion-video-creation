# Remotion video creation — Lumen Clinic × NovekAI

Programmatic 175-second product demo of the **Lumen Clinic** AI voice receptionist (aesthetic clinic on Plateau Mont-Royal, Montreal). Built with [Remotion](https://www.remotion.dev) by [NovekAI](https://novekai.agency).

## What it shows

A single end-to-end story of one real call:

1. **Intro** — title card "Lumen Clinic × NovekAI"
2. **Promise** — "No more missed calls. No more lost bookings. Available 24 / 7."
3. **Tech stack** — Twilio · ElevenLabs · n8n · Airtable · Google Calendar · Gmail
4. **Phone call** — incoming call to the Twilio number
5. **Twilio Console** — the call appearing in Twilio's call log
6. **Conversation** — animated chat bubbles of the actual transcript (HydraFacial booking with Sophie Lavoie), with the **real call audio** playing in the background
7. **Google Calendar** — the appointment landing in the practitioner's calendar
8. **Airtable Calls table** — the call logged with transcript, audio, AI summary
9. **Field zooms** — call type, date & duration, full transcript, recorded audio waveform
10. **Outro** — "Built by NovekAI"

Total runtime: **175 s** at **1920×1080 @ 30 fps**. The background audio is the actual ElevenLabs-generated conversation (158.7 s MP3), playing from frame 360 to the end.

## Stack

- Remotion 4.0
- React 18 + TypeScript 5
- `@remotion/cli`, `@remotion/transitions`, `@remotion/google-fonts`

## Project structure

```
.
├── package.json, tsconfig.json, remotion.config.ts
├── public/                       # screenshots + audio loaded via staticFile()
│   ├── iphone-call.png
│   ├── twilio-console.png
│   ├── gcal.png
│   ├── airtable-calls.png
│   ├── airtable-zoom.png
│   ├── airtable-transcript.png
│   └── call-audio.mp3
└── src/
    ├── index.ts, Root.tsx
    ├── Video.tsx                 # master composition (Series of scenes + master Audio)
    ├── theme.ts                  # colors, frame durations, audio start frame
    ├── components.tsx            # SafeImg, Caption, Card, GlowTitle, Background
    └── scenes/
        ├── 01-Intro.tsx
        ├── 02-Promise.tsx
        ├── 03-Stack.tsx
        ├── 04-Phone.tsx
        ├── 05-Twilio.tsx
        ├── 06-Conversation.tsx
        ├── 07-Calendar.tsx
        ├── 08-Airtable.tsx
        ├── 09-Zoom.tsx
        └── 10-Outro.tsx
```

## Run it

```bash
npm install
npm start          # opens Remotion Studio at http://localhost:3000
npm run build      # renders Main composition to out/video.mp4
```

The composition is registered as `Main` in `src/Root.tsx`.

## Conventions used

- **Frame-driven only** — no `Math.random()`, no `useState`, no `useEffect`. Every animation is a pure function of `useCurrentFrame()`.
- **`staticFile()`** for every asset in `/public`.
- **`interpolate()`** with `extrapolateLeft: 'clamp'` and `extrapolateRight: 'clamp'` everywhere.
- **`spring()`** for all entry animations (default `damping: 200`).
- **`SafeImg`** wraps `<Img>` so missing assets render a labeled placeholder rather than crashing the build.
