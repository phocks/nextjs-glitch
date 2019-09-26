import Head from 'next/head'
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import absoluteUrl from 'next-absolute-url'


function Index(props) {
  
  return (
    <>
      <Head>
        <title>Next.js project</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <h1>TV Shows</h1>
      <ul>
        {props.shows.map(show => (
          <li key={show.id}>
            <Link href="/p/[id]" as={`/p/${show.id}`}>
              <a>{show.name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}

Index.getInitialProps = async ({ req, query }) => {
  const { origin } = absoluteUrl(req);
  const apiURL = `${origin}/api/test`;
  
  const res = await fetch('https://api.tvmaze.com/search/shows?q=star');
  const data = await res.json();
  
  const localRes = await fetch(apiURL);
  const localData = await localRes.json();
  
  console.log(localData);

  console.log(`Show data fetched. Count: ${data.length}`);

  return {
    shows: data.map(entry => entry.show)
  };
};

export default Index