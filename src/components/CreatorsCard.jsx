import React from "react";
//React-Router-Dom
import { Link } from "react-router-dom";
//CSS
import styles from "../styles/Creators.module.css";
import index from "../styles/index.modules.css";

const CreatorsCard = ({ user }) => {
  return (
    <>
    <Link 
    className={`${styles.singleCreatorContainer} ${index.link}`}
    to={`/creator/${user.uid}`}
    >
      <div>
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
        <div className={styles.singleCreatorDescription}>
          {user.description}
        </div>
      </div>
      </Link>
    </>
  );
};

export default CreatorsCard;
