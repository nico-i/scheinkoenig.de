import NextApp from 'next/app';

import { SiteContext, useSiteContext } from 'hooks/use-site';

import { getCategories } from 'lib/categories';
import { createMenuFromPages, getAllMenus, MENU_LOCATION_NAVIGATION_DEFAULT } from 'lib/menus';
import { getTopLevelPages } from 'lib/pages';
import { getRecentPosts } from 'lib/posts';
import { getSiteMetadata } from 'lib/site';
import 'styles/globals.css';

function App({ Component, pageProps = {}, metadata, recentPosts, categories, menus }) {
  const site = useSiteContext({
    metadata,
    recentPosts,
    categories,
    menus,
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

  const { menus } = await getAllMenus();

  const defaultNavigation = createMenuFromPages({
    locations: [MENU_LOCATION_NAVIGATION_DEFAULT],
    pages: await getTopLevelPages({
      queryIncludes: 'index',
    }),
  });

  menus.push(defaultNavigation);

  return {
    ...appProps,
    metadata: await getSiteMetadata(),
    recentPosts,
    categories,
    menus,
  };
};

export default App;
