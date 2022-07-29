import NavBar from 'components/NavBar';
import PrePage from 'components/prePage';
import useSite from 'hooks/use-site';
import { decode } from 'html-entities';
import { getConfig } from 'lib/config';
import { getPaginatedPosts } from 'lib/posts';
import { getRGBColor } from 'lib/util';
import { Helmet } from 'react-helmet';
import { MouseParallaxContainer, MouseParallaxChild } from 'react-parallax-mouse';
import Link from 'next/link';
import { useState } from 'react';
import { BsInstagram, BsVimeo } from 'react-icons/bs';

export default function Home({ config, posts }) {
  const { metadata = {} } = useSite();
  // Decode metadata to readable text
  const title = decode(metadata.title);
  const description = decode(metadata.description);
  // Get color configurations and convert them to CSS vars
  const colorPrimary = getRGBColor(config.colorPrimary);
  const colorBg = getRGBColor(config.colorBg);
  const colorText = getRGBColor(config.colorText);
  const [activeProject, setActiveProject] = useState('');
  const [isPrePageVisible, setIsPrePageVisible] = useState(true);
  const [isMainVisible, setIsMainVisible] = useState(false);
  let prePageBgImg = null;
  let prePageBgVideo = null;

  if (config.urlPrePageBgVideo !== null) {
    prePageBgVideo = config.urlPrePageBgVideo;
  }
  if (config.imgPrePageBg !== null) {
    prePageBgImg = config.imgPrePageBg.sourceUrl;
  }
  const parallaxStrength = config.parallaxStrength !== 0 ? config.parallaxStrength : 0.01;
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <style>
          {`:root{
            --color-primary: ${colorPrimary};
            --color-bg: ${colorBg};
            --color-text: ${colorText};
            --text-stroke-width: ${config.textStrokeWidth}em;
            --img-prePage: url(${prePageBgImg});
            --font-theme: ${config.fontTheme.split('=')[1].replace('+', ' ')};
            --font-text: ${config.fontText.split('=')[1].replace('+', ' ')};
          }`}
        </style>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href={`${config.fontText}&display=swap`} rel="stylesheet" />
        <link href={`${config.fontTheme}&display=swap`} rel="stylesheet" />
      </Helmet>
      {isPrePageVisible ? (
        <PrePage
          title={title}
          subtitle={description}
          parallaxStrength={parallaxStrength}
          videoUrl={prePageBgVideo}
          isBgImg={prePageBgImg !== null}
          handelClick={() => {
            setIsMainVisible(true);
            setTimeout(() => {
              setIsPrePageVisible(false);
            }, 300);
          }}
        />
      ) : null}
      {isMainVisible ? (
        <>
          <NavBar />
          <main>
            <div className="mt-8 flex h-full w-full flex-wrap items-center justify-center p-6 lg:fixed lg:top-0 lg:right-0 lg:z-30 lg:mt-20 lg:mr-16 lg:block lg:h-48 lg:w-96 lg:flex-nowrap lg:p-0">
              <span className="w-full font-medium text-primary">{config.textIntro}</span>
              <div className="mt-2 flex w-full items-center justify-start gap-3">
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
              </div>
            </div>
            <MouseParallaxContainer className="z-0 grid grid-cols-1 grid-rows-1 place-content-center">
              <MouseParallaxChild
                inverted
                factorX={parallaxStrength * 2}
                factorY={parallaxStrength * 2}
                className="pointer-events-none fixed z-20 hidden h-screen w-screen text-center lg:flex lg:items-center lg:justify-center"
              >
                <h2 className="text-outline font-theme text-thumbnail leading-thumbnail text-primary">
                  {activeProject}
                </h2>
              </MouseParallaxChild>
              <div className="h-screen w-screen lg:overflow-scroll">
                <MouseParallaxContainer className="z-0 grid grid-cols-1 grid-rows-1 place-content-center">
                  <MouseParallaxChild factorX={parallaxStrength} factorY={parallaxStrength}>
                    {posts.map((post) =>
                      post.settings.thumbnailProject !== null ? (
                        <Link href={`/${post.slug}`} key={post.title}>
                          <a className="relative z-0 flex items-center justify-center">
                            <img
                              onMouseOver={() => {
                                setActiveProject(post.title);
                              }}
                              alt={post.settings.thumbnailProject?.altText}
                              src={post.settings.thumbnailProject?.sourceUrl}
                            />
                            <h2 className="text-outline pointer-events-none absolute inset-0 z-10 flex items-center justify-center font-theme text-6xl text-primary md:hidden">
                              {post.title}
                            </h2>
                          </a>
                        </Link>
                      ) : null
                    )}{' '}
                  </MouseParallaxChild>
                </MouseParallaxContainer>
              </div>
            </MouseParallaxContainer>
          </main>
        </>
      ) : null}
    </>
  );
}

export async function getStaticProps() {
  const { posts, pagination } = await getPaginatedPosts({
    queryIncludes: 'archive',
  });
  const config = await getConfig();
  return {
    props: {
      config,
      posts,
      pagination: {
        ...pagination,
        basePath: '/posts',
      },
    },
  };
}
