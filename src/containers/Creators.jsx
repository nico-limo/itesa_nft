import React, { useEffect } from "react";
//CSS
import styles from "../styles/Creators.module.css";
import spinners from "../styles/Spinners.module.css";
//Components
import CreatorsCard from "../components/CreatorsCard";
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
          <div className={spinners.spinnerBox}>
            <div className={spinners.circleBorder}>
              <div className={spinners.circleCore}></div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Creators;
