import { QUERY_CONFIG } from 'data/config';
import { getApolloClient } from 'lib/apollo-client';

/**
 * getConfig
 */

export async function getConfig() {
  const apolloClient = getApolloClient();
  const data = await apolloClient.query({
    query: QUERY_CONFIG,
  });
  const config = data?.data.page.config;
  return config;
}
