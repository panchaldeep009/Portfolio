// ts-ignore
import React from 'react';
import { Tunnel } from './Tunnel';
import Lottie from 'react-lottie';
import codeOpenSparks from './../assets/animation_data/codeOpenSparks.json';
import codeBackground from './../assets/animation_data/codeBackground.json';
import codeTransition from './../assets/animation_data/codeTransition.json';

export const App = () => {
  return (
    <Tunnel
      codeChildren={
        <>
          <Lottie
            options={{
              loop: true,
              animationData: codeOpenSparks,
              rendererSettings: {
                preserveAspectRatio: 'none',
              },
            }}
            width="100%"
            height="100%"
            speed={6}
          />
        </>
      }
    />
  );
};
