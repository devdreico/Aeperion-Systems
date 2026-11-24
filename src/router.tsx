import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RootLayout } from "@/components/layout/root-layout";
import Home from "@/routes/Home";
import Kspr from "@/routes/Kspr";
import Aelock from "@/routes/Aelock";
import Presentto from "@/routes/Presentto";
import Capacidades from "@/routes/Capacidades";
import Casos from "@/routes/Casos";
import Metodo from "@/routes/Metodo";
import Nosotros from "@/routes/Nosotros";
import Cotizacion from "@/routes/Cotizacion";
import Contacto from "@/routes/Contacto";
import Demo from "@/routes/Demo";
import Blog from "@/routes/Blog";
import BlogPost from "@/routes/BlogPost";
import Faq from "@/routes/Faq";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "kspr", element: <Kspr /> },
      { path: "aelock", element: <Aelock /> },
      { path: "presentto", element: <Presentto /> },
      { path: "capacidades", element: <Capacidades /> },
      { path: "casos", element: <Casos /> },
      { path: "metodo", element: <Metodo /> },
      { path: "nosotros", element: <Nosotros /> },
      { path: "cotizacion", element: <Cotizacion /> },
      { path: "contacto", element: <Contacto /> },
      { path: "demo/:slug", element: <Demo /> },
      { path: "blog", element: <Blog /> },
      { path: "blog/:slug", element: <BlogPost /> },
      { path: "faq", element: <Faq /> },
    ],
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}