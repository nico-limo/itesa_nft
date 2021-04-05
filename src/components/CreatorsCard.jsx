import React from "react";
//CSS
import styles from "../styles/Creators.module.css";

const CreatorsCard = ({ user }) => {
  return (
    <>
      <div className={styles.singleCreatorContainer}>
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
        <div className={styles.singleCreatorName}>{user.username}</div>
        <div className={styles.singleCreatorDescription}>
          {user.description}
        </div>
      </div>
    </>
  );
};

export default CreatorsCard;
