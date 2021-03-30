import React, {useState, useEffect } from "react";
//CSS
import styles from "../styles/Home.module.css";
//Recoil
import { useSetRecoilState, useRecoilValue, useRecoilState } from "recoil";
import { artWorkAtom, artStatusAtom } from "../state/atoms";
import {onSaleOrSoldState} from "../state/selectors";
import { ArtFunctions } from "../utils/firebase/requests/artworkRequests";

const Test = () => {
  const [showOnSale ,setShowOnSale] = useRecoilState(artStatusAtom);
  const setArtWork = useSetRecoilState(artWorkAtom);
  const artWork = useRecoilValue(onSaleOrSoldState);

  const { getAllPieces } = ArtFunctions();

  useEffect(() => {
    getAllPieces().then(res => setArtWork(res)) 
    
  }, []);

  useEffect(() => {
    
  }, [])
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
    { artWork.length ? artWork.map((piece) => (
            
            <div key={piece.id} className={styles.homeSingleArtworkContainer}>
              <img
                className={styles.homeSingleArtworkImage}
                src={piece.imgURI}
                alt=""
              />
              <div className={styles.homeSingleArtworkTitle}>{piece.title}</div>
              <div className={styles.homeSingleArtworkCreator}>
                <img
                  className={styles.homeSingleArtworkCreatorAvatar}
                  src="http://www.fubiz.net/wp-content/uploads/2018/03/beeple-crap-art-renders-03.jpg"
                  alt=""
                />
                <div>@deeple</div>
              </div>
              <div className={styles.homeSingleArtworkPrice}>
                
                <div className={styles.homeSingleArtworkPriceAmount}>{piece.price} ETH</div>
              </div>
            </div>
            
    )) : ( <h1>Loading...</h1> )}
      

       
    </div>
    </>
  );
};

export default Test;
