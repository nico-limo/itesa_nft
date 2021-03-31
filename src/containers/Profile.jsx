import React, { useEffect, useState } from "react"
import { AuthFunctions } from "../utils/firebase/authEmail";
import { userAtom, userUid } from "../state/atoms"
import { BuyerOrSeller } from "../state/selectors"

//styles
import styles from "../styles/Profile.module.css"
import { useRecoilState, useRecoilValue } from "recoil";


// .toFixed(2)

const Profile = ({ match }) => {
  const [showCreations, setShowCreations] = useState(true)
  const { logOut } = AuthFunctions();

  const user = useRecoilValue(userAtom)
  const [userId, setUserId] = useRecoilState(userUid)
  const userProfile = useRecoilValue(BuyerOrSeller)

  console.log("user", user)
  
  useEffect(() => {
    let url = match.params.id
      setUserId(url)
      if (url) profile = userProfile
      profile = user
  }, [])

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
      {/* <div className={form.form}>
      <button onClick={(event) => logOut(event)}>Sign Out</button>
    </div> */}
    </>
  )
}

export default Profile