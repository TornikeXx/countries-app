import { Route, Routes } from 'react-router-dom';
import Layout from './layouts/default';
// import HomePageView from './pages/home/views';
import DestinationsPageView from './pages/destinations/views';
import { lazy,Suspense } from 'react';
import NotFoundPage from './pages/404';

const LazyHomePageView = lazy(
    ()=> import("./pages/home/views")
)
  
const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route element={<Layout/>}>
          <Route path='/' element={
            <Suspense
              fallback={
                <div>Loading...</div>
              }
            >
             <LazyHomePageView/>
            </Suspense>
          } />
          <Route path='/destinations' element={<DestinationsPageView/>} />
        </Route>
        <Route path='*' element={<NotFoundPage/>} />
      </Routes>
      
    </>
  )
}

export default App
