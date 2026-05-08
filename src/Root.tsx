import {Composition} from 'remotion';
import {Video} from './Video';
import {FPS, WIDTH, HEIGHT, TOTAL_FRAMES} from './theme';

export const Root: React.FC = () => {
  return (
    <>
      <Composition
        id="Main"
        component={Video}
        durationInFrames={TOTAL_FRAMES}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
        defaultProps={{}}
      />
    </>
  );
};
