import React, { useEffect } from "react"
//React-router
import { Link, useHistory } from "react-router-dom"
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
  const history = useHistory()
  const [singlePiece, setSinglePieceAtom] = useRecoilState(singlePieceAtom)
  const [author, setAuthor] = useRecoilState(userProfile)
  const user = useRecoilValue(userAtom)
  const { getSinglePiece, buyPiece } = ArtFunctions()
  const { getUser } = UserFunctions()

  // Metamask
  const { loadBlockchainData } = useBlockchainData()

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
    
    contracts.symbol().call().then(res => console.log(res))
    // console.log("billetera", userWallet)
    contracts.ownerOf(singlePiece.tokenId).call().then(result => console.log(result))

    // aprobar al comprador
    // contracts.approve("0x4395Df2b939D11F98b42C2Ad84548C8d83F1FaAD", singlePiece.tokenId).send({from: userWallet}).then(result => console.log(result))
    // contracts.getApproved(singlePiece.tokenId).send({from: userWallet})
    // .then(res => console.log("res", res))

    // transfiere un token
    contracts.transferFrom(singlePiece.userWallet, userWallet, singlePiece.tokenId).send({from: userWallet})
    .then(result => console.log("result", result))
    .then(() => buyPiece(singlePiece.id, user.uid, userWallet))
    .then(() => {
      history.push("/me")
      console.log("update obra de arte")
    })
  }
  
      
      // smartContract.methods.tokenURI(2).call()
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
