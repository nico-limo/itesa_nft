import React from "react"
//styles
import spinners from "../styles/Spinners.module.css"

const BigSpinner = () => {
  return (
    <div className={spinners.spinnerBox}>
      <div className={spinners.circleBorder}>
        <div className={spinners.circleCore}></div>
      </div>
    </div>
  )
}

export default BigSpinner
