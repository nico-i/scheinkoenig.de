import Link from 'next/link';
import { Helmet } from 'react-helmet';

export default function Custom404() {
  return (
    <div>
      404
      {/* <Layout>
      <Helmet>
        <title>404 | Page not found</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <Section>
        <Container className={styles.center}>
          <h1>Page Not Found</h1>
          <span>The page you were looking for could not be found.</span>
          <p>
            <Link href="/">
              <a>Go back home</a>
            </Link>
          </p>
        </Container>
      </Section>
    </Layout> */}
    </div>
  );
}

// Next.js method to ensure a static page gets rendered
export async function getStaticProps() {
  return {
    props: {},
  };
}
