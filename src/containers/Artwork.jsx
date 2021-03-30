import React, { useEffect } from "react"
import { useRecoilState } from "recoil";

import { userAtom } from "../state/atoms";
import { ArtWorkFunctions } from "../utils/firebase/artWork";
import styles from "../styles/artWork.module.css"

const Artwork = ({ match }) => {
    const [user, setUser] = useRecoilState(userAtom)
    const { artWork, getArtWork } = ArtWorkFunctions()
    // lógica para agarrar la ruta del back a get Artworks según el ID.


    return (
        <>
            <div className={styles.singleArtworkContainer}>
                <img
                    className={styles.singleArtworkImage}
                    src="http://www.fubiz.net/wp-content/uploads/2018/03/beeple-crap-art-renders-03.jpg"
                    alt=""
                />
            </div>
            <div className={styles.divButtons}>
                <button>
                    @Deeple
                </button>
            </div>
            <div className={styles.ArtFeaturesContainer}>
                <div className={styles.artDescriptionsLeft}>
                    <div className={styles.artworkTitle}>
                        The Cube
                    </div>
                    <div className={styles.artworkSubtitle}>
                        Description:
                    </div>
                    <div className={styles.artworkDescription}>
                        "Suspended Past" // 2020
                        Official artwork for Lamborghini.
                        3860x5000 pixel
                    </div>
                </div>
                <div className={styles.artDescriptionsRight}>
                    
                    <div className={styles.priceSubtitle}>
                        Price:
                    </div>  
                    <div className={styles.artworkPrice}>
                        5 ETH
                    </div>  
                </div>
            </div>
            <div className={styles.artDescriptionsLeft}>
                <div className={styles.artworkTitle}>
                    Creator
                </div>
            </div>
        </>
    )
}

export default Artwork