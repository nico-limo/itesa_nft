import React, { useEffect } from "react";

import { singlePieceAtom } from "../state/atoms";
import { useRecoilState } from "recoil";
import { ArtFunctions } from "../utils/firebase/requests/artworkRequests";
import styles from "../styles/artWork.module.css";

const Artwork = ({ id }) => {
  const [singlePiece, setSinglePieceAtom] = useRecoilState(singlePieceAtom);
  const { getSinglePiece } = ArtFunctions();

  useEffect(() => {
    getSinglePiece(id).then((res) => {
      setSinglePieceAtom(res);
    });
  }, []);
  return (
    <>
      <div className={styles.artworkTitle}>{singlePiece?.title}</div>
      <div className={styles.singleArtworkContainer}>
        <img
          className={styles.singleArtworkImage}
          src={singlePiece?.imgURI}
          alt=""
        />
      </div>
      <div className={styles.ArtFeaturesContainer}>
        <div className={styles.divButtons}>
          <button>@{singlePiece.username}</button>
        </div>
        <div className={styles.artDescription}>{singlePiece?.description}</div>
        <div className={styles.priceAndButtonContainer}>
          <div className={styles.artworkPrice}>
            Price: {singlePiece?.price} ETH
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
