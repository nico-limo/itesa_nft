import React, { useState } from "react";
import styles from "../styles/Home.module.css";
import ArtCard from "./ArtCard"

// .toFixed(2)

const Home = () => {
  const [showOnSale, setShowOnSale] = useState(true);

    //Construir lógica para agarrar la ruta del back a get Artworks, pasarlo al atom de artworks, y utilizarlo en el componente ArtCard para mapearlos.
    
  return (
    <>
      <div className={styles.homeTitle}>Explore
      </div>
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
          Sold
        </button>
      </div>
      <ArtCard />
    </>
  );
};

export default Home;
