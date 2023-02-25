import Head from "next/head";
import { QueryClientProvider, QueryClient } from "react-query";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const queryClient = new QueryClient();

  return (
    <>
      <Head>
        <title>Tasks app</title>
      </Head>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
