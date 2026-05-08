import {AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig} from 'remotion';
import {Background, GlowTitle} from '../components';
import {colors} from '../theme';

export const SceneOutro: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const subS = spring({fps, frame: frame - 30, config: {damping: 200}});
  const subOpacity = interpolate(subS, [0, 1], [0, 1]);
  const subTy = interpolate(subS, [0, 1], [20, 0]);

  const ctaS = spring({fps, frame: frame - 60, config: {damping: 200}});
  const ctaOpacity = interpolate(ctaS, [0, 1], [0, 1]);

  return (
    <Background>
      <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 30}}>
        <div
          style={{
            fontSize: 32,
            color: colors.textMuted,
            letterSpacing: 8,
            textTransform: 'uppercase',
            opacity: interpolate(frame, [0, 20], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
          }}
        >
          Built by
        </div>
        <GlowTitle size={170} from={0} color={colors.gold}>
          NovekAI
        </GlowTitle>
        <div
          style={{
            fontSize: 36,
            color: colors.textMuted,
            opacity: subOpacity,
            transform: `translateY(${subTy}px)`,
            marginTop: 20,
          }}
        >
          novekai.agency
        </div>
        <div
          style={{
            marginTop: 30,
            padding: '16px 32px',
            border: `1px solid ${colors.violetSoft}`,
            borderRadius: 999,
            fontSize: 24,
            color: colors.violet,
            opacity: ctaOpacity,
          }}
        >
          espoir@novekai.agency
        </div>
      </AbsoluteFill>
    </Background>
  );
};
