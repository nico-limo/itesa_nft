import React from "react"
import styles from "../styles/Creators.module.css"

// .toFixed(2)

const CreatorsCard = ({ user }) => {

    return (
        <>
        <div className={styles.singleCreatorContainer}>
          <img
            className={styles.singleCreatorArtwork}
            src="http://www.fubiz.net/wp-content/uploads/2018/03/beeple-crap-art-renders-03.jpg"
            alt=""
          />
          <img
            className={styles.singleCreatorAvatar}
            src={user.photo_profile}
            alt=""
          />
          <div className={styles.singleCreatorName}>{user.username}</div>
          <div className={styles.singleCreatorDescription}>
            {user.description}
          </div>
        </div>
      </>
    )
}

export default CreatorsCard;