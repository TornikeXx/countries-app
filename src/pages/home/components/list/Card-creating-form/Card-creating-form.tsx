import styles from "./Card-creating-form.module.css"
import { FormEvent } from "react";

type CountryCreateFormProps = {
  onCountryCreate: (e: FormEvent<HTMLFormElement>) => void;
};
const CardForm:React.FC<CountryCreateFormProps> = ({onCountryCreate}) => {
  return (
      <form className={styles.wrapper}
      onSubmit={onCountryCreate}
      >
          <input name="name" placeholder="name" />
          <input name="capital" placeholder="capital" />
          <input name="population" placeholder="populaton" />
          <button type="submit">Add</button>
    </form>
  )
}

export default CardForm
