import React, { useEffect } from "react"
import { AuthFunctions } from "../utils/firebase/authEmail";
import ArtCard from "./ArtCard"

import { userAtom, userProfile, artStatusAtom, userCreation, userCollection, CreationOrCollection } from "../state/atoms"
// import { BuyerOrSeller, Creations, Collections, CollectionOrCreation } from "../state/selectors"
import { UserFunctions, getUserCreations, getUserCollections } from "../utils/firebase/requests/userRequests";

//styles
import styles from "../styles/Profile.module.css"
import spinners from "../styles/Spinners.module.css"

import { useRecoilState, useRecoilValue } from "recoil";

const Profile = ({ match }) => {
  const user = useRecoilValue(userAtom) // usuario logueado
  const { getUser } = UserFunctions() // busca usuario de la url
  const { getUserCreations, getUserCollections } = UserFunctions() // busca creations y collections

  const [urlUser, setUrlUser] = useRecoilState(userProfile) // variable usuario clickeado o logueado 
  const [showArt, setShowArt] = useRecoilState(artStatusAtom) // click art true or false
  const [profileCreation, setProfileCreation] = useRecoilState(userCreation) // creation del usuario
  const [profileCollection, setProfileCollection] = useRecoilState(userCollection) // collection del usuario
  const { logOut } = AuthFunctions();
  
  useEffect(() => {
    if (match.params.id) {
      getUser(match.params.id).then(user => setUrlUser(user))
        console.log("url user", urlUser)
        getUserCreations(match.params.id).then((creation) => {
          getUserCollections(match.params.id).then(collection => {
            setProfileCreation(creation)
            setProfileCollection(collection)
          })
        })
    } else {
      setUrlUser(user)
      console.log("atom user", urlUser)
        getUserCreations(user.uid).then((creation) => {
          getUserCollections(user.uid).then(collection => {
            setProfileCreation(creation)
            setProfileCollection(collection)
          })
        })
    } 
  }, [])


  // Collections - Creations
  const [userArtWork, setUserArtWork] = useRecoilState(CreationOrCollection)
  if (showArt === true) setUserArtWork(profileCreation)
  else setUserArtWork(profileCollection)

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