import "@/styles/globals.css";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import dynamic from 'next/dynamic';

// Import the overlay component dynamically with SSR disabled
const UploadProgressOverlay = dynamic(
  () => import('@/components/Knowledge/UploadProgressOverlay'),
  { ssr: false }
);

export default function App({ Component, pageProps }) {
  return (
    <UserProvider>
      <Component {...pageProps} />
      <ToastContainer />
      <UploadProgressOverlay />
    </UserProvider>
  );
}