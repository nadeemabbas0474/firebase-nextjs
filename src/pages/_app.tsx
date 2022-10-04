import "../styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "../components/Navbar";
import { useRouter } from "next/router";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "../components/ProtectedRoute";
import { AuthContextProvider } from "../context/AuthContext";
import { ChakraProvider } from "@chakra-ui/react";

const noAuthRequired = ["/", "/login", "/signUp"];

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <>
      <AuthContextProvider>
        <Navbar />
        {noAuthRequired.includes(router.pathname) ? (
          <Component {...pageProps} />
        ) : (
          <ChakraProvider>
            <ProtectedRoute>
              <Component {...pageProps} />
            </ProtectedRoute>
          </ChakraProvider>
        )}
      </AuthContextProvider>
    </>
  );
}

export default MyApp;
