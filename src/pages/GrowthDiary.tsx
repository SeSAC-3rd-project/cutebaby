import { DiaryChart } from "../components/growth-diary-page/DiaryChart";
import { GrowthCalculate } from "../components/growth-diary-page/GrowthCalculate";
import { DiaryTable } from "../components/growth-diary-page/DiaryTable";
import { BabyList } from "../components/commons/BabyList";
import { DiaryInputArea } from "../components/growth-diary-page/DiaryInputArea";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useSelectBaby } from "../hooks/useSelectBaby";
import styles from "../styles/GrowthDiary.module.scss";
import layout from "../styles/commons/Layout.module.scss";
import { useState } from "react";
import { useGrowData } from "../components/growth-diary-page/hooks/useGrowData";
import { RecentGrowthRecord } from "../components/growth-diary-page/RecentGrowthRecord";
import "../styles/commons/Layout.module.scss";

export default function GrowthDiary() {
  const [openCalModal, setOpenCalModal] = useState<boolean>(false);
  const [openAddModal, setOpenAddModal] = useState<boolean>(false);

  const { babyInfo, nothingBaby } = useSelector(
    (state: RootState) => state.baby
  );
  const growInfo = useSelector((state: RootState) => state.babygrow.growInfo);

  const { selectedBabyId, handleSelectBaby } = useSelectBaby(babyInfo);
  const { growData } = useGrowData(growInfo, selectedBabyId); // growData = growInfo를 selectedBabyId에 따라 필터링 // selectedBabyId가 변경될 때 growData 업데이트

  // const growInfo = sessionStorage.getItem('babygrow');

  console.log("애기 성장정보 입니다 >>>>", growInfo);
  console.log("selectedBabyId에 따른 성장정보 입니다 >>>>", growData);

  return (
    <div className={layout.background}>
      {/* // <div className="background"> */}
      <div className={layout.title_wrap}>
        <div className={styles.title_container}>
          <div className={layout.title}>성장일지</div>
          <div className={styles.text}>
            <strong>우리 아이의 성장</strong>을 기록하고 상태를 확인해보세요 :)
          </div>
        </div>
        <button
          className={styles.cal_btn}
          onClick={() => {
            setOpenCalModal(true);
          }}
        >
          성장상태 계산 {">"}
        </button>
      </div>
      <div className={styles.contents_wrap}>
        {growData.length > 0 ? (
          <BabyList
            babyInfo={babyInfo}
            handleSelectBaby={handleSelectBaby}
            selectedBabyId={selectedBabyId}
          />
        ) : (
          // 성장기록 데이터가 없을 때
          //   <div>데이터가 없습니다.</div>
          <>
            <img src="img/Contents.png"></img>
            <button className={styles.baby_button}>아이 등록하기 {">"}</button>
          </>
        )}
        {/* <BabyList
          babyInfo={babyInfo}
          handleSelectBaby={handleSelectBaby}
          selectedBabyId={selectedBabyId}
        /> */}

        <div className={styles.recent_container}>
          {/* 최근 성장기록 */}
          {/* <div className={styles.recent_record_wrap}> */}
          {growData.length > 0 ? (
            <>
              <div className={styles.recent_record_wrap}>
                <RecentGrowthRecord growData={growData} />
                <button
                  onClick={() => {
                    setOpenAddModal(true);
                  }}
                  className={styles.recent_add}
                >
                  성장기록
                </button>
              </div>
            </>
          ) : (
            // 성장기록 데이터가 없을 때
            //   <p>데이터가 없습니다.</p>
            <p></p>
          )}
          {/* <button
              onClick={() => {
                setOpenAddModal(true);
              }}
              className={styles.recent_add}
            >
              성장기록
            </button> */}
          {/* </div> */}

          {/* 성장기록에 대한 그래프 */}
          <div
            style={{
              width: "906px",
              height: "332px",
              marginTop: "24px",
            }}
          >
            {growData.length > 0 ? (
              <DiaryChart growData={growData} />
            ) : (
              // 성장기록 데이터가 없을 때
              //   <div>데이터가 없습니다.</div>
              <p></p>
            )}
          </div>
        </div>
      </div>

      {/* 성장 계산기 모달  */}
      {openCalModal && (
        <GrowthCalculate
          setOpenCalModal={setOpenCalModal}
          babyInfo={babyInfo}
          selectedBabyId={selectedBabyId}
        />
      )}

      {/* 기록추가 모달 */}
      {openAddModal && (
        <div className={styles.block_record}>
          <div className={styles.add_wrap}>
            <DiaryInputArea
              setOpenAddModal={setOpenAddModal}
              selectedBabyId={selectedBabyId}
            />
          </div>

          <DiaryTable growData={growData} />
        </div>
      )}
    </div>
    // </div>
  );
}
