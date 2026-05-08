import {AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig} from 'remotion';
import {Background, SafeImg, Caption} from '../components';
import {colors} from '../theme';

export const SceneTwilio: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const enter = spring({fps, frame, config: {damping: 200}});
  const opacity = interpolate(enter, [0, 1], [0, 1]);
  const tx = interpolate(enter, [0, 1], [120, 0]);

  const zoom = interpolate(frame, [60, 180], [1, 1.12], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

  const highlightOpacity = interpolate(frame, [80, 110, 200, 220], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <Background>
      <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center'}}>
        <div
          style={{
            position: 'relative',
            width: 1500,
            height: 720,
            transform: `translateX(${tx}px) scale(${zoom})`,
            opacity,
            transformOrigin: '50% 35%',
          }}
        >
          <SafeImg
            src="twilio-console.png"
            fallback="twilio-console.png"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'top',
              borderRadius: 22,
              border: `1px solid ${colors.border}`,
              boxShadow: `0 30px 90px rgba(0,0,0,0.5)`,
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: 165,
              right: 0,
              height: 70,
              border: `3px solid ${colors.violet}`,
              borderRadius: 12,
              boxShadow: `0 0 60px ${colors.violetSoft}, inset 0 0 40px ${colors.violetSoft}`,
              opacity: highlightOpacity,
              pointerEvents: 'none',
            }}
          />
        </div>
      </AbsoluteFill>
      <Caption from={20} to={130}>Twilio receives the call and hands it to the ElevenLabs agent.</Caption>
    </Background>
  );
};
