import React from "react"
import styles from "../styles/Creators.module.css"
import style from "../styles/Home.module.css"
import { Link } from "react-router-dom"

// .toFixed(2)

const CreatorsCard = ({ user }) => {

    return (
        <>
        <div className={styles.singleCreatorContainer}>
          <img
            className={styles.singleCreatorArtwork}
            src={user.main_picture}
            alt=""
          />
          <img
            className={styles.singleCreatorAvatar}
            src={user.photo_profile}
            alt=""
          />
          <Link className={style.link} to={`/creator/${user.uid}`}>
            <div className={styles.singleCreatorName}>@{user.username}</div>
          </Link>
          <div className={styles.singleCreatorDescription}>
            {user.description}
          </div>
        </div>
      </>
    )
}

export default CreatorsCard;