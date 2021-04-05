import React from "react"
//styles
import spinners from "../styles/Spinners.module.css"

const FormButtonSpinner = () => {
  return (
    <div className={spinners.smallSpinnerBox}>
      <div className={spinners.smallCircleBorder}>
        <div className={spinners.smallCircleCore}></div>
      </div>
    </div>
  )
}

export default FormButtonSpinner
