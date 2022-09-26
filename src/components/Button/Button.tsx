import React from "react";
import styles from "./Button.module.scss";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  title: string;
  className?: string;
  isLoading?: boolean;
};

const Button = ({ title, className, isLoading, ...props }: Props) => {
  return (
    <button className={`${styles.btn} ${className} `} {...props}>
      {title}
    </button>
  );
};

export default Button;
