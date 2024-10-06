import { Route, Routes } from 'react-router-dom';
import Layout from './layouts/default';
import DestinationsPageView from './pages/destinations/views';
import { lazy, Suspense } from 'react';
import NotFoundPage from './pages/404';
import SingleArticleView from './pages/home/views/single';
import ContactPageView from './pages/contact/views';

const LazyHomePageView = lazy(
  () => import("./pages/home/views/list")
)

const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={
            <Suspense
              fallback={
                <div>Loading...</div>
              }
            >
              <LazyHomePageView />
            </Suspense>
          } />
          <Route path='/:id' element={ <SingleArticleView/>} />
          <Route path='/destinations' element={<DestinationsPageView />} />
          <Route path='/contact' element={<ContactPageView/> } />
        </Route>
        <Route path='*' element={<NotFoundPage />} />
      </Routes>

    </>
  )
}

export default App
