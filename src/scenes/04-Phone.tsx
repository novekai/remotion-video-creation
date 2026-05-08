import {AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig} from 'remotion';
import {Background, SafeImg, Caption} from '../components';
import {colors} from '../theme';

export const ScenePhone: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const enter = spring({fps, frame, config: {damping: 200}});
  const opacity = interpolate(enter, [0, 1], [0, 1]);
  const ty = interpolate(enter, [0, 1], [60, 0]);

  return (
    <Background>
      <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center'}}>
        <div style={{position: 'relative', height: 880, width: 420, opacity, transform: `translateY(${ty}px)`}}>
          {[0, 1, 2].map((i) => {
            const t = (frame - i * 18) / 60;
            const ringOpacity = interpolate(t % 1, [0, 0.4, 1], [0.5, 0.15, 0]);
            const ringScale = interpolate(t % 1, [0, 1], [1, 1.45]);
            return (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: 64,
                  border: `3px solid ${colors.violet}`,
                  opacity: ringOpacity,
                  transform: `scale(${ringScale})`,
                }}
              />
            );
          })}

          <SafeImg
            src="iphone-call.png"
            fallback="iphone-call.png"
            style={{
              width: 420,
              height: 880,
              objectFit: 'cover',
              borderRadius: 64,
              boxShadow: `0 0 100px ${colors.violetSoft}`,
              border: '3px solid rgba(255,255,255,0.1)',
            }}
          />
        </div>
      </AbsoluteFill>
      <Caption from={20} to={130}>The caller dials. Twilio routes the call to the agent.</Caption>
    </Background>
  );
};
