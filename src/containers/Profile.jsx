import React, { useState } from "react"
import styles from "../styles/Profile.module.css"
import { UserFunctions } from "../utils/firebase/authEmail";
//styles
import form from "../styles/Form.module.css";

// .toFixed(2)

const Profile = () => {
  const [showCreations, setShowCreations] = useState(true)
  const { logOut } = UserFunctions();

  return (
    <>
      <div className={styles.creatorCoverContainer}>
        <img
          className={styles.creatorCover}
          src="http://www.fubiz.net/wp-content/uploads/2018/03/beeple-crap-art-renders-03.jpg"
          alt=""
        />
        <img
          className={styles.creatorAvatar}
          src="https://static.wixstatic.com/media/a64726_ce7a64e6ade34b549d0b3d06963bead9~mv2.jpg/v1/fill/w_360,h_400,al_c,q_80,usm_0.66_1.00_0.01/a64726_ce7a64e6ade34b549d0b3d06963bead9~mv2.webp"
          alt=""
        />
        <div className={styles.creatorName}>@beeple</div>
      </div>
      <div className={styles.creationsOrCollection}>
        <button
          className={`${showCreations ? styles.selected : ""}`}
          onClick={() => setShowCreations(true)}
        >
          Creations
        </button>
        <button
          className={`${showCreations ? "" : styles.selected}`}
          onClick={() => setShowCreations(false)}
        >
          Collection
        </button>
      </div>
      <div className={styles.galleryContainer}>
        <div className={styles.singleArtworkContainer}>
          <img
            className={styles.singleArtworkImage}
            src="http://www.fubiz.net/wp-content/uploads/2018/03/beeple-crap-art-renders-03.jpg"
            alt=""
          />
          <div className={styles.singleArtworkTitle}>The Cube</div>
          <div className={styles.singleArtworkCreator}>
            <img
              className={styles.singleArtworkCreatorAvatar}
              src="http://www.fubiz.net/wp-content/uploads/2018/03/beeple-crap-art-renders-03.jpg"
              alt=""
            />
            <div>@deeple</div>
          </div>
          <div className={styles.singleArtworkPrice}>
            Sold For
            <div className={styles.singleArtworkPriceAmount}>2.50 ETH</div>
          </div>
        </div>
      </div>
      <div className={form.form}>
      <button onClick={(event) => logOut(event)}>Sign Out</button>
    </div>
    </>
  )
}

export default Profile