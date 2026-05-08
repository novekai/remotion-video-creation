import {AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig} from 'remotion';
import {Background, Card, Caption} from '../components';
import {colors} from '../theme';

const tools = [
  {name: 'Twilio', role: 'Phone number & routing', emoji: '📞', color: '#F22F46'},
  {name: 'ElevenLabs', role: 'AI voice', emoji: '🎙', color: '#FFFFFF'},
  {name: 'n8n', role: 'Webhooks & cron', emoji: '⚙️', color: '#EA4B71'},
  {name: 'Airtable', role: 'Back office', emoji: '📊', color: '#FCB400'},
  {name: 'Google Calendar', role: 'Appointments', emoji: '📅', color: '#4285F4'},
  {name: 'Gmail', role: 'Notifications', emoji: '✉️', color: '#EA4335'},
];

export const SceneStack: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  return (
    <Background>
      <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 60}}>
        <h2
          style={{
            margin: 0,
            fontSize: 64,
            fontWeight: 700,
            color: colors.text,
            opacity: interpolate(frame, [0, 18], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
          }}
        >
          The stack
        </h2>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 36, width: 1500}}>
          {tools.map((tool, i) => {
            const delay = 12 + i * 14;
            const s = spring({fps, frame: frame - delay, config: {damping: 200}});
            const opacity = interpolate(s, [0, 1], [0, 1]);
            const scale = interpolate(s, [0, 1], [0.85, 1]);
            return (
              <Card
                key={tool.name}
                style={{
                  padding: 36,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 24,
                  opacity,
                  transform: `scale(${scale})`,
                }}
              >
                <div
                  style={{
                    width: 88,
                    height: 88,
                    borderRadius: 22,
                    background: `${tool.color}22`,
                    border: `1px solid ${tool.color}55`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 46,
                  }}
                >
                  {tool.emoji}
                </div>
                <div style={{display: 'flex', flexDirection: 'column', gap: 6}}>
                  <div style={{fontSize: 32, fontWeight: 700, color: colors.text}}>{tool.name}</div>
                  <div style={{fontSize: 22, color: colors.textMuted}}>{tool.role}</div>
                </div>
              </Card>
            );
          })}
        </div>
      </AbsoluteFill>
      <Caption from={60} to={140}>One stack, one receptionist, zero human input.</Caption>
    </Background>
  );
};
