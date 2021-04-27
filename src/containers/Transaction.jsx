import React from "react"
import { Link } from "react-router-dom"
//styles
import form from "../styles/Form.module.css"

const Transaction = ({ hash }) => {
  return (
    <>
      <div>
        <div className={form.title}>Transaction Fulfilled</div>
        <div className={form.container}>
          <img
            className={form.icon}
            src="/blockchain.png"
            alt="Transaction Submitted"
          />
          <div className={form.message}>Your transaction has been mined.</div>
          <a
            target="_blank"
            href={`https://explorer.testnet.rsk.co/tx/${hash}`}
            className={form.transactionLink}
          >
            You can check its status here.
          </a>
        </div>
      </div>
    </>
  )
}

export default Transaction
