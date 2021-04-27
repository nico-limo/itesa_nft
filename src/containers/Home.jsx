import React, { useEffect } from "react";
//CSS
import styles from "../styles/Home.module.css";
//Recoil
import { useSetRecoilState, useRecoilValue, useRecoilState } from "recoil";
import { artWorkAtom, artStatusAtom } from "../state/atoms";
import { onSaleOrSoldState } from "../state/selectors";
//Utils
import { ArtFunctions } from "../utils/firebase/requests/artworkRequests";
//Components
import ArtCard from "../components/ArtCard";
import BigSpinner from "../components/BigSpinner";
const Home = () => {
  const [showOnSale, setShowOnSale] = useRecoilState(artStatusAtom);
  const setArtWork = useSetRecoilState(artWorkAtom);
  const artWork = useRecoilValue(onSaleOrSoldState);

  const { getAllPieces } = ArtFunctions();

  useEffect(() => {
    getAllPieces().then((res) => setArtWork(res));
  }, []);

  return (
    <>
    <div>
      <div className={styles.homeTitle}>Explore</div>
      <div className={styles.homeOnSaleOrSold}>
        <button
          className={`${showOnSale ? styles.selected : ""}`}
          onClick={() => setShowOnSale(true)}
        >
          On Sale
        </button>
        <button
          className={`${showOnSale ? "" : styles.selected}`}
          onClick={() => setShowOnSale(false)}
        >
          Not On Sale
        </button>
      </div>
      <div className={styles.homeGalleryContainer}>
        {artWork?.length ? (
          artWork.map((piece) => <ArtCard key={piece.id} piece={piece} />)
        ) : (
          <BigSpinner />
        )}
      </div>
      </div>
    </>
  );
};

export default Home;
