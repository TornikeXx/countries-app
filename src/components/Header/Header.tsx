import styles from "./Header.module.css"
import logo from "@/assets/logo.svg"
import search from "@/assets/search.svg"
import save from "@/assets/save.svg"
import { NavLink,NavLinkRenderProps, useLocation, useNavigate, useParams } from "react-router-dom"
import { useState } from "react"

const Header: React.FC = () => {
  const handleActiveNav = (props: NavLinkRenderProps) => {
    const { isActive } = props;

    if (isActive) {
      return styles["active_nav_item"];
    } else {
      return styles["nav_item"];
    }
  };

  const [language,setLanguage] = useState('ge')

  const { lang } = useParams()
  const location = useLocation()
  // console.log(lang)
  const navigation = useNavigate()

  const handleNavigation = () => {
    const newLang = lang === "ge" ? "en" : "ge"
    setLanguage(newLang)
    navigation(`/${newLang}${location.pathname.slice(3)}`)
  }

  return (
    <div className={styles.headerWrapper}>
      <div className={styles.nav}>
        <NavLink to="articles">
          <img src={logo} alt="" />
        </NavLink>
        <NavLink to="destinations" className={handleActiveNav}>
          {lang==="en" ? "Destinations" : "მიმართულებები"}
          
        </NavLink>
        <NavLink to="contact" className={handleActiveNav}>
          {lang === "en" ? "Contact" :"კონტაქტი"}
        </NavLink>
      </div>
      <div className={styles.navigation}>
        <div className={styles.attributes}>
          <img src={search} alt="" />
          <p>{lang==="en" ? "Search" : "ძებნა"}</p>
        </div>
        <div className={styles.attributes}>
          <img src={save} alt="" />
          <p>{lang==="en"? "Saves" : "შენახული" }</p>
        </div>
        <button>{lang==="en" ?"Sign in": "შესვლა" }</button>
        <button onClick={handleNavigation} >{lang === 'ge' ? 'Eng' : 'ქარ'}</button>
      </div>
    </div>
  )
}

export default Header
