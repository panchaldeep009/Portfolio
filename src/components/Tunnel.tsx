import React, { useState } from 'react';
import { makeStyles, createStyles } from '@material-ui/core';

const transform = ({ rotate }: { rotate: number }) => {
  return `rotateY(${[0, 90, 180][rotate]}deg) translateX(${
    [0, -45, 0][rotate]
  }%)`;
};

const gradient =
  'rgba(108,108,108,1) 25%, rgba(130,130,130,1) 50%, rgba(230,230,230,1) 50%, rgba(255,255,255,1) 100%';

const useStyles = makeStyles(
  createStyles({
    content: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      transformStyle: 'preserve-3d',
      perspective: 400,
    },
    wrapper: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      transformStyle: 'preserve-3d',
      transition: '2s all',
      transform,
    },
    cap: {
      position: 'absolute',
      height: '100vh',
      width: '100vw',
    },
    capStart: {
      background: 'rgba(255,255,255,1)',
      transform: 'translateZ(-100vw)',
    },
    capEnd: {
      background: 'rgba(108,108,108,1)',
      transform: 'translateZ(100vw)',
    },
    wall: {
      position: 'absolute',
      height: '100vh',
      width: '100vw',
      background: `linear-gradient(90deg, ${gradient})`,
      // background: 'black',
      transform: 'translate(-50%, -50%)',
      transformStyle: 'preserve-3d',
      pointerEvents: 'none',
    },
    wallLeft: {
      width: '200vw',
      transform: 'rotateY(90deg) translateZ(0vw)',
    },
    wallRight: {
      width: '200vw',
      transform: 'rotateY(-90deg) translateZ(100vw)',
      background: `linear-gradient(-90deg, ${gradient})`,
    },
    wallTop: {
      height: '200vw',
      transform: 'rotateX(-90deg) translateZ(100vw)',
      bottom: 0,
      background: `linear-gradient(180deg, ${gradient})`,
    },
    wallBottom: {
      height: '200vw',
      transform: 'rotateX(90deg) translateZ(100vw)',
      background: `linear-gradient(0deg, ${gradient})`,
    },
  }),
);

export const Tunnel: React.FC = ({ children }) => {
  const [rotate, setRotate] = useState<number>(1);
  const classes = useStyles({ rotate: rotate });
  const rangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRotate(parseInt(e.target.value, 10));
  };

  return (
    <>
      <div className={classes.content}>
        <div className={classes.wrapper}>
          {[
            classes.wallLeft,
            classes.wallRight,
            classes.wallTop,
            classes.wallBottom,
          ].map(cla => (
            <div className={[classes.wall, cla].join(' ')}>{children}</div>
          ))}
          <div className={[classes.cap, classes.capStart].join(' ')} />
          <div className={[classes.cap, classes.capEnd].join(' ')} />
        </div>
      </div>
      <div style={{ zIndex: 300, position: 'fixed' }}>
        <input
          type="range"
          name="points"
          min="0"
          max="2"
          onChange={rangeHandler}
          value={rotate}
        />
      </div>
    </>
  );
};
