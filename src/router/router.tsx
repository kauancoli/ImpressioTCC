import { Layout } from "@/components/Layout/Layout";
import { Loading } from "@/components/Loading";
import { PinInfo } from "@/components/PinDetail/PinInfo";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { Login } from "@/pages/Login";
import { Main } from "@/pages/Main";
import { Suspense } from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

export default function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

const router = createBrowserRouter([
  {
    id: "main",
    element: <GlobalLayout />,
    children: [
      {
        id: "public",
        element: <PublicLayout />,
        children: [
          { path: "/", element: <Main /> },
          { path: "/pin/:id", element: <PinInfo /> },
          { path: "/login", element: <Login /> },
        ],
      },
    ],
  },
]);

function GlobalLayout() {
  return (
    <Suspense fallback={<Loading />}>
      <Outlet />
    </Suspense>
  );
}

function PublicLayout() {
  const { loading } = useAuth();
  console.log(loading);
  return (
    <div>
      <Layout>{loading ? <Loading /> : <Outlet />}</Layout>
    </div>
  );
}
