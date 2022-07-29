import classNames from 'classnames';
import { useState } from 'react';
import { MouseParallaxChild, MouseParallaxContainer } from 'react-parallax-mouse';

export default function PrePage({ videoUrl, handelClick, isBgImg, title, subtitle, parallaxStrength }) {
  const [isHover, setIsHover] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const videoBg = videoUrl ? (
    <iframe
      src={`${videoUrl.split('?')[0]}?background=1&autoplay=1&loop=1&byline=0&title=0`}
      className="absolute top-1/2 left-1/2 -z-10 h-[56.25vw] min-h-screen w-screen min-w-[177.77vh] -translate-x-1/2 -translate-y-1/2"
      frameBorder="0"
      webkitallowfullscreen="true"
      mozallowfullscreen="true"
      allowFullScreen
    />
  ) : null;

  return (
    <>
      <MouseParallaxContainer className="fixed top-0 left-0 flex items-center justify-center">
        <MouseParallaxChild inverted factorX={parallaxStrength * 1.5} factorY={parallaxStrength * 1.5}>
          <div
            className={classNames(
              { 'opacity-0': fadeOut, 'bg-prepage': isBgImg, 'bg-theme': videoUrl || !isBgImg },
              'h-screen w-screen scale-110 bg-cover bg-center transition duration-300'
            )}
          >
            {/* If there is a video background, show it */}
            {videoBg}
          </div>
        </MouseParallaxChild>
        <div
          className={classNames(
            { 'opacity-0': fadeOut },
            'absolute inset-0 z-10 flex h-full w-full items-center justify-center transition duration-300'
          )}
        >
          <button
            className="mt-12 text-center"
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            onClick={() => {
              setFadeOut(true);
              handelClick();
            }}
          >
            <span className="font-theme text-6xl font-medium tracking-widest text-primary lg:text-hero lg:leading-hero">
              {title}
            </span>
            <br />
            <span
              className={classNames(
                { 'lg:opacity-0': !isHover },
                'font-text font-black text-text transition duration-300 lg:text-3xl'
              )}
            >
              {subtitle}
            </span>
          </button>
        </div>
      </MouseParallaxContainer>
    </>
  );
}
