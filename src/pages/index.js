import useSite from 'hooks/use-site';
import { getPaginatedPosts } from 'lib/posts';
import Prepage from 'components/Prepage';
import { getRGBColor } from 'lib/util';
import { useLayoutEffect } from 'react';
import Head from 'next/head';
import { getConfig } from 'lib/config';

export default function Home({ config, posts, pagination }) {
  const { metadata = {} } = useSite();
  const { title, description } = metadata;
  console.table(config);
  // Get color configurations and convert them to CSS vars
  const colorPrimary = getRGBColor(config.colorPrimary, 'primary');
  const colorBg = getRGBColor(config.colorBg, 'bg');
  const colorText = getRGBColor(config.colorText, 'text');

  return (
    <>
      <Head>
        <title>{title}</title>
        <style>:root {
        `{${colorPrimary}
        ${colorBg}
        ${colorText}
        --font-theme: ${config.fontTheme.split('=')[1].replace('+', ' ')};
        --font-text: ${config.fontText.split('=')[1].replace('+', ' ')};
        `}</style>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href={`${config.fontText}&display=swap`}
          rel="stylesheet"
        />
        <link
          href={`${config.fontTheme}&display=swap`}
          rel="stylesheet"
        />
      </Head>
      <Prepage />
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
      }
    },
  };
}
