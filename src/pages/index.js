import NavBar from 'components/NavBar';
import PrePage from 'components/PrePage';
import useSite from 'hooks/use-site';
import { decode } from 'html-entities';
import { getConfig } from 'lib/config';
import { getPaginatedPosts } from 'lib/posts';
import { getRGBColor } from 'lib/util';
import Head from 'next/head';

export default function Home({ config }) {
  const { metadata = {} } = useSite();
  // Decode metadata to readable text
  const title = decode(metadata.title);
  const description = decode(metadata.description);
  // Get color configurations and convert them to CSS vars
  const colorPrimary = getRGBColor(config.colorPrimary, 'primary');
  const colorBg = getRGBColor(config.colorBg, 'bg');
  const colorText = getRGBColor(config.colorText, 'text');
  let prepageBgImg = null;
  let prepageBgVideo = null;

  if (config.urlPrepageBgVideo !== null) {
    prepageBgVideo = config.urlPrepageBgVideo;
  }
  if (config.imgPrepageBg !== null) {
    prepageBgImg = config.imgPrepageBg.sourceUrl;
  }

  return (
    <>
      <Head>
        <title>{title}</title>
        <style>
          {`:root{
            ${colorPrimary}
            ${colorBg}
            ${colorText}
            --img-prepage: url(${prepageBgImg});
            --font-theme: ${config.fontTheme.split('=')[1].replace('+', ' ')};
            --font-text: ${config.fontText.split('=')[1].replace('+', ' ')};
          }`}
        </style>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href={`${config.fontText}&display=swap`} rel="stylesheet" />
        <link href={`${config.fontTheme}&display=swap`} rel="stylesheet" />
      </Head>
      <NavBar />
      <PrePage title={title} subtitle={description} videoUrl={prepageBgVideo} />
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
