import React, { useRef, useState } from "react";
import styles from "./Otp.module.css";

interface OtpProps {
  length: number;
}

const Otp: React.FC<OtpProps> = ({ length }) => {
  const [otp, setOtp] = useState(new Array(length).fill(""));

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === "Backspace") {
      if (otp[index] === "" && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handlePaste = (
    e: React.ClipboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("Text").slice(0, length - index);
    const newOtp = [...otp];

    for (let i = 0; i < pastedData.length; i++) {
      if (index + i < length) {
        newOtp[index + i] = pastedData[i];
      }
    }

    setOtp(newOtp);

    newOtp.forEach((digit, i) => {
      if (inputRefs.current[i]) {
        inputRefs.current[i]!.value = digit;
      }
    });

    const nextIndex = index + pastedData.length;
    if (nextIndex < length) {
      inputRefs.current[nextIndex]?.focus();
    } else {
      buttonRef.current?.focus();
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const value = e.currentTarget.value;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value.length > 1) {
      e.currentTarget.value = value[0];
      return;
    }

    if (value) {
      inputRefs.current[index + 1]?.focus();
    }

    if (newOtp.every((num) => num !== "")) {
      buttonRef.current?.focus();
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.inputs}>
        {otp.map((_input, index) => (
          <input
            ref={(el) => (inputRefs.current[index] = el)}
            key={index}
            type="number"
            maxLength={1}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPaste={(e) => handlePaste(e, index)}
          />
        ))}
      </div>
      <button ref={buttonRef}>confirm</button>
    </div>
  );
};

export default Otp;
