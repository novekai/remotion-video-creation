import {AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig} from 'remotion';
import {Background, GlowTitle} from '../components';
import {colors} from '../theme';

export const SceneIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const subS = spring({fps, frame: frame - 36, config: {damping: 200}});
  const subOpacity = interpolate(subS, [0, 1], [0, 1]);
  const subTy = interpolate(subS, [0, 1], [22, 0]);

  return (
    <Background>
      <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 28}}>
        <GlowTitle size={150} from={0}>
          Lumen Clinic
        </GlowTitle>
        <div
          style={{
            fontSize: 44,
            color: colors.gold,
            fontWeight: 600,
            letterSpacing: 6,
            textTransform: 'uppercase',
            opacity: subOpacity,
            transform: `translateY(${subTy}px)`,
          }}
        >
          × NovekAI
        </div>
        <div
          style={{
            marginTop: 30,
            fontSize: 28,
            color: colors.textMuted,
            opacity: interpolate(frame, [60, 80], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
          }}
        >
          AI voice receptionist · Plateau Mont-Royal
        </div>
      </AbsoluteFill>
    </Background>
  );
};
