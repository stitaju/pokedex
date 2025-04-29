import React from 'react';

type LoadingProps = {
  loadingRef: React.RefObject<HTMLDivElement | null>;
};
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
export const Loading = ({ loadingRef }: LoadingProps) => {
  return (
    <section
      ref={loadingRef}
      className="w-[100vw] h-[100vh] flex items-center justify-center z-50 fixed top-0 left-0"
    >
      <h1
        style={{
          color: '#fafafa',
          transform: 'translate(-50%,-50%)',
        }}
        className="absolute opacity-100 text-[15rem] font-[900] top-[50%] left-[50%] select-none"
      >
        LOADING
      </h1>
      <div className="relative flex flex-col justify-center items-center">
        <div className="w-[600px]">
          <DotLottieReact
            src={'./loading.lottie'}
            loop
            autoplay
          />
        </div>
        <span
          className="text-xl flex items-center justify-center"
          style={{ color: 'black' }}
        >
          <strong>Tip: &nbsp;</strong> Press or Swipe ⬅️ /
          ➡️ to navigate
        </span>
      </div>
    </section>
  );
};
