import React, { useEffect } from "react"
//React-router
import { Link } from "react-router-dom"
//Recoil
import { useRecoilState, useRecoilValue } from "recoil"
import { singlePieceAtom, userProfile, userAtom, metaMaskUserAccount, smartContract, supplyAtom } from "../state/atoms"
//Utils
import { ArtFunctions } from "../utils/firebase/requests/artworkRequests"
import { UserFunctions } from "../utils/firebase/requests/userRequests"
//CSS
import styles from "../styles/artWork.module.css"
import index from "../styles/index.module.css"

import BigSpinner from "../components/BigSpinner"

// Blockchain
import Web3 from "web3";
import CryptoArt from "../truffle/truffle/contracts/CryptoArt.json"


const Artwork = ({ id }) => {
  const [singlePiece, setSinglePieceAtom] = useRecoilState(singlePieceAtom)
  const [author, setAuthor] = useRecoilState(userProfile)
  const user = useRecoilValue(userAtom)
  const { getSinglePiece } = ArtFunctions()
  const { getUser } = UserFunctions()

  // Metamask
  const [userWallet, setUserWallet] = useRecoilState(metaMaskUserAccount)
  const [contract, setContract] = useRecoilState(smartContract)
  // const [supply, setSupply] = useRecoilState(supplyAtom)

  useEffect(() => {
    getSinglePiece(id).then((res) => {
      setSinglePieceAtom(res)
      getUser(res.authorId).then((res) => setAuthor(res))
    })
    return setSinglePieceAtom("")
  }, [])

  useEffect(() => {}, [userWallet])

  const Buy = async () => {
    await loadWeb3()
    await loadBlockchainData()
  }

  // Verifica Metamask --------------
  async function loadWeb3() {
    if (window.ethereum) {
      // current web3 providers
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      // fallback for older web3 providers
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      // no web3 provider, user needs to install one in their browser
      window.alert("No injected web3 provider detected");
    }
    console.log(window.web3.currentProvider);
  }
    // ------------DATA
    async function loadBlockchainData() {
      const web3 = window.web3;
      // Load account
      const accounts = await web3.eth.getAccounts();
      setUserWallet({ account: accounts[0] });
      const networkId = await web3.eth.net.getId();
      const networkData = CryptoArt.networks[networkId];
      console.log("-----", networkId)
      if (!networkData) { // Verifica si existe el contrato
        window.alert("Smart contract not deployed to detected network.");
        return;
      }
  
      const abi = CryptoArt.abi;                          // Abi del contrato
      const address = networkData.address;            // Adress del contrato
      const smartContract = new web3.eth.Contract(abi, address);
      console.log("abi ----", abi)
      console.log("networkdata address", address)
      // console.log("smart contract", smartContract.methods.createCollectible)

      // setContract({ smartContract }); 
      // smartContract.methods.createCollectible("pablitouuu").send({from: userWallet})
      // .on("receipt", function (receipt) {
      //     console.log("receipt", receipt)
      // }).on("error", function (error, receipt){
      //     console.log("error", error)
      // })
      // setSupply({ totalSupply });
    }
    

  return singlePiece ? (
    <>
      <div className={styles.artworkTitle}>
        {singlePiece?.title}
        {user.uid === singlePiece.authorId &&
          user.uid === singlePiece.ownerId ? (
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
          <button 
          className={styles.buyButton}
          onClick={Buy}
          >Buy Now</button>
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
    </>
  ) : (
    <BigSpinner />
  )
}

export default Artwork
