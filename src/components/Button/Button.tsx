import React from "react";
import styles from "./Button.module.scss";

type Props = {
  title: string;
  onSubmit: () => void;
};

const Button = ({ title, onSubmit }: Props) => {
  return (
    <div className={styles.btn} onClick={onSubmit}>
      {title}
    </div>
  );
};

export default Button;
