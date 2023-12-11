import { MantineProvider, createTheme } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/dropzone/styles.css";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import "@mantine/notifications/styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import mantineTheme from "../mantine.config.js";
import App from "./App.jsx";
import "./index.css";
import { store } from "./redux/store.js";

const queryClient = new QueryClient({ defaultOptions: { queries: { refetchOnWindowFocus: false } } });
const theme = createTheme(mantineTheme);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <MantineProvider theme={theme} defaultColorScheme="dark">
            <ModalsProvider>
              <Notifications w={350} autoClose={5000} position="bottom-center" />
              <App />
            </ModalsProvider>
          </MantineProvider>
        </QueryClientProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
