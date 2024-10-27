import { ChangeEvent, useState } from "react";
import styles from "./Contact-form.module.css";
const ContactForm: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [messageError, setMessageError] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (message.length > 100) {
      setMessageError("max length 100 characters");
    } else {
      setMessageError("");
    }

    console.log({
      name: name,
      email: email,
      message: message,
    });
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setName(value);
  };
  const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setEmail(value);
  };
  const handleChangeMessage = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.currentTarget.value;
    setMessage(value);
  };

  return (
    <form
      className={styles.formsWrapper}
      onSubmit={handleSubmit}
      onKeyDown={handleKeyDown}
    >
      <div className={styles.info}>
        <input
          type="text"
          id="name"
          placeholder="name"
          name="name"
          value={name}
          onChange={handleChangeName}
        />
        <input
          type="email"
          placeholder="email"
          id="email"
          name="email"
          value={email}
          onChange={handleChangeEmail}
        />
      </div>
      <textarea
        className={styles.message}
        placeholder="message"
        id="message"
        value={message}
        name="message"
        onChange={handleChangeMessage}
      />
      <span>{messageError}</span>
      <button type="submit">Send</button>
    </form>
  );
};

export default ContactForm;
