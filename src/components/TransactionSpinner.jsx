import React from "react";
//styles
import spinners from "../styles/Spinners.module.css";

const TransactionSpinner = () => {
  return (
    <div className={spinners.transactionSpinnerBox}>
      <div className={spinners.transactionCircleBorder}>
        <div className={spinners.transactionCircleCore}></div>
      </div>
    </div>
  );
};

export default TransactionSpinner;
