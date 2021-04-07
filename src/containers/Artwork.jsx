import React, { useEffect } from "react";
//React-router
import { Link } from "react-router-dom";
//Recoil
import { useRecoilState, useRecoilValue } from "recoil";
import { singlePieceAtom, userAtom } from "../state/atoms";
//Utils
import { ArtFunctions } from "../utils/firebase/requests/artworkRequests";
//CSS
import styles from "../styles/artWork.module.css";
import index from "../styles/index.module.css";

import BigSpinner from "../components/BigSpinner";

const Artwork = ({ id }) => {
  const [singlePiece, setSinglePieceAtom] = useRecoilState(singlePieceAtom);
  const user = useRecoilValue(userAtom);
  const { getSinglePiece } = ArtFunctions();

  useEffect(() => {
    getSinglePiece(id).then((res) => {
      setSinglePieceAtom(res);
    });
    return setSinglePieceAtom("");
  }, []);
  return singlePiece ? (
    <>
      <div className={styles.artworkTitle}>{singlePiece?.title}</div>
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
          <button className={styles.buyButton}>Buy Now</button>
          { user.uid === singlePiece.authorId && user.uid === singlePiece.ownerId ?  <Link to={`/artwork/${id}/edit`} ><button className={styles.buyButton}>Edit</button> </Link>  : null }
         
        </div>
      </div>
      {/* <div className={styles.artDescriptionsLeft}>
        <div className={styles.artworkTitle}>Creator</div>
      </div> */}
    </>
  ) : (
    <BigSpinner />
  );
};

export default Artwork;
