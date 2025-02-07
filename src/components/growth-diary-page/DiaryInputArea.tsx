import React, { useEffect, useState } from "react";
import styles from "../../styles/GrowthDiary.module.scss";
import { useNewGrow } from "./hooks/useNewGrow";
import { useSelectBaby } from "../../hooks/useSelectBaby";
import { BabyInfo } from "../my-page/BabyInfo";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { newGrowData } from "../types";
import { fetchgrowInfo } from "../../store/GrowthDiarySlice";

export const DiaryInputArea: React.FC = () => { 
  const dispatch = useDispatch<AppDispatch>(); // Redux dispatch 추가

  const { babyInfo} = useSelector(
    (state: RootState) => state.baby
  );
  const { request } = useNewGrow(); 
  const { selectedBabyId, handleSelectBaby } = useSelectBaby(babyInfo);

  const [newGrowData, setNewGrowData] = useState<newGrowData>({
    babyid:null,
    height: "",
    weight: "",
    head: "",
    inputData:""
  });
  useEffect(() => {
    if (selectedBabyId) {
      setNewGrowData((prev) => ({ ...prev, babyid: selectedBabyId }));
    }
  }, [selectedBabyId]);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setNewGrowData((prev) => ({ ...prev, [id]: value }));
  };
  const today =new Date()
  const formattedDate = today.toISOString().split("T")[0];
console.log(formattedDate)
  console.log(today)

  const submit = async () => {
    if (!newGrowData.babyid) {
      alert("아기를 선택하세요!");
      return;
    }

    try {
      await request({
        babyid: newGrowData.babyid,
        height: Number(newGrowData.height),
        weight: Number(newGrowData.weight),
        head: Number(newGrowData.head),
        inputData :formattedDate
      });
      alert("성장 기록이 추가되었습니다!");
      dispatch(fetchgrowInfo(babyInfo));

      // 입력 필드 초기화
      setNewGrowData({
        babyid: newGrowData.babyid, // 선택된 아기는 유지
        height: "",
        weight: "",
        head: "",
        inputData:""
      });

    } catch (error) {
      alert("기록 추가에 실패했습니다.");
    }
  };

  return (
    <>
    <div className={styles.inputArea_wrap}>
      <div>
        <label className={styles.label} htmlFor="height">신장</label>
        <div>
          <input
            className={styles.input}
            type="number"
            id="height"
            placeholder="숫자 입력"
            value={newGrowData.height}
            onChange={handleInputChange}
          />
          <span>cm</span>
        </div>
      </div>

      <div>
        <label className={styles.label} htmlFor="weight">체중</label>
        <div>
          <input
            className={styles.input}
            type="number"
            id="weight"
            placeholder="숫자 입력"
            value={newGrowData.weight}
            onChange={handleInputChange}
          />
          <span>kg</span>
        </div>
      </div>

      <div>
        <label className={styles.label} htmlFor="head">머리둘레</label>
        <div>
          <input
            className={styles.input}
            type="number"
            id="head"
            placeholder="숫자 입력"
            value={newGrowData.head}
            onChange={handleInputChange}
          />
          <span>cm</span>
        </div>
      </div>

    
    </div>
    <button className={styles.add_btn} onClick={submit}>
        + 기록추가
      </button>
    </>
  );
};

