import React, { useState } from "react"
import styles from "../styles/Home.module.css"

// .toFixed(2)

const Home = () => {
  const [showOnSale, setShowOnSale] = useState(true)
  return (
    <>
      <div className={styles.homeTitle}>Explore
      </div>
      <div className={styles.homeOnSaleOrSold}>
        <button
          className={`${showOnSale ? styles.selected : ""}`}
          onClick={() => setShowOnSale(true)}
        >
          On Sale
        </button>
        <button
          className={`${showOnSale ? "" : styles.selected}`}
          onClick={() => setShowOnSale(false)}
        >
          Sold
        </button>
      </div>
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
            />
            <div>@deeple</div>
          </div>
          <div className={styles.homeSingleArtworkPrice}>
            {showOnSale ? "Price" : "Sold For"}
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
            />
            <div>@deeple</div>
          </div>
          <div className={styles.homeSingleArtworkPrice}>
            {showOnSale ? "Price" : "Sold For"}
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
            />
            <div>@deeple</div>
          </div>
          <div className={styles.homeSingleArtworkPrice}>
            {showOnSale ? "Price" : "Sold For"}
            <div className={styles.homeSingleArtworkPriceAmount}>2.50 ETH</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
