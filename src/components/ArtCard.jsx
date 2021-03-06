import React from "react";
//React-Router-Dom
import { Link } from "react-router-dom";
//styles
import styles from "../styles/Home.module.css";

const ArtCard = ({ piece }) => {
  return (
    <Link
      className={styles.homeSingleArtworkContainer}
      to={`/artwork/${piece.id}`}
    >
      <div>
        <img
          className={styles.homeSingleArtworkImage}
          src={piece.imgURI}
          alt={piece.title}
        />
        <div className={styles.homeSingleArtworkTitle}>{piece.title}</div>
        <div className={styles.homeSingleArtworkCreator}>
          <img
            className={styles.homeSingleArtworkCreatorAvatar}
            src={piece.photo_profile}
            alt={piece.username}
          />
          <div>{piece.username}</div>
        </div>
      </div>
      <div className={styles.homeSingleArtworkPrice}>
        {piece.onSale ? "Price" : "Sold For"}
        <div className={styles.homeSingleArtworkPriceAmount}>
          {piece.price} ETH
        </div>
      </div>
    </Link>
  );
};

export default ArtCard;
