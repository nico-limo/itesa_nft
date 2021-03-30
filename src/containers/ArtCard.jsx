import React from "react"
import styles from "../styles/Home.module.css"

const ArtCard = ({ piece }) => {
  return (
    <div className={styles.homeSingleArtworkContainer}>
      <img
        className={styles.homeSingleArtworkImage}
        src={piece.imgURI}
        alt=""
      />
      <div className={styles.homeSingleArtworkTitle}>{piece.title}</div>
      <div className={styles.homeSingleArtworkCreator}>
        <img
          className={styles.homeSingleArtworkCreatorAvatar}
          src={piece.photo_profile}
          alt=""
        />
        <div>{piece.username}</div>
      </div>
      <div className={styles.homeSingleArtworkPrice}>
        {piece.onSale ? "Price" : "Sold For"}
        <div className={styles.homeSingleArtworkPriceAmount}>
          {piece.price} ETH
        </div>
      </div>
    </div>
  )
}

export default ArtCard
