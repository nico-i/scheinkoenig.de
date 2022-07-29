import classNames from 'classnames';
import { useEffect, useState } from 'react';

export default function PrePage({ videoUrl, onVisibilityChange, isBgImg, title, subtitle, parallaxStrength }) {
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
    <div
      className={classNames(
        { 'opacity-0': fadeOut, 'bg-prepage': isBgImg, 'bg-theme': videoUrl || !isBgImg },
        'fixed top-0 left-0 z-50 flex h-screen w-screen items-center justify-center bg-cover bg-center transition duration-300'
      )}
    >
      {/* If there is a video background, show it */}
      {videoBg}
      <button
        className="mt-12 text-center"
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        onClick={() => {
          setFadeOut(true);
          onVisibilityChange(false);
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
  );
}
