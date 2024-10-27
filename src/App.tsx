import { Navigate, Outlet, Route, Routes, useParams } from "react-router-dom";
import Layout from "./layouts/default";
import { lazy, Suspense } from "react";
import NotFoundPage from "./pages/404";
import Loading from "./components/loading";

const HomePageView = lazy(() => import("./pages/home/views/list"));
const SingleArticleView = lazy(() => import("./pages/home/views/single"));
const DestinationsPageView = lazy(() => import("./pages/destinations/views"));
const ContactPageView = lazy(() => import("./pages/contact/views"));

const LangGuard: React.FC = () => {
  const { lang } = useParams();
  const currentLang = lang || "en";
  const locales = ["ge", "en"];

  if (!locales.includes(currentLang)) {
    return <Navigate to={"/en/articles"} />;
  }
  return <Outlet />;
};

const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/:lang" element={<LangGuard />}>
          <Route element={<Layout />}>
            <Route
              path="articles"
              element={
                <Suspense fallback={<Loading />}>
                  <HomePageView />
                </Suspense>
              }
            />
            <Route
              path="articles/:id"
              element={
                <Suspense fallback={<Loading />}>
                  <SingleArticleView />
                </Suspense>
              }
            />
            <Route
              path="destinations"
              element={
                <Suspense fallback={<Loading />}>
                  <DestinationsPageView />
                </Suspense>
              }
            />
            <Route
              path="contact"
              element={
                <Suspense fallback={<Loading />}>
                  <ContactPageView />
                </Suspense>
              }
            />
          </Route>
        </Route>
        <Route path="/" element={<Navigate to={`/en/articles`} />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

export default App;
