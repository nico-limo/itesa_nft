import React, { useEffect } from "react";

import { userAtom, singlePieceIdAtom, artWorkAtom } from "../state/atoms";
import { useSetRecoilState, useRecoilValue, useRecoilState } from "recoil";
import { singleArtworkState } from "../state/selectors";
//import { ArtWorkFunctions } from "../utils/firebase/artWork";
import styles from "../styles/artWork.module.css";

const Artwork = ({ id }) => {
  const [user, setUser] = useRecoilState(userAtom);
  const setPieceIdAtom = useSetRecoilState(singlePieceIdAtom);
  const singleArtWork = useRecoilValue(singleArtworkState);
  //const artwork = useRecoilValue(artWorkAtom);
  //const { artWork, getArtWork } = ArtWorkFunctions();
  // lógica para agarrar la ruta del back a get Artworks según el ID.
  useEffect(() => {
    setPieceIdAtom(id);
    console.log(id);
  }, []);
  return (
    <>
      <div className={styles.artworkTitle}>{singleArtWork?.title}</div>
      <div className={styles.singleArtworkContainer}>
        <img
          className={styles.singleArtworkImage}
          src={singleArtWork?.imgURI}
          alt=""
        />
      </div>
      <div className={styles.ArtFeaturesContainer}>
        <div className={styles.divButtons}>
          <button>@deeple</button>
        </div>
        <div className={styles.artDescription}>
          {singleArtWork?.description}
        </div>
        <div className={styles.priceAndButtonContainer}>
          <div className={styles.artworkPrice}>
            Price: {singleArtWork?.price} ETH
          </div>
          <button className={styles.buyButton}>Buy Now</button>
        </div>
      </div>
      {/* <div className={styles.artDescriptionsLeft}>
        <div className={styles.artworkTitle}>Creator</div>
      </div> */}
    </>
  );
};

export default Artwork;
