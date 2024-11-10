import styles from "./Card-creating-form.module.css";
import { ChangeEvent, FormEvent, useState } from "react";

type Translation = {
  ge: string;
  en: string;
};
type CountryCreateFormProps = {
  onCountryCreate: (articleFields: {
    name: Translation;
    capital: Translation;
    population: string;
    image: string | null;
    background: string;
    about: Translation;
  }) => void;
};
const CardForm: React.FC<CountryCreateFormProps> = ({ onCountryCreate }) => {
  const [nameEn, setNameEn] = useState("");
  const [nameGe, setNameGe] = useState("");
  const [capitalEn, setCapitalEn] = useState("");
  const [capitalGe, setCapitalGe] = useState("");
  const [population, setPopulation] = useState("");
  const [isEnglish, setIsEnglish] = useState(true);
  const [image, setImage] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChangeNameEn = (e: ChangeEvent<HTMLInputElement>) =>
    setNameEn(e.target.value);
  const handleChangeNameGe = (e: ChangeEvent<HTMLInputElement>) =>
    setNameGe(e.target.value);
  const handleChangeCapitalEn = (e: ChangeEvent<HTMLInputElement>) =>
    setCapitalEn(e.target.value);
  const handleChangeCapitalGe = (e: ChangeEvent<HTMLInputElement>) =>
    setCapitalGe(e.target.value);
  const handleChangePopulation = (e: ChangeEvent<HTMLInputElement>) =>
    setPopulation(e.target.value);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    onCountryCreate({
      name: { en: nameEn, ge: nameGe },
      capital: { en: capitalEn, ge: capitalGe },
      population,
      image:
        image ||
        "https://lp-cms-production.imgix.net/2020-12/LPT0717_078.jpg?fit=crop&w=360&ar=1%3A1&auto=format&q=75",
      background:
        "https://lp-cms-production.imgix.net/2021-10/Chapultepec%20Castle%2C%20Mexico%20City%2C%20Mexico%20Dowraik%20shutterstock_1609490656%20rfe.jpg?w=1920&h=640&fit=crop&crop=faces%2Cedges&auto=format&q=75",
      about: {
        en: `detailed information about ${nameEn}`,
        ge: `დეტალური ინფორმაცია ${nameGe}-ს შესახებ`,
      },
    });

    setNameEn("");
    setCapitalEn("");
    setNameGe("");
    setCapitalGe("");
    setPopulation("");
    setImage(null);
  };
  return (
    <div className={styles.wrapper}>
      <div className="div">
        <button onClick={() => setIsEnglish(true)} disabled={isEnglish}>
          English
        </button>
        <button onClick={() => setIsEnglish(false)} disabled={!isEnglish}>
          ქართული
        </button>
      </div>
      <form className={styles.formWrapper} onSubmit={handleSubmit}>
        {isEnglish ? (
          <>
            <input
              name="nameEng"
              type="text"
              placeholder="name"
              value={nameEn}
              onChange={handleChangeNameEn}
              minLength={3}
              maxLength={40}
            />
            <input
              name="capitalEng"
              placeholder="capital"
              value={capitalEn}
              onChange={handleChangeCapitalEn}
              minLength={3}
            />
          </>
        ) : (
          <>
            <input
              name="nameGeo"
              type="text"
              placeholder="სახელი"
              value={nameGe}
              onChange={handleChangeNameGe}
              minLength={3}
              maxLength={40}
            />
            <input
              name="capitalGeo"
              placeholder="დედაქალაქი"
              value={capitalGe}
              onChange={handleChangeCapitalGe}
            />
          </>
        )}

        <input
          name="population"
          placeholder="populaton"
          value={population}
          onChange={handleChangePopulation}
        />
        <input type="file" accept=".png, .jpg" onChange={handleImageUpload} />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default CardForm;
