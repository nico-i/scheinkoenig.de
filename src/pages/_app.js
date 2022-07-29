import NextApp from 'next/app';

import { SiteContext, useSiteContext } from 'hooks/use-site';

import { getCategories } from 'lib/categories';
import { getRecentPosts } from 'lib/posts';
import { getSiteMetadata } from 'lib/site';
import 'styles/globals.css';

function App({ Component, pageProps = {}, metadata, recentPosts, categories }) {
  const site = useSiteContext({
    metadata,
    recentPosts,
    categories,
  });
  return (
    <SiteContext.Provider value={site}>
      <Component {...pageProps} />
    </SiteContext.Provider>
  );
}

App.getInitialProps = async function (appContext) {
  const appProps = await NextApp.getInitialProps(appContext);

  const { posts: recentPosts } = await getRecentPosts({
    count: 5,
    queryIncludes: 'index',
  });

  const { categories } = await getCategories({
    count: 5,
  });

  return {
    ...appProps,
    metadata: await getSiteMetadata(),
    recentPosts,
    categories,
  };
};

export default App;
