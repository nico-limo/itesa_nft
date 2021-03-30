import React, { useState } from "react"
import styles from "../styles/Creators.module.css"
import CreatorsCard from "./CreatorsCard"

const Creators = () => {
  return (
    <>
      <div className={styles.title}>Creators</div>
      <CreatorsCard />
    </>
  )
}

export default Creators
