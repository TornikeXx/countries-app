import React from 'react'
import Hero from '../../../components/Hero/Hero'
import Card from '../components/Card/Card'
import CardHeader from '../components/Card-header/Card-header'
import CardContent from '../components/Card-content/Card-content'


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
  
  
  return (
      <>
      <Hero title='Discover story-worthy travel moments' />
      <Card>
          <CardHeader />
          <CardContent countries={countries}/>
      </Card>
      
    </>
  )
}

export default HomePageView
