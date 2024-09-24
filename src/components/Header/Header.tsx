import './Header.css'
import logo from "../../assets/logo.svg"
import search from "../../assets/search.svg"
import save from "../../assets/save.svg"

const Header:React.FC = () => {
  return (
    <div className='header-wrapper'>
      <img src={logo} alt=""  />
      <div className="navigation">
        <div className="attributes">
          <img src={search} alt="" />
          <p>Search</p>
        </div>
        <div className="attributes">
          <img src={save} alt="" />
          <p>Saves</p>
        </div>
        <button>Sign In</button>
      </div>
    </div>
  )
}

export default Header
