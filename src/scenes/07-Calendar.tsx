import {AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig} from 'remotion';
import {Background, SafeImg, Caption} from '../components';
import {colors} from '../theme';

export const SceneCalendar: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const enter = spring({fps, frame, config: {damping: 200}});
  const opacity = interpolate(enter, [0, 1], [0, 1]);
  const scale = interpolate(enter, [0, 1], [0.92, 1]);

  const pulseS = spring({fps, frame: frame - 60, config: {damping: 8, stiffness: 80}});
  const pulseScale = interpolate(pulseS, [0, 1], [1.4, 1], {extrapolateRight: 'clamp'});
  const pulseOpacity = interpolate(frame, [60, 80, 200, 220], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <Background>
      <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center'}}>
        <div style={{position: 'relative', height: 880, opacity, transform: `scale(${scale})`}}>
          <SafeImg
            src="gcal.png"
            fallback="gcal.png"
            style={{
              height: 880,
              width: 'auto',
              objectFit: 'contain',
              borderRadius: 22,
              border: `1px solid ${colors.border}`,
              boxShadow: `0 30px 90px rgba(0,0,0,0.5)`,
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: '38%',
              top: '38%',
              width: 200,
              height: 60,
              border: `3px solid ${colors.violet}`,
              borderRadius: 14,
              boxShadow: `0 0 60px ${colors.violetSoft}`,
              opacity: pulseOpacity,
              transform: `scale(${pulseScale})`,
              pointerEvents: 'none',
            }}
          />
        </div>
      </AbsoluteFill>
      <Caption from={30} to={330}>Appointment created directly in the practitioner's calendar.</Caption>
    </Background>
  );
};
