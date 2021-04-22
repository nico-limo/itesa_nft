import React, { useState, useEffect } from "react";
//React-router
import { Link, useHistory } from "react-router-dom";
//Recoil
import { useRecoilState, useRecoilValue } from "recoil";
import { singlePieceAtom, userProfile, userAtom } from "../state/atoms";
//Utils
import { ArtFunctions } from "../utils/firebase/requests/artworkRequests";
import { UserFunctions } from "../utils/firebase/requests/userRequests";
//CSS
import styles from "../styles/artWork.module.css";
import index from "../styles/index.module.css";
import BigSpinner from "../components/BigSpinner";
import TransactionSpinner from "../components/TransactionSpinner";

// Hooks "Metamask" de Blockchain
import { loadWeb3, useBlockchainData } from "../utils/hooks/metaMask";

const Artwork = ({ id }) => {
  const history = useHistory();
  const [singlePiece, setSinglePieceAtom] = useRecoilState(singlePieceAtom);
  const [author, setAuthor] = useRecoilState(userProfile);
  const user = useRecoilValue(userAtom);
  const { getSinglePiece, buyPiece } = ArtFunctions();
  const { getUser } = UserFunctions();
  const [showWait, setShowWait] = useState(false);
  const [transactionMessage, setTransactionMessage] = useState(
    "Please confirm the transaction on Metamask"
  );

  // Metamask
  const { loadBlockchainData } = useBlockchainData();

  useEffect(() => {
    getSinglePiece(id).then((res) => {
      setSinglePieceAtom(res);
      getUser(res.authorId).then((res) => setAuthor(res));
    });
    return () => {
      setSinglePieceAtom("");
      setAuthor({});
    };
  }, []);

  const Buy = async () => {
    setShowWait(true);
    await loadWeb3();
    let { contracts, userWallet } = await loadBlockchainData();
    if (contracts !== "sin contrato") {
      contracts
        .symbol()
        .call()
        .then((res) => console.log(res));
      // console.log("billetera", userWallet)
      contracts
        .ownerOf(singlePiece.tokenId)
        .call()
        .then((result) => console.log(result));

      // aprobar al comprador
      // contracts.approve("0x4395Df2b939D11F98b42C2Ad84548C8d83F1FaAD", singlePiece.tokenId).send({from: userWallet}).then(result => console.log(result))
      // contracts.getApproved(singlePiece.tokenId).send({from: userWallet})
      // .then(res => console.log("res", res))

      // transfiere un token
      contracts
        .transferFrom(singlePiece.userWallet, userWallet, singlePiece.tokenId)
        .send({ from: userWallet })
        // .then(result => console.log("result", result))
        .once("transactionHash", function () {
          setTransactionMessage(
            "It may take a few minutes for the transaction to be mined."
          );
        })
        .then((result) => {
          console.log("RESULT");
          buyPiece(singlePiece.id, user.uid, userWallet);
          return result;
        })
        .then((result) => {
          console.log(result);
          history.push(`/transaction/${result.transactionHash}`);
          console.log("update obra de arte");
        });
      contracts
        .tokenURI(singlePiece.tokenId)
        .call()
        .then((result) => console.log(result));
    }
  };

  return singlePiece ? (
    <>
      <div className={styles.artworkTitle}>
        {singlePiece?.title}
        {user.uid === singlePiece.ownerId ? (
          <Link to={`/artwork/${id}/edit`}>
            <img className={styles.editIcon} src="/edit.png" alt="Edit Icon" />
          </Link>
        ) : null}
      </div>
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
          {user.uid !== singlePiece.ownerId ? (
            <button className={styles.buyButton} onClick={Buy}>
              Buy Now
            </button>
          ) : null}
        </div>
      </div>
      <div className={styles.artistTitle}>Creator</div>
      <hr className={styles.artistHr} />
      <div className={styles.artistContainer}>
        <img
          className={styles.profilePicture}
          src={author?.photo_profile}
          alt=""
        />
        <div>
          <div className={styles.artistName}>{singlePiece.username}</div>
          <div className={styles.artistDescription}>{author.description}</div>
        </div>
      </div>
      {showWait && (
        <div className={styles.waitContainer}>
          <div className={styles.wait}>
            <div className={styles.waitText}>{transactionMessage}</div>
            <TransactionSpinner />
          </div>
        </div>
      )}
    </>
  ) : (
    <BigSpinner />
  );
};

export default Artwork;
