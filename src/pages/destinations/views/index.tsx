import Hero from '@/components/Hero/Hero'
import Blog from '../components/Blog/Blog'
import BlogContent from '../components/Blog-content/Blog-content'
import { useParams } from 'react-router-dom'

const DestinationsPageView: React.FC = () => {
  const {lang} = useParams()
  return (
    <>
          <Hero title={lang==="en" ? "The coziest small towns to visit this fall" : "პატარა ქალაქები, რომლებსაც აუცილებლად უნდა ეწვიო"} />
          <Blog>
              <BlogContent/>
          </Blog>
    </>
  )
}

export default DestinationsPageView
