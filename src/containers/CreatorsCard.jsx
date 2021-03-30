import React from "react"
import styles from "../styles/Creators.module.css"

// .toFixed(2)

const CreatorsCard = () => {

    return (
        <div className={styles.container}>
        <div className={styles.singleCreatorContainer}>
          <img
            className={styles.singleCreatorArtwork}
            src="http://www.fubiz.net/wp-content/uploads/2018/03/beeple-crap-art-renders-03.jpg"
            alt=""
          />
          <img
            className={styles.singleCreatorAvatar}
            src="https://static.wixstatic.com/media/a64726_ce7a64e6ade34b549d0b3d06963bead9~mv2.jpg/v1/fill/w_360,h_400,al_c,q_80,usm_0.66_1.00_0.01/a64726_ce7a64e6ade34b549d0b3d06963bead9~mv2.webp"
            alt=""
          />
          <div className={styles.singleCreatorName}>@beeple</div>
          <div className={styles.singleCreatorDescription}>
            Beeple is known for using various mediums in creating comical,
            phantasmagoric works that makes political, social commentary while
            using pop culture figures as references.
          </div>
        </div>
        <div className={styles.singleCreatorContainer}>
          <img
            className={styles.singleCreatorArtwork}
            src="http://www.fubiz.net/wp-content/uploads/2018/03/beeple-crap-art-renders-03.jpg"
            alt=""
          />
          <img
            className={styles.singleCreatorAvatar}
            src="https://static.wixstatic.com/media/a64726_ce7a64e6ade34b549d0b3d06963bead9~mv2.jpg/v1/fill/w_360,h_400,al_c,q_80,usm_0.66_1.00_0.01/a64726_ce7a64e6ade34b549d0b3d06963bead9~mv2.webp"
            alt=""
          />
          <div className={styles.singleCreatorName}>@beeple</div>
          <div className={styles.singleCreatorDescription}>
            Beeple is known for using various mediums in creating comical,
            phantasmagoric works that makes political, social commentary while
            using pop culture figures as references.
          </div>
        </div>
        <div className={styles.singleCreatorContainer}>
          <img
            className={styles.singleCreatorArtwork}
            src="http://www.fubiz.net/wp-content/uploads/2018/03/beeple-crap-art-renders-03.jpg"
            alt=""
          />
          <img
            className={styles.singleCreatorAvatar}
            src="https://static.wixstatic.com/media/a64726_ce7a64e6ade34b549d0b3d06963bead9~mv2.jpg/v1/fill/w_360,h_400,al_c,q_80,usm_0.66_1.00_0.01/a64726_ce7a64e6ade34b549d0b3d06963bead9~mv2.webp"
            alt=""
          />
          <div className={styles.singleCreatorName}>@beeple</div>
          <div className={styles.singleCreatorDescription}>
            Beeple is known for using various mediums in creating comical,
            phantasmagoric works that makes political, social commentary while
            using pop culture figures as references.
          </div>
        </div>
      </div>
    )
}

export default CreatorsCard;