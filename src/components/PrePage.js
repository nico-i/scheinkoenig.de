import classNames from 'classnames';
import React, { useEffect } from 'react';

export default function PrePage(props) {
  const [isHover, setIsHover] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(props.isVisible);
  const [isClicked, setIsClicked] = React.useState(false);

  const videoBg = props.videoUrl ? (
    <iframe
      src={`${props.videoUrl.split('?')[0]}?background=1&autoplay=1&loop=1&byline=0&title=0`}
      className="-translate-x-1/2 -translate-y-1/2 h-[56.25vw] min-h-screen min-w-[177.77vh] w-screen absolute top-1/2 left-1/2 -z-10"
      frameBorder="0"
      webkitallowfullscreen
      mozallowfullscreen="true"
      allowFullScreen
    />
  ) : null;

  useEffect(() => {
    if (isClicked) {
      setTimeout(() => setIsVisible(false), 300);
    }
  }, [isClicked]);

  return isVisible ? (
    <div
      className={classNames(
        { 'opacity-0': isClicked, 'bg-prepage': !props.videoUrl, 'bg-theme': props.videoUrl },
        'bg-cover transition flex fixed top-0 left-0 w-full h-full bg-center justify-center items-center'
      )}
    >
      {/* If there is a video background, show it */}
      {videoBg}
      <button className="text-center mt-12">
        <span
          onClick={() => setIsClicked(true)}
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          className="tracking-widest font-theme text-primary text-6xl lg:text-hero lg:leading-hero font-medium"
        >
          {props.title}
        </span>
        <br />
        <span
          className={classNames(
            { 'lg:opacity-0': !isHover },
            'transition duration-300 underline lg:underline-offset-4 decoration-2 lg:decoration-4 text-text font-text lg:text-3xl font-black'
          )}
        >
          {props.subtitle}
        </span>
      </button>
    </div>
  ) : null;
}
