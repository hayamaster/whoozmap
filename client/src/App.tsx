import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { Loading } from "./components";
import { Suspense } from "react";
import { Spinner } from "./components/ui/spinner";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      experimental_prefetchInRender: true,
    },
  },
});

function App() {
  return (
    <Suspense fallback={<Loading size="2xl" />}>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <PersistGate loading={<Spinner />} persistor={persistor}>
            <RouterProvider router={router} />
          </PersistGate>
        </Provider>
      </QueryClientProvider>
    </Suspense>
  );
}

export default App;
