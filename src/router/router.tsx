import { Layout } from "@/components/Layout/Layout";
import { Loading } from "@/components/Loading";
import { PinInfo } from "@/components/PinDetail/PinInfo";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { Add } from "@/pages/Add";
import { Login } from "@/pages/Login/Login";
import { Register } from "@/pages/Login/Register";
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
          { path: "/add", element: <Add /> },
          { path: "/login", element: <Login /> },
          { path: "/register", element: <Register /> },
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
