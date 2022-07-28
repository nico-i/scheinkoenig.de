import { gql } from '@apollo/client';

export const QUERY_CONFIG = gql`
  {
    page(id: "/work/", idType: URI) {
      config {
        colorBg
        colorPrimary
        colorText
        fontText
        fontTheme
        imgPrepageBg {
          sourceUrl
          altText
        }
        urlPrepageBgVideo
      }
    }
  }
`;
