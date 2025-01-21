import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import store, { persistor } from "./redux/store.ts";
import router from "./routes/routes.tsx";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
        <Toaster position="bottom-right" reverseOrder={false} />
      </PersistGate>
    </Provider>
  </StrictMode>
);
