export default function Custom404() {
  return <div>404</div>;
}

// Next.js method to ensure a static page gets rendered
export async function getStaticProps() {
  return {
    props: {},
  };
}
