import React from 'react'
import Hero from '@/components/Hero/Hero'
import Card from "@/pages/home/components/list/Card/Card"
import CardHeader from "@/pages/home/components/list/Card-header/Card-header"
import CardContent from "@/pages/home/components/list/Card-content/Card-content"
import { useParams } from 'react-router-dom'



const HomePageView: React.FC = () => {
  const {lang} = useParams()


  return (
      <>
      <Hero title={lang ==="en" ? "Discover story-worthy travel moments" : "აღმოაჩინე საინტერესო მოგზაურობის მომენტები"} />
      <Card>
          <CardHeader />
          <CardContent/>
      </Card>
      
    </>
  )
}

export default HomePageView
