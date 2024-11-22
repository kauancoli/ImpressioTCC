import { Layout } from "@/components/Layout/Layout";
import { Loading } from "@/components/Loading";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { SearchProvider } from "@/context/SearchContextType";
import { AddImagePage } from "@/pages/Add";
import { Error404 } from "@/pages/Error404";
import { Login } from "@/pages/Login/Login";
import { Register } from "@/pages/Login/Register";
import { Main } from "@/pages/Main";
import { Pin } from "@/pages/Pin";
import { Profile } from "@/pages/Profile";
import { User } from "@/pages/User";
import { Suspense } from "react";
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";

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
          { path: "/pin/:id", element: <Pin /> },
          { path: "/user/:nickname", element: <User /> },
          { path: "/login", element: <Login /> },
          { path: "/register", element: <Register /> },
          { path: "*", element: <Error404 /> },
        ],
      },
      {
        id: "private",
        element: <PrivateRoute />,
        children: [
          { path: "/profile", element: <Profile /> },
          { path: "/add", element: <AddImagePage /> },
        ],
      },
    ],
  },
]);

function GlobalLayout() {
  return (
    <Suspense fallback={<Loading />}>
      <SearchProvider>
        <Layout>
          <Outlet />
        </Layout>
      </SearchProvider>
    </Suspense>
  );
}

export function PrivateRoute() {
  const { requestStatus, user } = useAuth();

  if (requestStatus === "pending") {
    return <Loading />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

function PublicLayout() {
  const { loading } = useAuth();
  return <div>{loading ? <Loading /> : <Outlet />}</div>;
}
