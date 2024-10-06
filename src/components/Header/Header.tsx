import styles from "./Header.module.css"
import logo from "@/assets/logo.svg"
import search from "@/assets/search.svg"
import save from "@/assets/save.svg"
import { NavLink,NavLinkRenderProps } from "react-router-dom"

const Header: React.FC = () => {
  const handleActiveNav = (props: NavLinkRenderProps) => {
    const { isActive } = props;

    if (isActive) {
      return styles["active_nav_item"];
    } else {
      return styles["nav_item"];
    }
  };
  return (
    <div className={styles.headerWrapper}>
      <div className={styles.nav}>
        <NavLink to="/">
          <img src={logo} alt="" />
        </NavLink>
        <NavLink to="/destinations" className={handleActiveNav}>
          Destinations 
        </NavLink>
        <NavLink to="/contact" className={handleActiveNav}>
          Contact
        </NavLink>
      </div>
      <div className={styles.navigation}>
        <div className={styles.attributes}>
          <img src={search} alt="" />
          <p>Search</p>
        </div>
        <div className={styles.attributes}>
          <img src={save} alt="" />
          <p>Saves</p>
        </div>
        <button>Sign In</button>
      </div>
    </div>
  )
}

export default Header
