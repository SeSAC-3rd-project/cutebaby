import { Link } from "react-router-dom";
import styles from "../styles/Vaccination.module.scss";
import VacUnit from "./vac_unit";

export default function Vaccination() {
  return (
    <>
      <div className={styles.background}>
        <div className={styles.title}>예방접종</div>
        <div className={styles.text}>
          우리 하나의 예방접종 일정을 관리해보세요 😀
        </div>
        <div className={styles.user_list}>
          <div className={styles.user}>김하나</div>
          <div className={styles.user}>김두리</div>
          <div className={styles.user}>김세찌</div>
        </div>
        <select className={styles.select}>
          <option>전체</option>
          <option>1</option>
          <option>2</option>
        </select>
        <div className={styles.button_wrap}>
          <button className={styles.small_btn}>
            <Link to="/VaccinationDetail">예방접종 상세설명</Link>
          </button>
          <button className={styles.small_btn}>
            <Link to="/VaccinationHospital">위탁의료기관 찾기</Link>
          </button>
        </div>
        <div className={styles.vac_list}>
          <VacUnit />
          <VacUnit />
          <VacUnit />
          <VacUnit />
          <VacUnit />
          <VacUnit />
          <VacUnit />
          <VacUnit />
        </div>
      </div>
    </>
  );
}
