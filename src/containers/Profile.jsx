import React, { useEffect, useState } from "react"
import { AuthFunctions } from "../utils/firebase/authEmail";
import ArtCard from "./ArtCard"

import { userAtom, userUrl, userProfile, artStatusAtom } from "../state/atoms"
import { BuyerOrSeller, Creations, Collections, CollectionOrCreation } from "../state/selectors"

//styles
import styles from "../styles/Profile.module.css"
import spinners from "../styles/Spinners.module.css"


import { useRecoilState, useRecoilValue } from "recoil";

// .toFixed(2)

const Profile = ({ match }) => {
  const [showArt, setShowArt] = useRecoilState(artStatusAtom)
  const [url, setUrl] = useRecoilState(userUrl) // url pasada por Props
  const [urlUser, setUrlUser] = useRecoilState(userProfile) // variable usuario clickeado o logueado 
  const user = useRecoilValue(userAtom) // usuario logueado
  const clickedUser = useRecoilValue(BuyerOrSeller)
  const { logOut } = AuthFunctions();
  
  useEffect(() => {
    let link = match.params.id
      setUrl(link)
  }, [urlUser])
    
    if (match.params.id) setUrlUser(clickedUser)
    else setUrlUser(user) 

  // Collections - Creations
  const userArtWork = useRecoilValue(CollectionOrCreation)
  // const userCreation = useRecoilValue(Creations)
  // const userCollections = useRecoilValue(Collections)


    // console.log("user", urlUser)
    // console.log("showCreations", showCreations)
    // console.log("userArtWork", userArtWork)
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
              className={`${showArt ? styles.selected : ""}`}
              onClick={() => setShowArt(true)}
            >
              Creations
            </button>
            <button
              className={`${showArt ? "" : styles.selected}`}
              onClick={() => setShowArt(false)}
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