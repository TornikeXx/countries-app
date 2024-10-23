import styles from "./Blog-content.module.css";
import Image from "@/assets/images/USA-Lambertville-JWCohen-shutterstock2225568369-a.avif"
import Lady from "@/assets/images/Rachel Chang.avif"
import { useParams } from "react-router-dom";


type Translation = Record<string, string>;

type Blog = {
  title: Translation;
  blog: Translation;
};

const blogList:Blog[] = [
  {
    title: {
      en: "Washington, Connecticut",
      ge:"ვაშინგტონი,კონექტიკუტი"
    },
    blog: {
      en: "Best for Gilmore Girls fans     Vibes: Where Rory and Lorelai lead, we follow…and that road leads to the Connecticut town of Washington, the real-life inspiration for Amy Sherman-Palladino's mother-daughter drama, Gilmore Girls, which garnered a loyal following from 2000 to 2007. Some 4000 residents live within the town's 38.7 square miles, dotted around downtown blocks and bucolic small roads crossing the rolling foothills of the Berkshire Mountains – ideal for leaf-peeping drives (watch out for those deer, Rory!).   Do: With five villages within the town, there’s a Stars Hollow-style town square for every personality type. Washington Green has a library, church, public garden and two museums, while Washington Depot is centered on an abandoned Texaco gas station converted into a lively community gathering space known as the Judy Black Memorial Park and Gardens.      Eat: The small-town community feel is best absorbed at the old-fashioned full-service grocery store and deli, Washington Food Market, and the Community Table, which partners with local farms for mindfully produced meals. Also serving up cozy vibes with lunch and dinner are The White Horse Country Pub & Restaurant and G.W. Tavern.",
      ge: "აი, სადაც რორი და ლორელაი მიდიან, ჩვენ მივყვებით… და ეს გზა მიგვიყვანს კონექტიკუტის ქალაქ ვაშინგტონში, რომელიც რეალურ ცხოვრებაში გახდა ემი შერმან-პალადინოს დედა-შვილის დრამის, გილმორების გოგონების შთაგონების წყარო. სერიალი 2000 წლიდან 2007 წლამდე დიდი პოპულარობით სარგებლობდა. დაახლოებით 4000 მცხოვრები ცხოვრობს ქალაქის 38.7 კვადრატულ მილში, რომელიც გადაჭიმულია ქალაქის ცენტრში და მყუდრო პატარა გზებზე, რომლებიც გადის ბერკშირის მთების დასაწყისის ფერდობებზე – იდეალური ადგილი შემოდგომის ფოთლების ყურებისთვის (დაიცავი თავი იმ ირმებისგან, რორი!).რას ვაკეთებთ: ვაშინგტონში ხუთი სოფელია და ყველა სოფელი თავისი ვარსკვლავური ჰოლოუს ტიპის მოედნით გამოირჩევა. ვაშინგტონ გრინში მდებარეობს ბიბლიოთეკა, ეკლესია, საზოგადოებრივი ბაღი და ორი მუზეუმი, ხოლო ვაშინგტონ დეპოში – ძველი Texaco ბენზინგასამართი სადგური, რომელიც გარდაიქმნა აქტიურ საზოგადოებრივ სივრცედ, რომელიც ცნობილია როგორც ჯუდი ბლექის მემორიალური პარკი და ბაღები."
    }
  }
]



const BlogContent: React.FC = () => { 

  const { lang } = useParams()
  const currentLang = lang || "en";

  
  
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.imgWrapper}>
        <img src={Image} alt=""/>
      </div>
      <div className={styles.articleWrapper}>
        <h1>{blogList[0].title[currentLang]}</h1>
        <p>{blogList[0].blog[currentLang] }</p>
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
