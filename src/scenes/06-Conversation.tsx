import {AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig} from 'remotion';
import {Background} from '../components';
import {colors} from '../theme';

type Bubble =
  | {kind: 'agent' | 'caller'; text: string; from: number}
  | {kind: 'tool'; text: string; from: number};

// Re-timed for a 1800-frame (60s) scene so bubbles breathe alongside the
// real call audio playing in the background.
const bubbles: Bubble[] = [
  {kind: 'agent', text: 'Lumen Clinic, hello. How can I help you?', from: 30},
  {kind: 'caller', text: "Hi, I'd like to book a HydraFacial appointment.", from: 240},
  {kind: 'agent', text: 'Which day would you prefer?', from: 480},
  {kind: 'caller', text: 'How about next Tuesday?', from: 660},
  {kind: 'tool', text: '🛠  check_availability — Sophie Lavoie, May 12', from: 840},
  {kind: 'agent', text: "Sophie isn't available Tuesday. Would Monday work?", from: 1020},
  {kind: 'caller', text: 'Yes, Monday is perfect.', from: 1260},
  {kind: 'tool', text: '🛠  book_appointment — HydraFacial · Monday May 11', from: 1440},
  {kind: 'agent', text: '✅ Appointment confirmed.', from: 1620},
];

const ChatBubble: React.FC<{b: Bubble; index: number}> = ({b, index}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const s = spring({fps, frame: frame - b.from, config: {damping: 200}});
  const opacity = interpolate(s, [0, 1], [0, 1]);
  const ty = interpolate(s, [0, 1], [22, 0]);

  if (b.kind === 'tool') {
    return (
      <div style={{display: 'flex', justifyContent: 'center', opacity, transform: `translateY(${ty}px)`}}>
        <div
          style={{
            background: 'rgba(255,216,110,0.10)',
            border: `1px solid ${colors.goldSoft}`,
            color: colors.gold,
            padding: '14px 24px',
            borderRadius: 14,
            fontSize: 24,
            fontFamily: 'monospace',
          }}
        >
          {b.text}
        </div>
      </div>
    );
  }

  const isAgent = b.kind === 'agent';
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: isAgent ? 'flex-start' : 'flex-end',
        opacity,
        transform: `translateY(${ty}px)`,
      }}
    >
      <div
        style={{
          maxWidth: 720,
          padding: '20px 26px',
          borderRadius: 22,
          background: isAgent ? 'rgba(159,122,255,0.16)' : 'rgba(63,217,197,0.14)',
          border: `1px solid ${isAgent ? colors.violetSoft : 'rgba(63,217,197,0.4)'}`,
          color: colors.text,
          fontSize: 30,
          lineHeight: 1.4,
          borderTopLeftRadius: isAgent ? 6 : 22,
          borderTopRightRadius: isAgent ? 22 : 6,
        }}
      >
        <div style={{fontSize: 18, color: isAgent ? colors.violet : colors.success, marginBottom: 6, fontWeight: 600}}>
          {isAgent ? 'AGENT' : 'CALLER'}
        </div>
        {b.text}
      </div>
    </div>
  );
};

export const SceneConversation: React.FC = () => {
  return (
    <Background>
      <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', padding: 80}}>
        <div style={{display: 'flex', flexDirection: 'column', gap: 14, width: 1400}}>
          {bubbles.map((b, i) => (
            <ChatBubble key={i} b={b} index={i} />
          ))}
        </div>
      </AbsoluteFill>
    </Background>
  );
};
