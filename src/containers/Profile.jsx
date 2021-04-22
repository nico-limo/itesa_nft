import React, { useEffect, useState } from "react"
//Components
import ArtCard from "../components/ArtCard"
import BigSpinner from "../components/BigSpinner"
//Utils
import { AuthFunctions } from "../utils/firebase/auth/authEmail"
//Recoil
import { useRecoilState, useRecoilValue } from "recoil"
import { userAtom, artStatusAtom } from "../state/atoms"
import { UserFunctions } from "../utils/firebase/requests/userRequests"
//styles
import styles from "../styles/Profile.module.css"
import form from "../styles/Form.module.css"
import spinners from "../styles/Spinners.module.css"

const Profile = ({ match }) => {
  const user = useRecoilValue(userAtom) // usuario logueado
  const { getUser } = UserFunctions() // busca usuario de la url
  const { getUserCreations, getUserCollections } = UserFunctions() // busca creations y collections
  const local = JSON.parse(localStorage.getItem("logged"));
  const [urlUser, setUrlUser] = useState("") // variable usuario clickeado o logueado
  const [showArt, setShowArt] = useRecoilState(artStatusAtom) // click art true or false

  useEffect(() => {
    if (match.params.id)
      getUser(match.params.id).then((user) => setUrlUser(user))
    else if (user.uid) getUser(user.uid).then((user) => setUrlUser(user))
    return () => setUrlUser("")
  }, [match, user])

  
  const [userArtWork, setUserArtWork] = useState("loading")
  useEffect(() => {
    if (urlUser.uid) {
      // Collections - Creations
      if (showArt)
        getUserCreations(urlUser.uid).then((creation) =>
          setUserArtWork(creation)
        )
      else
        getUserCollections(urlUser.uid).then((collection) =>
          setUserArtWork(collection)
        )
    }
  }, [showArt, urlUser])

  return (
    <>
      {urlUser && userArtWork !== "loading" ? (
        <>
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
            {userArtWork?.length ? (
              userArtWork?.map((piece) => (
                <ArtCard key={piece.id} piece={piece} />
              ))
            ) : (
              <div className={styles.empty}>
                {showArt
                  ? "You Have No Creations Yet"
                  : "Your Collection is Empty"}
              </div>
            )}
          </div>
        </>
      ) : (
        <BigSpinner />
      )}
    </>
  )
}

export default Profile
