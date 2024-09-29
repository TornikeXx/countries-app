import Card from '@/components/Cards/Card/Card';
import Hero from '@/components/Hero/Hero';
import CardHeader from '@/components/Cards/Card-header/Card-header'
import CardContent from '@/components/Cards/Card-content/Card-content'
import Layout from '@/components/Layout/Layout'


interface Country {
  name: string;
  capital: string;
  population: string;
  image: string;
}

const App: React.FC = () => {
  const countries:Country[] = [
    { name: "Morroco", capital: "Rabat", population: "37 million", image: "https://lp-cms-production.imgix.net/2022-12/iStock-182059497-RFC.jpg?fit=crop&w=360&ar=1%3A1&auto=format&q=75" },
    { name: "Greece", capital: "Athens", population: "10.4 million", image: "https://lp-cms-production.imgix.net/2020-11/GettyRF_663376932.jpg?fit=crop&w=360&ar=1%3A1&auto=format&q=75" },
    { name:"Italy", capital:"Rome", population:"67 million", image:"https://lp-cms-production.imgix.net/2020-12/LPT0717_078.jpg?fit=crop&w=360&ar=1%3A1&auto=format&q=75"}
]

  return (
    <>
      <Layout>
      <Hero title='Discover story-worthy travel moments' />
      <Card>
        <CardHeader />
        <CardContent countries={countries}/>
      </Card>
      </Layout>
    </>
  )
}

export default App
