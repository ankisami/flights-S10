import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components";
import styles from "./ResumeBookingPage.module.scss";

const ResumeBookingPage = () => {
  const navigation = useNavigate();
  return (
    <div className={styles.container}>
      <h1>Félicitation pour votre booking</h1>

      <Button title="Retour" onClick={() => navigation("/")} />
    </div>
  );
};

export default ResumeBookingPage;
