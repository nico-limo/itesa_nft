import React, { useEffect, useState } from "react"
import { AuthFunctions } from "../utils/firebase/authEmail";
import ArtCard from "./ArtCard"

import { userAtom, userProfile, artStatusAtom, CreationOrCollection } from "../state/atoms"
import { UserFunctions, getUserCreations, getUserCollections } from "../utils/firebase/requests/userRequests";

//styles
import styles from "../styles/Profile.module.css"
import form from "../styles/Form.module.css"
import spinners from "../styles/Spinners.module.css"
import { useRecoilState, useRecoilValue } from "recoil";

const Profile = ({ match }) => {
  const user = useRecoilValue(userAtom) // usuario logueado
  const { getUser } = UserFunctions() // busca usuario de la url
  const { getUserCreations, getUserCollections } = UserFunctions() // busca creations y collections

  const [urlUser, setUrlUser] = useState("") // variable usuario clickeado o logueado 
  const [showArt, setShowArt] = useRecoilState(artStatusAtom) // click art true or false
  const { logOut } = AuthFunctions();
  
  useEffect(() => {
    if (match.params.id) getUser(match.params.id).then(user => setUrlUser(user))
    else setUrlUser(user)
  }, [match])
  
  // 
  const [userArtWork, setUserArtWork] = useState("")
  useEffect(() => {
    if (urlUser.uid) {
        // Collections - Creations
        if (showArt) getUserCreations(urlUser.uid)
            .then((creation) => setUserArtWork(creation))
        else getUserCollections(urlUser.uid)
            .then(collection => setUserArtWork(collection))
    }
    }, [showArt, urlUser])

    console.log("userArtWork", userArtWork)
    console.log("user atom", user)
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
          {userArtWork && userArtWork.length ? (
            userArtWork.map((piece) => <ArtCard key={piece.id} piece={piece} />)
          ) : (
              <div className={spinners.spinnerBox}>
                <div className={spinners.circleBorder}>
                  <div className={spinners.circleCore}></div>
                </div>
              </div>
          )}
          </div>
          { !match.params.id && (
            <div className={form.form}>
              <button onClick={(event) => logOut(event)}>Sign Out</button>
            </div>
          )}
    </>) 
    : (
      <div className={spinners.spinnerBox}>
        <div className={spinners.circleBorder}>
          <div className={spinners.circleCore}></div>
        </div>
      </div>
    )
    }
    </>
  );
};

export default Profile;
