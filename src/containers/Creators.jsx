import React, { useEffect } from "react";
//CSS
import styles from "../styles/Creators.module.css";
import spinners from "../styles/Spinners.module.css";
//Components
import CreatorsCard from "../components/CreatorsCard";
import BigSpinner from "../components/BigSpinner";
//Recoil
import { useRecoilState } from "recoil";
import { usersArrAtom } from "../state/atoms";
//Utils
import { UserFunctions } from "../utils/firebase/requests/userRequests";

const Creators = () => {
  const [creators, setCreators] = useRecoilState(usersArrAtom);

  const { getAllUsers } = UserFunctions();

  useEffect(() => {
    getAllUsers().then((res) => setCreators(res));
  }, []);

  return (
    <>
      <div className={styles.title}>Creators</div>
      <div className={styles.container}>
        {creators.length ? (
          creators.map((user) => <CreatorsCard key={user.uid} user={user} />)
        ) : (
          <BigSpinner />
        )}
      </div>
    </>
  );
};

export default Creators;
