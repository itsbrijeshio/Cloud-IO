import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import Router from "./router";
import "./App.css";

function App() {
  return (
    <>
      <QueryClientProvider client={new QueryClient()}>
        <Router />
      </QueryClientProvider>
      <ToastContainer />
    </>
  );
}

export default App;
