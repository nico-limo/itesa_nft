import React, { useEffect } from "react"
//React-router
import { Link } from "react-router-dom"
//Recoil
import { useRecoilState, useRecoilValue } from "recoil"
import { singlePieceAtom, userProfile, userAtom } from "../state/atoms"
//Utils
import { ArtFunctions } from "../utils/firebase/requests/artworkRequests"
import { UserFunctions } from "../utils/firebase/requests/userRequests"
//CSS
import styles from "../styles/artWork.module.css"
import index from "../styles/index.module.css"

import BigSpinner from "../components/BigSpinner"

const Artwork = ({ id }) => {
  const [singlePiece, setSinglePieceAtom] = useRecoilState(singlePieceAtom)
  const [author, setAuthor] = useRecoilState(userProfile)
  const user = useRecoilValue(userAtom)
  const { getSinglePiece } = ArtFunctions()
  const { getUser } = UserFunctions()

  useEffect(() => {
    getSinglePiece(id).then((res) => {
      setSinglePieceAtom(res)
      getUser(res.authorId).then((res) => setAuthor(res))
    })
    return setSinglePieceAtom("")
  }, [])

  const Buy = () => {
    
  }

  return singlePiece ? (
    <>
      <div className={styles.artworkTitle}>
        {singlePiece?.title}
        {user.uid === singlePiece.authorId &&
          user.uid === singlePiece.ownerId ? (
            <Link to={`/artwork/${id}/edit`}>
              <img className={styles.editIcon} src="/edit.png" alt="Edit Icon" />
            </Link>
          ) : null}
      </div>
      <img
        className={styles.singleArtworkImage}
        src={singlePiece?.imgURI}
        alt=""
      />
      <div className={styles.ArtFeaturesContainer}>
        <div className={styles.divButtons}>
          <button>
            <Link
              to={`/creator/${singlePiece.authorId}`}
              className={index.link}
            >
              @{singlePiece.username}
            </Link>
          </button>
        </div>
        <div className={styles.artDescription}>{singlePiece?.description}</div>
        <div className={styles.priceAndButtonContainer}>
          <div className={styles.artworkPrice}>
            Price: {singlePiece?.price} ETH
          </div>
          <button 
          className={styles.buyButton}
          onClick={Buy}
          >Buy Now</button>
        </div>
      </div>
      <div className={styles.artistTitle}>Creator</div>
      <hr className={styles.artistHr} />
      <div className={styles.artistContainer}>
        <img
          className={styles.profilePicture}
          src={author?.photo_profile}
          alt=""
        />
        <div>
          <div className={styles.artistName}>{singlePiece.username}</div>
          <div className={styles.artistDescription}>{author.description}</div>
        </div>
      </div>
    </>
  ) : (
    <BigSpinner />
  )
}

export default Artwork
