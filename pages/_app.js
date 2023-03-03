import "../styles/globals.scss"
import "bootstrap/dist/css/bootstrap.min.css"
import Layout from "../components/Layout"
import { StoreProvider } from "../utils/Store"
import { SessionProvider, useSession } from "next-auth/react"
import "react-toastify/dist/ReactToastify.css"
import { useRouter } from "next/router"

function MyApp ({ Component, pageProps: { session, ...pageProps } })  {
    return (
        <>
            <SessionProvider session={session}>
                <StoreProvider>
                    <Layout>
                        {Component.auth ? (
                            <Auth adminOnly={Component.auth.adminOnly}>
                                <Component {...pageProps} />
                            </Auth>
                        ) : (
                            <Component {...pageProps} />
                        )}
                    </Layout>
                </StoreProvider>
            </SessionProvider>
        </>
    )
}


function Auth({ children, adminOnly }) {
    const router = useRouter();
    const { status, data: session } = useSession({
      required: true,
      onUnauthenticated() {
        router.push('/unauthorized?message=login required');
      },
    });
    if (status === 'loading') {
      return <div>Loading...</div>;
    }
    if (adminOnly && !session.user.isAdmin) {
      router.push('/unauthorized?message=admin login required');
    }
  
    return children;
  }

export default MyApp
