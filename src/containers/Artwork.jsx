import React, { useState, useEffect } from "react"
import { useRecoilState } from "recoil"

import { userAtom } from "../state/atoms"
import { ArtWorkFunctions } from "../utils/firebase/artWork"
import styles from "../styles/artWork.module.css"

const Artwork = ({ match }) => {
  const [user, setUser] = useRecoilState(userAtom)
  const { artWork, getArtWork } = ArtWorkFunctions()

  return (
    <>
      <div className={styles.artworkTitle}>The Cube</div>
      <div className={styles.singleArtworkContainer}>
        <img
          className={styles.singleArtworkImage}
          src="http://www.fubiz.net/wp-content/uploads/2018/03/beeple-crap-art-renders-03.jpg"
          alt=""
        />
      </div>
      <div className={styles.ArtFeaturesContainer}>
        <div className={styles.divButtons}>
          <button>@deeple</button>
        </div>
        <div className={styles.artDescription}>
          This little dude is part of my ongoing series of Friends. Why are they called Friends? The reason for that is easy. Every day the world shows its ugliest sides and sometimes it's just too much to handle. There are so many serious artworks out there on the cryptomarket and I want to give people something to smile about. </div>
          <div className={styles.priceSubtitle}>Price:</div>
          <div className={styles.artworkPrice}>5 ETH</div>
          <button className={styles.buyButton}>Buy Now</button>
      </div>
      <div className={styles.artDescriptionsLeft}>
        <div className={styles.artworkTitle}>Creator</div>
      </div>
    </>
  )
}

export default Artwork
