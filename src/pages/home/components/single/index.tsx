import { NavLink, useParams } from 'react-router-dom'
import { countriesList } from '../../static/data'
import styles from "./style.module.css"


const SingleArticle = () => {
    const { id } = useParams()
    const { lang } = useParams()
    const currentLang = (lang === "en" || lang === "ge") ? lang : "en";
    const countryInfo = countriesList.find((article) => article.id === id)

    const articleDoesNotExist = !countryInfo
    if (articleDoesNotExist) {
        return <div>Country not found</div>;
    }
    
  return (
      <div className={styles.pageWrapper}>
          <img src={countryInfo.background} alt="" />
          <div className={styles.info}>
              <p>{countryInfo.name[currentLang]},</p>
              <p>{countryInfo.capital[currentLang] }</p>
          </div>
          <p>{countryInfo.about[currentLang]}</p>
          <NavLink to="/">
              <button>Back to Home</button>
          </NavLink>
          
    </div>
  )
}

export default SingleArticle
