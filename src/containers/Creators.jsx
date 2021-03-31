import React, { useEffect } from "react"
import styles from "../styles/Creators.module.css"
import CreatorsCard from "./CreatorsCard"

import { usersArrAtom } from "../state/atoms"
import { UserFunctions } from "../utils/firebase/requests/userRequests"
import { useRecoilState } from "recoil"

const Creators = () => {
  const [creators, setCreators] = useRecoilState(usersArrAtom)

  const { getAllUsers } = UserFunctions()

  useEffect(() => {
    getAllUsers().then((res) => setCreators(res))
  }, [])

  return (
    <>
      <div className={styles.title}>Creators</div>
      <div className={styles.container}>
      {creators.length ? (
          creators.map((user) => <CreatorsCard key={user.uid} user={user} />)
        ) : (
          <h1>Loading...</h1>
        )}
      </div>
    </>
  )
}

export default Creators
