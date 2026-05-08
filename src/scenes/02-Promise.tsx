import {AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig} from 'remotion';
import {Background} from '../components';
import {colors} from '../theme';

const lines = [
  {text: 'No more missed calls.', highlight: false},
  {text: 'No more lost bookings.', highlight: false},
  {text: 'Available 24 / 7.', highlight: true},
];

export const ScenePromise: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  return (
    <Background>
      <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 30}}>
        {lines.map((line, i) => {
          const delay = i * 30;
          const s = spring({fps, frame: frame - delay, config: {damping: 200}});
          const opacity = interpolate(s, [0, 1], [0, 1]);
          const ty = interpolate(s, [0, 1], [40, 0]);
          return (
            <h2
              key={line.text}
              style={{
                margin: 0,
                fontSize: line.highlight ? 110 : 80,
                fontWeight: line.highlight ? 800 : 600,
                color: line.highlight ? colors.gold : colors.text,
                textShadow: line.highlight ? `0 0 60px ${colors.goldSoft}` : 'none',
                letterSpacing: -1.5,
                opacity,
                transform: `translateY(${ty}px)`,
              }}
            >
              {line.text}
            </h2>
          );
        })}
      </AbsoluteFill>
    </Background>
  );
};
