import classNames from 'classnames';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { BsInstagram, BsVimeo } from 'react-icons/bs';
import { CgClose } from 'react-icons/cg';
import { HiMenuAlt4 } from 'react-icons/hi';
import { TbCrown } from 'react-icons/tb';

export default function NavBar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(true);
  const [fadeIn, setFadeIn] = React.useState(false);

  useEffect(() => {
    if (isOpen) {
      // Set FadeIn flag to set opacity to 0
      setFadeIn(false);
      // Make comp visible
      setIsVisible(true);
      setTimeout(() => {
        // Make comp visible
        setFadeIn(true);
      }, 2);
    } else {
      setTimeout(() => {
        setIsVisible(false);
      }, 200);
    }
  }, [isOpen]);

  return (
    <>
      <div className="fixed top-0 z-20 flex w-full justify-between p-4 lg:p-8">
        <Link href={'/'}>
          <a>
            <TbCrown className="h-8 w-8 text-text md:w-10 lg:h-10" />
          </a>
        </Link>
        <button onClick={() => setIsOpen((wasOpen) => !wasOpen)}>
          {isOpen ? (
            <CgClose className="h-8 w-8 text-text md:w-10 lg:h-10" />
          ) : (
            <HiMenuAlt4 className="h-8 w-8 text-text" />
          )}
        </button>
      </div>
      <div
        className={classNames(
          { 'opacity-0': !isOpen || !fadeIn, 'opacity-100': fadeIn && isOpen, hidden: !isVisible },
          'fixed top-0 z-10 flex h-full w-full items-center justify-center bg-theme transition duration-200 lg:mt-4'
        )}
      >
        <ul className="text-center font-theme text-8xl leading-normal text-primary lg:text-hero lg:leading-none">
          <li>
            <Link href={'/'}>
              <a className="hover:text-outline">Work</a>
            </Link>
          </li>
          <li>
            <Link href={'/contact'}>
              <a className="hover:text-outline">Contact</a>
            </Link>
          </li>
          <li>
            <Link href={'/about'}>
              <a className="hover:text-outline">About</a>
            </Link>
          </li>
        </ul>
        <div className="fixed bottom-0 left-0 p-8 lg:p-12">
          <ul className="flex flex-wrap items-center justify-center gap-3 leading-loose text-text md:block">
            <li>
              <Link href={'/imprint'}>
                <a>Imprint</a>
              </Link>
            </li>
            <li>
              <Link href={'/privacy'}>
                <a>Privacy Policy</a>
              </Link>
            </li>
            <li>
              <Link href={'/'}>
                <a>Donation</a>
              </Link>
            </li>
            <li className="mt-2 flex w-full items-center justify-center gap-3 lg:justify-start">
              <Link href={'https://vimeo.com/'}>
                <a>
                  <BsVimeo className="h-6 w-6 text-text" />
                </a>
              </Link>
              <Link href={'https://www.instagram.com/'}>
                <a>
                  <BsInstagram className="h-6 w-6 text-text" />
                </a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
