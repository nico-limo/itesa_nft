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
import CryptoArt from "../truffle/truffle/contracts/CryptoArt.json"
import loadWeb3 from "../utils/hooks/metaMask"

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
      const smartContract = await new web3.eth.Contract(abi, address);
      console.log("abi ----", abi)
      console.log("networkdata address", address)
      // console.log("smart contract", smartContract.methods.createCollectible)

      // smartContract.methods.createCollectible("pablitouuu").send({from: "0x4395Df2b939D11F98b42C2Ad84548C8d83F1FaAD"})
      // .on("receipt", function (receipt) {
      //     console.log("receipt", receipt)
      // }).on("error", function (error, receipt){
      //     console.log("error", error)
      // })
      smartContract.methods.balanceOf("0x50dA070f38e7D7b4822CBaD351Da20Bd4E88b607").call()
      .then(result => console.log(result))
      // smartContract.methods.ownerOf(2).call()
      // .then(result => console.log(result))


      // smartContract.methods.tokenURI(2).call()
      // .then(result => console.log(result))

      // transfiere un token
      // smartContract.methods.transferFrom("0x4395Df2b939D11F98b42C2Ad84548C8d83F1FaAD", "0x50dA070f38e7D7b4822CBaD351Da20Bd4E88b607", 2).send({from: "0x4395Df2b939D11F98b42C2Ad84548C8d83F1FaAD"})
      // .then(result => console.log(result))
      
      // Chequea owner del token
      smartContract.methods.ownerOf(2).call()
      .then(result => console.log(result))

      // "0xe4fbc8c0e0715ea0086fc9729ad92bb8616704663093e43bd49b1528b486f4b2"
      
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
