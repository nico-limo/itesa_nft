import React, { useEffect } from "react"
import { useRecoilState } from "recoil"

import { userAtom } from "../state/atoms"
import { ArtFunctions } from "../utils/firebase/requests/artworkRequests"
import styles from "../styles/artWork.module.css"

const Artwork = ({ match }) => {
  const [user, setUser] = useRecoilState(userAtom)
  const {  } = ArtFunctions()
  // lógica para agarrar la ruta del back a get Artworks según el ID.

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
          This little dude is part of my ongoing series of Friends. Why are they
          called Friends? The reason for that is easy. Every day the world shows
          its ugliest sides and sometimes it's just too much to handle. There
          are so many serious artworks out there on the cryptomarket and I want
          to give people something to smile about.
        </div>
        <div className={styles.priceAndButtonContainer}>
          <div className={styles.artworkPrice}>Price: 5 ETH</div>
          <button className={styles.buyButton}>Buy Now</button>
        </div>
      </div>
      {/* <div className={styles.artDescriptionsLeft}>
        <div className={styles.artworkTitle}>Creator</div>
      </div> */}
    </>
  )
}

export default Artwork
