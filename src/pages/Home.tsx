import { AiChatComponent } from "../components/home-page/AiChatComponent";
import styles from "../styles/Home.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const { babyInfo } = useSelector((state: RootState) => state.baby);

  console.log("로그인성공시 babyinfo불러옴", babyInfo);

  return (
    <>
      <div className={styles.background}>
        <div className={styles.block_user}>
          <div className={styles.big_title}>
            땡땡이님,
            <br />
            안녕하세요
          </div>
          <div className={styles.small_title}>다가오는 예방접종</div>
          <div className={styles.small_box}></div>
          <div className={styles.big_box}></div>
          <div className={styles.banner_wrap}>
            <div className={styles.banner}>
              <div className={styles.small_title}>예방점종 상세설명</div>
            </div>
            <div className={styles.banner}>
              <div className={styles.small_title}>위탁의료기관 찾기</div>
            </div>
          </div>
        </div>
        <div className={styles.block_chatbot}>
          <div className={styles.chatbot}>도움이 필요하신가요?</div>
          <AiChatComponent />
        </div>
      </div>
    </>
  );
}
