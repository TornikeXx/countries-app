import React from 'react'
import Hero from '../../../components/Hero/Hero'
import Card from '../components/Card/Card'
import { lazy } from 'react'
import { Suspense } from 'react'

interface Country {
    name: string;
    capital: string;
    population: string;
    image: string;
  }

const HomePageView: React.FC = () => {
    const countries:Country[] = [
        { name: "Morroco", capital: "Rabat", population: "37 million", image: "https://lp-cms-production.imgix.net/2022-12/iStock-182059497-RFC.jpg?fit=crop&w=360&ar=1%3A1&auto=format&q=75" },
        { name: "Greece", capital: "Athens", population: "10.4 million", image: "https://lp-cms-production.imgix.net/2020-11/GettyRF_663376932.jpg?fit=crop&w=360&ar=1%3A1&auto=format&q=75" },
        { name:"Italy", capital:"Rome", population:"67 million", image:"https://lp-cms-production.imgix.net/2020-12/LPT0717_078.jpg?fit=crop&w=360&ar=1%3A1&auto=format&q=75"}
  ]    
  
  const LazyCardHeader = lazy(
    () => import("../components/Card-header/Card-header")
  );
  const LazyCardContent = lazy(
    ()=> import("../components/Card-content/Card-content")
  )
  
  return (
      <>
      <Hero title='Discover story-worthy travel moments' />
      <Card>
        <Suspense fallback={<div>Loading Header...</div>}>
          <LazyCardHeader />
        </Suspense>
        <Suspense fallback={<div>Loading Content...</div>}>
          <LazyCardContent countries={countries}/>
        </Suspense>
      </Card>
      
    </>
  )
}

export default HomePageView
