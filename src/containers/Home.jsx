import React, { useState, useEffect } from "react"
//CSS
import styles from "../styles/Home.module.css"
//Recoil
import { useSetRecoilState, useRecoilValue, useRecoilState } from "recoil"
import { artWorkAtom, artStatusAtom } from "../state/atoms"
import { onSaleOrSoldState } from "../state/selectors"
import { ArtFunctions } from "../utils/firebase/requests/artworkRequests"
import ArtCard from "./ArtCard"

// .toFixed(2)

const Home = () => {
  const [showOnSale, setShowOnSale] = useRecoilState(artStatusAtom)
  const setArtWork = useSetRecoilState(artWorkAtom)
  const artWork = useRecoilValue(onSaleOrSoldState)

  const { getAllPieces } = ArtFunctions()

  useEffect(() => {
    getAllPieces().then((res) => setArtWork(res))
  }, [])

  return (
    <>
      <div className={styles.homeTitle}>Explore</div>
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
        {artWork.length ? (
          artWork.map((piece) => <ArtCard piece={piece} />)
        ) : (
          <h1>Loading...</h1>
        )}
      </div>
    </>
  )
}

export default Home
