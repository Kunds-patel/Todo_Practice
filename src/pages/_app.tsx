import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { TodoProvider } from "../context/TodoContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <TodoProvider>
      <Component {...pageProps} />
    </TodoProvider>
  );
}
