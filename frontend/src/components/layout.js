import Head from "next/head";
import Header from "./header";
import { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";

export default function Layout({
  children,
  title = "Kitchen365 - Product Catalog",
}) {
  const router = useRouter();

  // Hide header on login page
  const hideHeader = router.pathname?.startsWith("/auth/login") || router.pathname?.startsWith("/auth/register");

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta
          name="description"
          content="Kitchen365 Product Catalog Application"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {!hideHeader && <Header />}
        <div className="h-4" />
        {/* <main className="container mx-auto px-4 py-8 max-w-6xl"> */}
        <main className="container mx-auto px-4 py-8 max-w-6xl pt-16">
          {children}
          <Toaster position="top-right" reverseOrder={false} />
        </main>
      </div>
    </>
  );
}
