import React from "react";
//React-Router-Dom
import { Link } from "react-router-dom";
//CSS
import styles from "../styles/Creators.module.css";
import index from "../styles/index.module.css";
const CreatorsCard = ({ user }) => {
  return (
    <Link
      to={`/creator/${user.uid}`}
      className={`${styles.singleCreatorContainer} ${index.link}`}
    >
      <img
        className={styles.singleCreatorArtwork}
        src={user.main_picture}
        alt=""
      />
      <img
        className={styles.singleCreatorAvatar}
        src={user.photo_profile}
        alt=""
      />
      <div className={styles.singleCreatorName}>@{user.username}</div>
      <div className={styles.singleCreatorDescription}>{user.description}</div>
    </Link>
  );
};

export default CreatorsCard;
