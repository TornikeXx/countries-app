import './App.css'
import Header from './components/Header/Header'
import Hero from './components/Hero/Hero'
import Card from './components/Cards/Card/Card'
import CardHeader from './components/Cards/Card-header/Card-header'
import CardContent from './components/Cards/Card-content/Card-content'




const App:React.FC = () => {

  return (
    <>
      <Header />
      <Hero />
      <Card>
        <CardHeader />
        <CardContent/>
      </Card>
    </>
  )
}

export default App
