import React, { useEffect, useState } from "react";
import modal from "../../styles/Modal.module.scss";
import styles from "../../styles/GrowthDiary.module.scss";
import typography from "../../styles/commons/Typography.module.scss";
import button from "../../styles/commons/Button.module.scss";
import { newGrowData } from "../types";
import { useUpdateGrow } from "./hooks/useUpdateGrow";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { fetchgrowInfo } from "../../store/GrowthDiarySlice";
import { Input } from "../commons/Input";

interface GrowRewriteModalProps {
  onClose: () => void;
  growData: newGrowData[];
  growId: number;
}

export const GrowRewriteModal: React.FC<GrowRewriteModalProps> = ({
  onClose,
  growData,
  growId,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { babyInfo } = useSelector((state: RootState) => state.baby);
  const { requestGrow } = useUpdateGrow();

  // 기본 데이터 저장
  const [basicdata, setBasicdata] = useState<newGrowData>({
    babyid: null,
    id: 0,
    height: "",
    weight: "",
    head: "",
    inputData: "",
  });

  // 수정 데이터 상태
  const [rewriteData, setrewriteData] = useState<newGrowData>(basicdata);

  // growData가 변경될 때 기본값 설정
  useEffect(() => {
    if (growData.length === 0) return; // 데이터가 없을 경우 실행 방지

    const beforedate = growData.find((value) => value.id === growId);
    if (beforedate) {
      setBasicdata(beforedate);
      setrewriteData(beforedate); // 기본값을 rewriteData에도 즉시 반영
    }
  }, [growData, growId]);

  // growData가 변경될 때 rewriteData도 즉시 반영
  useEffect(() => {
    setrewriteData(basicdata);
  }, [basicdata]);

  // 입력 변경 핸들러
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setrewriteData((prev) => ({ ...prev, [id]: value }));
  };

  // 포커스 시 기존 값 초기화
  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    const { id } = e.target;
    setrewriteData((prev) => ({ ...prev, [id]: "" }));
  };

  // 포커스를 잃을 때 기본값 복구
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setrewriteData((prev) => ({
      ...prev,
      [id]: value.trim() === "" ? basicdata[id as keyof newGrowData] : value,
    }));
  };

  // 수정 버튼 클릭 시 실행
  const handleRewrite = async () => {
    try {
      await requestGrow({
        babyid: Number(growData[0].babyid),
        id: growId,
        height: Number(rewriteData.height),
        weight: Number(rewriteData.weight),
        head: Number(rewriteData.head),
        inputData: rewriteData.inputData,
      });

      alert("성장 기록이 수정되었습니다!");
      dispatch(fetchgrowInfo(babyInfo));
      onClose();
    } catch (error) {
      alert("기록 수정에 실패했습니다.");
    }
  };

  return (
    <div onClick={onClose} className={modal.modal_overlay}>
      <div onClick={(e) => e.stopPropagation()} className={modal.modalWrapW640}>
        <div className={modal.titleArea}>
          <div className={typography.text4xlBd}>기록 수정</div>
          <div onClick={onClose} className={modal.closeBtn}>
            <img src="/img/icons/i-modal-close-s32.svg" alt="" />
          </div>
        </div>
        <div className={modal.modalContentsArea}>
          <div className={modal.modalContentsAreaWrap}>
            <div className={styles.formArea}>
              <div>
                <Input
                  label="측정날짜"
                  type="date"
                  className={styles.input}
                  id="inputData"
                  value={rewriteData.inputData}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Input
                  label="키"
                  className={styles.input}
                  id="height"
                  placeholder="숫자만"
                  // value={rewriteData.height}
                  value={String(rewriteData.height)}
                  onChange={handleInputChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
                <span className={`${modal.unit} ${typography.textSmBd}`}>
                  cm
                </span>
              </div>
              <div>
                <Input
                  label="몸무게"
                  className={modal.modal_input}
                  id="weight"
                  placeholder="숫자만"
                  // value={rewriteData.weight}
                  value={String(rewriteData.weight)}
                  onChange={handleInputChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
                <span className={`${modal.unit} ${typography.textSmBd}`}>
                  kg
                </span>
              </div>
              <div>
                {/* <label>머리둘레</label> */}
                <Input
                  label="머리둘레"
                  className={modal.modal_input}
                  id="head"
                  placeholder="숫자만"
                  value={rewriteData.head}
                  onChange={handleInputChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
                <span className={`${modal.unit} ${typography.textSmBd}`}>
                  cm
                </span>
              </div>
            </div>
          </div>
          <div className={modal.modal_button_container}>
            <button
              // className={`${modal.modal_btn} ${modal.modal_cancel_button}`}
              className={`${button.btnXlYw} ${typography.textXlBd}`}
              onClick={onClose}
            >
              취소
            </button>
            <button
              onClick={handleRewrite}
              // className={`${modal.modal_btn} ${modal.modal_done_button}`}
              className={`${button.btnXlGr} ${typography.textXlBd}`}
            >
              완료
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
