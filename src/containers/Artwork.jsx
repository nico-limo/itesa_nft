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

// Hooks "Metamask" de Blockchain 
import { loadWeb3, useBlockchainData } from "../utils/hooks/metaMask"

const Artwork = ({ id }) => {
  const [singlePiece, setSinglePieceAtom] = useRecoilState(singlePieceAtom)
  const [author, setAuthor] = useRecoilState(userProfile)
  const user = useRecoilValue(userAtom)
  const { getSinglePiece } = ArtFunctions()
  const { getUser } = UserFunctions()

  // Metamask
  const { loadBlockchainData } = useBlockchainData()
  // const userWallet = useRecoilValue(metaMaskUserAccount)

  useEffect(() => {
    getSinglePiece(id).then((res) => {
      setSinglePieceAtom(res)
      getUser(res.authorId).then((res) => setAuthor(res))
    })
    return setSinglePieceAtom("")
  }, [])

  // useEffect(() => {}, [userWallet])

  const Buy = async () => {
    await loadWeb3()
    let {contracts, userWallet} = await loadBlockchainData()
    
    console.log("contracts", contracts)
    console.log("userWallet", userWallet)
    contracts.symbol().call().then(res => console.log(res))
    contracts.createCollectible("Pokemon").send({from: userWallet})
    .then(result => console.log(result))
    // // Chequea balance
  }
  

  // smartContract.methods.createCollectible("pablitouuu").send({from: "0x4395Df2b939D11F98b42C2Ad84548C8d83F1FaAD"})
      // .on("receipt", function (receipt) {
      //     console.log("receipt", receipt)
      // }).on("error", function (error, receipt){
        //     console.log("error", error)
      // })
      // smartContract.methods.ownerOf(2).call()
      // .then(result => console.log(result))
      

      // smartContract.methods.tokenURI(2).call()
      // .then(result => console.log(result))

      // transfiere un token
      // smartContract.methods.transferFrom("0x4395Df2b939D11F98b42C2Ad84548C8d83F1FaAD", "0x50dA070f38e7D7b4822CBaD351Da20Bd4E88b607", 2).send({from: "0x4395Df2b939D11F98b42C2Ad84548C8d83F1FaAD"})
      // .then(result => console.log(result))
      

      
    

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
