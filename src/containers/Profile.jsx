import React, { useEffect, useState } from "react"
import { AuthFunctions } from "../utils/firebase/authEmail";
import ArtCard from "./ArtCard"

import { userAtom, userUrl, userProfile } from "../state/atoms"
import { BuyerOrSeller } from "../state/selectors"
import { Creations, Collections, CollectionOrCreation } from "../state/selectors"

//styles
import styles from "../styles/Profile.module.css"
import spinners from "../styles/Spinners.module.css"


import { useRecoilState, useRecoilValue } from "recoil";

// .toFixed(2)

const Profile = ({ match }) => {
  const [showCreations, setShowCreations] = useState(true)
  const { logOut } = AuthFunctions();

  // Collections - Creations
  const userArtWork = useRecoilValue(CollectionOrCreation)
  // const userCreation = useRecoilValue(Creations)
  // const userCollections = useRecoilValue(Collections)

  const user = useRecoilValue(userAtom) // usuario logueado
  const [url, setUrl] = useRecoilState(userUrl) // url pasada por Props
  const [urlUser, setUrlUser] = useRecoilState(userProfile) // variable usuario clickeado o logueado 
  const clickedUser = useRecoilValue(BuyerOrSeller)
  
  useEffect(() => {
    let link = match.params.id
      setUrl(link)
  }, [urlUser])
    
    if (match.params.id) setUrlUser(clickedUser)
    else setUrlUser(user) 


    console.log(user)
  return (
    <>
    { urlUser ? ( <>
        <div className={styles.creatorCoverContainer}>
            <img
              className={styles.creatorCover}
              src={urlUser.main_picture}
              alt=""
            />
            <img
              className={styles.creatorAvatar}
              src={urlUser.photo_profile}
              alt=""
            />
            <div className={styles.creatorName}>@{urlUser.username}</div>
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
          {userArtWork.length ? (
              userArtWork.map((piece) => <ArtCard key={piece.id} piece={piece} />)
          ) : (
              <div className={spinners.spinnerBox}>
                <div className={spinners.circleBorder}>
                  <div className={spinners.circleCore}></div>
                </div>
              </div>
            )}
            {/* <div className={styles.singleArtworkContainer}>
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
            </div> */}
          </div>
          {/* <div className={form.form}>
          <button onClick={(event) => logOut(event)}>Sign Out</button>
        </div> */}
    </>) 
    : <h1>Loading..</h1>
    }
    </>
  )
}

export default Profile