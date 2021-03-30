import React from "react"
import styles from "../styles/Home.module.css";

const ArtCard = () => {

    return (
        <div className={styles.homeGalleryContainer}>
        <div className={styles.homeSingleArtworkContainer}>
          <img
            className={styles.homeSingleArtworkImage}
            src="http://www.fubiz.net/wp-content/uploads/2018/03/beeple-crap-art-renders-03.jpg"
            alt=""
          />
          <div className={styles.homeSingleArtworkTitle}>The Cube</div>
          <div className={styles.homeSingleArtworkCreator}>
            <img
              className={styles.homeSingleArtworkCreatorAvatar}
              src="http://www.fubiz.net/wp-content/uploads/2018/03/beeple-crap-art-renders-03.jpg"
              alt=""
            />
            <div>@deeple</div>
          </div>
          <div className={styles.homeSingleArtworkPrice}>
            {/* {showOnSale ? "Price" : "Sold For"} */}
            <div className={styles.homeSingleArtworkPriceAmount}>2.50 ETH</div>
          </div>
        </div>
        <div className={styles.homeSingleArtworkContainer}>
          <img
            className={styles.homeSingleArtworkImage}
            src="http://www.fubiz.net/wp-content/uploads/2018/03/beeple-crap-art-renders-03.jpg"
            alt=""
          />
          <div className={styles.homeSingleArtworkTitle}>The Cube</div>
          <div className={styles.homeSingleArtworkCreator}>
            <img
              className={styles.homeSingleArtworkCreatorAvatar}
              src="http://www.fubiz.net/wp-content/uploads/2018/03/beeple-crap-art-renders-03.jpg"
              alt=""
            />
            <div>@deeple</div>
          </div>
          <div className={styles.homeSingleArtworkPrice}>
            {/* {showOnSale ? "Price" : "Sold For"} */}
            <div className={styles.homeSingleArtworkPriceAmount}>2.50 ETH</div>
          </div>
        </div>
        <div className={styles.homeSingleArtworkContainer}>
          <img
            className={styles.homeSingleArtworkImage}
            src="http://www.fubiz.net/wp-content/uploads/2018/03/beeple-crap-art-renders-03.jpg"
            alt=""
          />
          <div className={styles.homeSingleArtworkTitle}>The Cube</div>
          <div className={styles.homeSingleArtworkCreator}>
            <img
              className={styles.homeSingleArtworkCreatorAvatar}
              src="http://www.fubiz.net/wp-content/uploads/2018/03/beeple-crap-art-renders-03.jpg"
              alt=""
            />
            <div>@deeple</div>
          </div>
          <div className={styles.homeSingleArtworkPrice}>
            {/* {showOnSale ? "Price" : "Sold For"} */}
            <div className={styles.homeSingleArtworkPriceAmount}>2.50 ETH</div>
          </div>
        </div>
      </div>
    )
}

export default ArtCard;