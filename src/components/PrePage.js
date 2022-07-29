import classNames from 'classnames';
import { useEffect, useState } from 'react';

export default function PrePage(props) {
  const [isHover, setIsHover] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isClicked, setIsClicked] = useState(false);
  const videoBg = props.videoUrl ? (
    <iframe
      src={`${props.videoUrl.split('?')[0]}?background=1&autoplay=1&loop=1&byline=0&title=0`}
      className="absolute top-1/2 left-1/2 -z-10 h-[56.25vw] min-h-screen w-screen min-w-[177.77vh] -translate-x-1/2 -translate-y-1/2"
      frameBorder="0"
      webkitallowfullscreen="true"
      mozallowfullscreen="true"
      allowFullScreen
    />
  ) : null;

  useEffect(() => {
    if (isClicked) {
      setTimeout(() => {
        setIsVisible(false);
      }, 300);
    }
  }, [isClicked]);

  return isVisible ? (
    <div
      className={classNames(
        { 'opacity-0': isClicked, 'bg-prepage': props.isBgImg, 'bg-theme': props.videoUrl || !props.isBgImg },
        'fixed top-0 left-0 z-50 flex h-full w-full items-center justify-center bg-cover bg-center transition duration-300'
      )}
    >
      {/* If there is a video background, show it */}
      {videoBg}
      <button className="mt-12 text-center">
        <span
          onClick={() => setIsClicked(true)}
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          className="font-theme text-6xl font-medium tracking-widest text-primary lg:text-hero lg:leading-hero"
        >
          {props.title}
        </span>
        <br />
        <span
          className={classNames(
            { 'lg:opacity-0': !isHover },
            'font-text font-black text-text underline decoration-2 transition duration-300 lg:text-3xl lg:decoration-4 lg:underline-offset-4'
          )}
        >
          {props.subtitle}
        </span>
      </button>
    </div>
  ) : null;
}
