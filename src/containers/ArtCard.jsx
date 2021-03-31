import React from "react";
import { Link } from "react-router-dom";
//styles
import styles from "../styles/Home.module.css";

const ArtCard = ({ piece }) => {
  return (
    <div key={piece.id} className={styles.homeSingleArtworkContainer}>
      <Link className={styles.link} to={`/artwork/${piece.id}`}>
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
            alt={`username picture from ${piece.username}`}
          />
          <div>{piece.username}</div>
        </div>
        <div className={styles.homeSingleArtworkPrice}>
          {piece.onSale ? "Price" : "Sold For"}
          <div className={styles.homeSingleArtworkPriceAmount}>
            {piece.price} ETH
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ArtCard;
