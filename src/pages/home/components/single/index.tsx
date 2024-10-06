import { NavLink, useParams } from 'react-router-dom'
import { countriesList } from '../../static/data'
import styles from "./style.module.css"


const SingleArticle = () => {
    const { id } = useParams()

    const countryInfo = countriesList.find((article) => article.id === id)

    const articleDoesNotExist = !countryInfo
    if (articleDoesNotExist) {
        return <div>Country not found</div>;
    }
    
  return (
      <div className={styles.pageWrapper}>
          <img src={countryInfo.background} alt="" />
          <div className={styles.info}>
              <p>{countryInfo.name},</p>
              <p>{countryInfo.capital }</p>
          </div>
          <p>{countryInfo.about}</p>
          <NavLink to="/">
              <button>Back to Home</button>
          </NavLink>
          
    </div>
  )
}

export default SingleArticle
