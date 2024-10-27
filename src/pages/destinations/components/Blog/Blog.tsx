import { PropsWithChildren } from "react";
import styles from "./Blog.module.css";
const Blog: React.FC<PropsWithChildren> = ({ children }) => {
  return <div className={styles.blogsWrapper}>{children}</div>;
};

export default Blog;
