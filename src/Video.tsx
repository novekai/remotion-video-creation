import {Audio, Sequence, Series, staticFile} from 'remotion';
import {AUDIO_START_FRAME, SCENE_FRAMES} from './theme';
import {SceneIntro} from './scenes/01-Intro';
import {ScenePromise} from './scenes/02-Promise';
import {SceneStack} from './scenes/03-Stack';
import {ScenePhone} from './scenes/04-Phone';
import {SceneTwilio} from './scenes/05-Twilio';
import {SceneConversation} from './scenes/06-Conversation';
import {SceneCalendar} from './scenes/07-Calendar';
import {SceneAirtable} from './scenes/08-Airtable';
import {SceneZoom} from './scenes/09-Zoom';
import {SceneOutro} from './scenes/10-Outro';

export const Video: React.FC = () => {
  return (
    <>
      {/* Real call audio plays from frame 360 (after intro+promise+stack)
          through to the end. 158.7s of audio. */}
      <Sequence from={AUDIO_START_FRAME}>
        <Audio src={staticFile('call-audio.mp3')} volume={0.85} />
      </Sequence>

      <Series>
        <Series.Sequence durationInFrames={SCENE_FRAMES.intro}>
          <SceneIntro />
        </Series.Sequence>
        <Series.Sequence durationInFrames={SCENE_FRAMES.promise}>
          <ScenePromise />
        </Series.Sequence>
        <Series.Sequence durationInFrames={SCENE_FRAMES.stack}>
          <SceneStack />
        </Series.Sequence>
        <Series.Sequence durationInFrames={SCENE_FRAMES.phone}>
          <ScenePhone />
        </Series.Sequence>
        <Series.Sequence durationInFrames={SCENE_FRAMES.twilio}>
          <SceneTwilio />
        </Series.Sequence>
        <Series.Sequence durationInFrames={SCENE_FRAMES.conversation}>
          <SceneConversation />
        </Series.Sequence>
        <Series.Sequence durationInFrames={SCENE_FRAMES.calendar}>
          <SceneCalendar />
        </Series.Sequence>
        <Series.Sequence durationInFrames={SCENE_FRAMES.airtable}>
          <SceneAirtable />
        </Series.Sequence>
        <Series.Sequence durationInFrames={SCENE_FRAMES.zoom}>
          <SceneZoom />
        </Series.Sequence>
        <Series.Sequence durationInFrames={SCENE_FRAMES.outro}>
          <SceneOutro />
        </Series.Sequence>
      </Series>
    </>
  );
};
