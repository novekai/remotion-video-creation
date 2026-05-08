import {AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig} from 'remotion';
import {Background, SafeImg, Caption} from '../components';
import {colors} from '../theme';

const tabs = ['Clients', 'Calls', 'Appointments', 'Messages', 'Practitioners', 'Treatments', 'Agent Tests'];

export const SceneAirtable: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const enter = spring({fps, frame, config: {damping: 200}});
  const opacity = interpolate(enter, [0, 1], [0, 1]);
  const ty = interpolate(enter, [0, 1], [40, 0]);

  return (
    <Background>
      <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 40}}>
        <div style={{display: 'flex', gap: 14, opacity, transform: `translateY(${ty}px)`}}>
          {tabs.map((t, i) => {
            const tabS = spring({fps, frame: frame - 20 - i * 6, config: {damping: 200}});
            const tabOpacity = interpolate(tabS, [0, 1], [0, 1]);
            const isActive = t === 'Calls';
            return (
              <div
                key={t}
                style={{
                  padding: '12px 22px',
                  borderRadius: 999,
                  background: isActive ? 'rgba(63,217,197,0.18)' : 'rgba(255,255,255,0.05)',
                  border: `1px solid ${isActive ? 'rgba(63,217,197,0.5)' : 'rgba(255,255,255,0.08)'}`,
                  color: isActive ? colors.success : colors.textMuted,
                  fontSize: 22,
                  fontWeight: isActive ? 700 : 500,
                  opacity: tabOpacity,
                }}
              >
                {t}
              </div>
            );
          })}
        </div>

        <div
          style={{
            position: 'relative',
            width: 1500,
            height: 720,
            opacity,
            transform: `translateY(${ty}px)`,
          }}
        >
          <SafeImg
            src="airtable-calls.png"
            fallback="airtable-calls.png"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'top left',
              borderRadius: 22,
              border: `1px solid ${colors.border}`,
              boxShadow: `0 30px 90px rgba(0,0,0,0.5)`,
            }}
          />
        </div>
      </AbsoluteFill>
      <Caption from={30} to={420}>Every call is logged — transcript, audio, AI summary.</Caption>
    </Background>
  );
};
