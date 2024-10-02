import styles from "./Blog-content.module.css";
import Image from "@/assets/images/USA-Lambertville-JWCohen-shutterstock2225568369-a.avif"
import Lady from"@/assets/images/Rachel Chang.avif"

const BlogContent:React.FC = () => {
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.imgWrapper}>
        <img src={Image} alt=""/>
      </div>
      <div className={styles.articleWrapper}>
        <h1>Washington, Connecticut</h1>
        <p>Best for Gilmore Girls fans <br /> <br />Vibes: Where Rory and Lorelai lead, we follow…and that road leads to the Connecticut town of Washington, the real-life inspiration for Amy Sherman-Palladino's mother-daughter drama, Gilmore Girls, which garnered a loyal following from 2000 to 2007. Some 4000 residents live within the town's 38.7 square miles, dotted around downtown blocks and bucolic small roads crossing the rolling foothills of the Berkshire Mountains – ideal for leaf-peeping drives (watch out for those deer, Rory!). <br />  <br />Do: With five villages within the town, there’s a Stars Hollow-style town square for every personality type. Washington Green has a library, church, public garden and two museums, while Washington Depot is centered on an abandoned Texaco gas station converted into a lively community gathering space known as the Judy Black Memorial Park and Gardens. <br /> <br /> Eat: The small-town community feel is best absorbed at the old-fashioned full-service grocery store and deli, Washington Food Market, and the Community Table, which partners with local farms for mindfully produced meals. Also serving up cozy vibes with lunch and dinner are The White Horse Country Pub & Restaurant and G.W. Tavern.</p>
      </div>
      <div className={styles.authorWrapper}>
        <img src={Lady} alt="" />
        <div className={styles.info}>
          <h3>Rachel Chang</h3>
          <p>Sep 19, 2024 • 11 min read</p>
        </div>
      </div>
      <div className={styles.btn}>
        <button className={styles.exploreButton}>Explore More</button>
      </div>
    </div>
  );
};

export default BlogContent;
