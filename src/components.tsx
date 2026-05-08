import React from 'react';
import {AbsoluteFill, Img, staticFile, useCurrentFrame, interpolate, spring, useVideoConfig} from 'remotion';
import {colors} from './theme';

export const Background: React.FC<{children: React.ReactNode}> = ({children}) => {
  return (
    <AbsoluteFill style={{background: colors.bg, fontFamily: 'Inter, system-ui, sans-serif', color: colors.text}}>
      <AbsoluteFill
        style={{
          background:
            'radial-gradient(900px 700px at 25% 30%, rgba(159,122,255,0.18), transparent 60%), radial-gradient(700px 600px at 80% 80%, rgba(255,216,110,0.10), transparent 60%)',
        }}
      />
      {children}
    </AbsoluteFill>
  );
};

export const Caption: React.FC<{children: React.ReactNode; from?: number; to?: number}> = ({children, from = 6, to = 18}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [from, from + 12, to, to + 12], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const ty = interpolate(frame, [from, from + 14], [16, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 80,
        textAlign: 'center',
        opacity,
        transform: `translateY(${ty}px)`,
      }}
    >
      <span
        style={{
          background: 'rgba(13,13,22,0.65)',
          backdropFilter: 'blur(18px)',
          border: `1px solid ${colors.border}`,
          color: colors.text,
          padding: '14px 26px',
          borderRadius: 999,
          fontSize: 28,
          letterSpacing: 0.2,
          fontWeight: 500,
          boxShadow: '0 18px 60px rgba(0,0,0,0.35)',
        }}
      >
        {children}
      </span>
    </div>
  );
};

export const Card: React.FC<{children: React.ReactNode; style?: React.CSSProperties}> = ({children, style}) => (
  <div
    style={{
      background: 'rgba(27,27,44,0.7)',
      border: `1px solid ${colors.border}`,
      borderRadius: 28,
      backdropFilter: 'blur(24px)',
      boxShadow: '0 30px 90px rgba(0,0,0,0.45)',
      ...style,
    }}
  >
    {children}
  </div>
);

export const GlowTitle: React.FC<{children: React.ReactNode; size?: number; from?: number; color?: string}> = ({
  children,
  size = 120,
  from = 0,
  color = colors.text,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const s = spring({fps, frame: frame - from, config: {damping: 200}});
  const opacity = interpolate(s, [0, 1], [0, 1]);
  const scale = interpolate(s, [0, 1], [0.92, 1]);
  return (
    <h1
      style={{
        fontSize: size,
        fontWeight: 700,
        margin: 0,
        letterSpacing: -2,
        color,
        textShadow: `0 0 50px ${colors.violetSoft}, 0 0 120px ${colors.violetSoft}`,
        opacity,
        transform: `scale(${scale})`,
        lineHeight: 1.05,
      }}
    >
      {children}
    </h1>
  );
};

export const SafeImg: React.FC<{
  src: string;
  fallback: string;
  style?: React.CSSProperties;
  alt?: string;
}> = ({src, fallback, style, alt}) => {
  const [errored, setErrored] = React.useState(false);

  if (errored) {
    return (
      <div
        style={{
          ...style,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: 40,
          background: 'rgba(159,122,255,0.10)',
          border: `2px dashed ${colors.violetSoft}`,
          borderRadius: 18,
          color: colors.textMuted,
          fontFamily: 'monospace',
          fontSize: 22,
          flexDirection: 'column',
          gap: 12,
        }}
      >
        <div style={{fontSize: 28, color: colors.violet, fontWeight: 600}}>📁 {fallback}</div>
        <div>Drop this file in /public/ to replace this placeholder</div>
      </div>
    );
  }

  return (
    <Img
      src={staticFile(src)}
      alt={alt}
      style={style}
      onError={() => setErrored(true)}
    />
  );
};
