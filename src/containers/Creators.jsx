import React, { useEffect } from "react"
//CSS
import styles from "../styles/Creators.module.css"
//Components
import CreatorsCard from "../components/CreatorsCard"
import BigSpinner from "../components/BigSpinner"
//Recoil
import { useRecoilState } from "recoil"
import { usersArrAtom } from "../state/atoms"
//Utils
import { UserFunctions } from "../utils/firebase/requests/userRequests"

const Creators = () => {
  const [creators, setCreators] = useRecoilState(usersArrAtom)

  const { getAllUsers } = UserFunctions()

  useEffect(() => {
    getAllUsers().then((res) => setCreators(res))
  }, [])

  return (
    <>
      <div>
        <div className={styles.title}>Creators</div>
        <hr className={styles.titleHr}/>
        <div className={styles.container}>
          {creators?.length ? (
            creators.map((user) => <CreatorsCard key={user.uid} user={user} />)
          ) : (
            <BigSpinner />
          )}
        </div>
      </div>
    </>
  )
}

export default Creators
