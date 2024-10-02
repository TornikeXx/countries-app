import Hero from '@/components/Hero/Hero'
import Blog from '../components/Blog/Blog'
import BlogContent from '../components/Blog-content/Blog-content'

const DestinationsPageView: React.FC = () => {
  return (
    <>
          <Hero title='The coziest small towns to visit this fall' />
          <Blog>
              <BlogContent/>
          </Blog>
    </>
  )
}

export default DestinationsPageView
