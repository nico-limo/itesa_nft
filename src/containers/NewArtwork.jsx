import React, { useState } from "react"
import { useHistory } from "react-router-dom"
//utils
import { ArtFunctions } from "../utils/firebase/requests/artworkRequests"
import { useInput, useHandleFile } from "../utils/hooks/useInput"
import { ArtUpdateFunctions } from "../utils/firebase/storage/artfileUpdate"
//styles
import form from "../styles/Form.module.css"
import styles from "../styles/EditProfile.module.css"
//Components
import FormButtonSpinner from "../components/FormButtonSpinner"
import TransactionSpinner from "../components/TransactionSpinner"
// Hooks
import { loadWeb3, useBlockchainData } from "../utils/hooks/metaMask"
import { pinFileToIPFS } from "../utils/hooks/usePinFileToIPFS"

const NewArtwork = () => {
  const { newPiece, updateImgURI } = ArtFunctions()
  const { artWorkFileUpload } = ArtUpdateFunctions()
  const history = useHistory()
  const title = useInput("title")
  const description = useInput("description")
  const price = useInput("price")
  const imgURI = useHandleFile("imgURI")
  const [showLoadingSpinner, setShowLoadingSpinner] = useState(false)
  const [cancelImg, setCancelImg] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [transactionMessage, setTransactionMessage] = useState(
    "Are you sure you want to create this token? Once you you've done it, you won't be able to modify it."
  )
  const [showTransactionSpinner, setShowTransactionSpinner] = useState(false)
  const [nftData] = useState({
    name: title.value,
    keyvalues: { description: description.value },
  })

  // Metamask
  const { loadBlockchainData } = useBlockchainData()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setShowTransactionSpinner(true)
    setTransactionMessage("Please confirm the transaction on Metamask.")
    await loadWeb3() // Blockchain
    let { contracts, userWallet } = await loadBlockchainData() // Blockchain
    pinFileToIPFS(imgURI.file, nftData).then((res) => {
      console.log("res", res)
      contracts
        .createCollectible(res)
        .send({ from: userWallet })
        .once("transactionHash", function () {
          setTransactionMessage(
            "It may take a few minutes for the transaction to be mined."
          )
        })
        .then((res) => {
          let tokenId = res.events.Transfer.returnValues.tokenId
          console.log("res", tokenId)
          newPiece(
            e,
            title.value,
            description.value,
            price.value,
            userWallet,
            tokenId
          ).then((art) => {
            artWorkFileUpload(imgURI.file, "artWorks", art.id)
              .then((url) => updateImgURI(url, art.id))
              .then(() => history.push(`/artwork/${art.id}`))
              .catch(() => setShowLoadingSpinner(false))
          })
        })
    })
  }

  const clearFile = (e) => {
    setCancelImg(!cancelImg)
    imgURI.setFile(null)
  }
  return (
    <div>
      <div className={styles.title}>Create new art piece</div>
      <hr className={styles.titleHr} />
      <div className={styles.editProfileContainer}>
        <form className={styles.form}>
          <div className={styles.inputContainer}>
            <label className={styles.label} htmlFor="title">
              Add a title for your new piece:
            </label>
            <input
              className={form.input}
              type="text"
              name={title.name}
              value={title.value}
              onChange={title.onChange}
            />
          </div>

          <div className={styles.inputContainer}>
            <label className={styles.label} htmlFor="description">
              Add a short description:
            </label>
            <textarea
              className={`${styles.input} ${styles.description}`}
              type="text"
              name={description.name}
              value={description.value}
              onChange={description.onChange}
            />
          </div>

          <div className={styles.inputContainer}>
            <label className={styles.label} htmlFor="price">
              Add the price of your piece:
            </label>
            <input
              className={form.input}
              type="text"
              name={price.name}
              value={price.value}
              onChange={price.onChange}
            />
          </div>

          <div className={styles.inputContainer}>
            <label className={styles.label} htmlFor="photo_picture">
              Add your piece image:
            </label>
            <div className={styles.uploadContainer}>
              <input
                className={form.input}
                type="file"
                onChange={imgURI.onChange}
                name={imgURI.name}
                file={imgURI.file}
                key={cancelImg}
              />
              {imgURI.file ? (
                <p className={styles.clear} onClick={clearFile} id="clear">
                  cancel
                </p>
              ) : null}
            </div>
          </div>

          <button
            className={styles.submit}
            onClick={(e) => {
              e.preventDefault()
              setShowConfirmation(true)
            }}
          >
            {showLoadingSpinner ? <FormButtonSpinner /> : <div>Add piece</div>}
          </button>
        </form>
      </div>
      {showConfirmation && (
        <div className={styles.confirmationContainer}>
          <div className={styles.confirmation}>
            <div className={styles.confirmationText}>{transactionMessage}</div>
            <div>
              {!showTransactionSpinner ? (
                <>
                  <hr />
                  <div className={styles.confirmationButtons}>
                    <div onClick={handleSubmit}>Confirm</div>
                    <div
                      onClick={(e) => {
                        e.preventDefault()
                        setShowConfirmation(false)
                      }}
                    >
                      Cancel
                    </div>
                  </div>
                </>
              ) : (
                <TransactionSpinner />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default NewArtwork
