import React, { useState } from 'react';
import { makeStyles, createStyles } from '@material-ui/core';

type StyleProps = { rotate: number; moment: [number, number] };

const transform = ({ rotate, moment: [x, y] }: StyleProps) => {
  return `rotateY(${[0, 90, 180][rotate] + x}deg) translateX(${
    [0, -45, 0][rotate]
  }%) translateZ(${[10, 0, -10][rotate]}px) rotateX(${-y}deg)`;
};

const gradient =
  '#111218 5%, #2a2d3e 50%, rgba(230,230,230,1) 50%, rgba(255,255,255,1) 100%';

const useStyles = makeStyles(
  createStyles({
    content: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      transformStyle: 'preserve-3d',
      perspective: 200,
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
      pointerEvents: 'none',
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
      background: '#111218',
      transform: 'translateZ(calc(100vw - 2px))',
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
      '& > .codeContent': {
        position: 'absolute',
      },
    },
    wallLeft: {
      width: '200vw',
      transform: 'rotateY(90deg) translateZ(calc(0vw - 1.5px)) rotateZ(180deg)',
      background: `linear-gradient(-90deg, ${gradient})`,
      '& > .codeContent': {
        top: 0,
        left: '50%',
        width: '50%',
        height: '100%',
        transform: 'translateZ(-1px)',
      },
    },
    wallRight: {
      width: '200vw',
      transform: 'rotateY(-90deg) translateZ(calc(100vw - 1.5px))',
      background: `linear-gradient(-90deg, ${gradient})`,
      '& > .codeContent': {
        top: 0,
        left: '50%',
        width: '50%',
        height: '100%',
        transform: 'translateZ(-5px)',
      },
    },
    wallTop: {
      height: '200vw',
      transform: 'rotateX(-90deg) translateZ(calc(100vw - 1.5px))',
      bottom: 0,
      background: `linear-gradient(180deg, ${gradient})`,
      '& > .codeContent': {
        bottom: '50%',
        width: '100%',
        height: '50%',
        transform: 'rotate(-90deg) translateZ(-1px)',
      },
    },
    wallBottom: {
      height: '200vw',
      transform: 'rotateX(90deg) translateZ(calc(100vw - 1.5px))',
      background: `linear-gradient(0deg, ${gradient})`,
      '& > .codeContent': {
        top: '50%',
        width: '100%',
        height: '50%',
        transform: 'rotate(90deg) translateZ(-1px)',
      },
    },
  }),
);

interface TunnelProps {
  codeChildren?: React.ReactNode;
  designChildren?: React.ReactNode;
}

export const Tunnel: React.FC<TunnelProps> = ({ codeChildren }) => {
  const [rotate, setRotate] = useState<number>(1);
  const [moment, setMoment] = useState<[number, number]>([0, 0]);

  const classes = useStyles({ rotate, moment });

  const rangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRotate(parseInt(e.target.value, 10));
  };
  const codeContent = rotate === 2 ? codeChildren : <></>;

  const mouseMoveHandle = (rangeX = 100, rangeY = 100) => ({
    clientX,
    clientY,
  }: React.MouseEvent<HTMLDivElement>) => {
    const hW = window.innerWidth / 2;
    const hH = window.innerHeight / 2;
    const cX = -(hW - clientX);
    const cY = hH - clientY;
    setMoment([(cX * rangeX) / hW, (cY * rangeY) / hH]);
  };

  return (
    <>
      <div className={classes.content} onMouseMove={mouseMoveHandle(10, 10)}>
        <div className={classes.wrapper}>
          {[
            classes.wallLeft,
            classes.wallRight,
            classes.wallTop,
            classes.wallBottom,
          ].map(cla => (
            <div className={[classes.wall, cla].join(' ')}>
              <div className="codeContent">{codeContent}</div>
            </div>
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
