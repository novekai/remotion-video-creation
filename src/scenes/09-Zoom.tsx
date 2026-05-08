import {AbsoluteFill, Series, useCurrentFrame, interpolate, spring, useVideoConfig} from 'remotion';
import {Background, SafeImg, Card} from '../components';
import {colors} from '../theme';

const SUB_DURATION = 450; // 15s per sub-zoom

const ZoomCard: React.FC<{label: string; children: React.ReactNode}> = ({label, children}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const enter = spring({fps, frame, config: {damping: 200}});
  const opacity = interpolate(enter, [0, 1], [0, 1]);
  const scale = interpolate(enter, [0, 1], [0.94, 1]);

  return (
    <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 28}}>
      <div
        style={{
          fontSize: 22,
          color: colors.violet,
          fontWeight: 700,
          letterSpacing: 6,
          textTransform: 'uppercase',
          opacity,
        }}
      >
        {label}
      </div>
      <div style={{opacity, transform: `scale(${scale})`}}>{children}</div>
    </AbsoluteFill>
  );
};

const ScreenshotWithHighlight: React.FC<{
  src: string;
  highlight: {left: string; top: string; width: string; height: string};
  width?: number;
}> = ({src, highlight, width = 1100}) => {
  const frame = useCurrentFrame();
  // Highlight: fade in from 18→30, stay through 420, fade out 420→450.
  const highlightOpacity = interpolate(
    frame,
    [18, 30, SUB_DURATION - 30, SUB_DURATION],
    [0, 1, 1, 0],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
  );
  const pulse = 1 + Math.sin(frame * 0.18) * 0.025;

  return (
    <div style={{position: 'relative', width, transform: `scale(${pulse})`}}>
      <SafeImg
        src={src}
        fallback={src}
        style={{
          width: '100%',
          height: 'auto',
          borderRadius: 18,
          border: `1px solid ${colors.border}`,
          boxShadow: '0 30px 90px rgba(0,0,0,0.5)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          ...highlight,
          border: `3px solid ${colors.violet}`,
          borderRadius: 8,
          boxShadow: `0 0 50px ${colors.violetSoft}, inset 0 0 30px ${colors.violetSoft}`,
          opacity: highlightOpacity,
          pointerEvents: 'none',
        }}
      />
    </div>
  );
};

const ZoomMode: React.FC = () => (
  <ZoomCard label="Call type">
    <ScreenshotWithHighlight
      src="airtable-zoom.png"
      highlight={{left: '67%', top: '12%', width: '31%', height: '85%'}}
    />
  </ZoomCard>
);

const ZoomTime: React.FC = () => (
  <ZoomCard label="Date & duration">
    <ScreenshotWithHighlight
      src="airtable-zoom.png"
      highlight={{left: '1%', top: '12%', width: '66%', height: '85%'}}
    />
  </ZoomCard>
);

const ZoomTranscript: React.FC = () => {
  const frame = useCurrentFrame();
  const fadeIn = interpolate(frame, [0, 18], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

  return (
    <ZoomCard label="Full transcript">
      <div style={{position: 'relative', width: 1000, opacity: fadeIn}}>
        <SafeImg
          src="airtable-transcript.png"
          fallback="airtable-transcript.png"
          style={{
            width: '100%',
            height: 'auto',
            borderRadius: 18,
            border: `1px solid ${colors.border}`,
            boxShadow: '0 30px 90px rgba(0,0,0,0.5)',
          }}
        />
      </div>
    </ZoomCard>
  );
};

const ZoomAudio: React.FC = () => {
  const frame = useCurrentFrame();
  const bars = 48;
  // 15s sub-scene = 450 frames. Show timer counting 0→15s.
  const seconds = Math.min(15, Math.floor(frame / 30));
  const mm = String(Math.floor(seconds / 60)).padStart(2, '0');
  const ss = String(seconds % 60).padStart(2, '0');

  return (
    <ZoomCard label="Recorded audio">
      <Card style={{padding: 48, width: 1200, display: 'flex', alignItems: 'center', gap: 28}}>
        <div
          style={{
            width: 88,
            height: 88,
            borderRadius: 44,
            background: colors.violet,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 36,
            color: 'white',
            boxShadow: `0 0 40px ${colors.violetSoft}`,
          }}
        >
          ▶
        </div>
        <div style={{display: 'flex', alignItems: 'center', gap: 4, height: 110, flex: 1}}>
          {Array.from({length: bars}).map((_, i) => {
            const phase = frame * 0.32 + i * 0.4;
            const h = 18 + Math.abs(Math.sin(phase)) * 80 + ((i * 13) % 11) * 3;
            const progressed = i < (frame / SUB_DURATION) * bars;
            return (
              <div
                key={i}
                style={{
                  flex: 1,
                  height: h,
                  background: progressed ? colors.violet : 'rgba(159,122,255,0.25)',
                  borderRadius: 4,
                }}
              />
            );
          })}
        </div>
        <div style={{fontSize: 26, color: colors.textMuted, fontFamily: 'monospace'}}>
          {`${mm}:${ss} / 02:38`}
        </div>
      </Card>
    </ZoomCard>
  );
};

export const SceneZoom: React.FC = () => {
  return (
    <Background>
      <Series>
        <Series.Sequence durationInFrames={SUB_DURATION}>
          <ZoomMode />
        </Series.Sequence>
        <Series.Sequence durationInFrames={SUB_DURATION}>
          <ZoomTime />
        </Series.Sequence>
        <Series.Sequence durationInFrames={SUB_DURATION}>
          <ZoomTranscript />
        </Series.Sequence>
        <Series.Sequence durationInFrames={SUB_DURATION}>
          <ZoomAudio />
        </Series.Sequence>
      </Series>
    </Background>
  );
};
