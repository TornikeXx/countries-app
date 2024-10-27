import styles from "./style.module.css";
import { NavLink } from "react-router-dom";
const NotFoundPage: React.FC = () => {
  return (
    <div className={styles.pageWrapper}>
      <h1>404</h1>
      <NavLink to="/">
        <h1>Go to the Home page</h1>
      </NavLink>
    </div>
  );
};

export default NotFoundPage;
