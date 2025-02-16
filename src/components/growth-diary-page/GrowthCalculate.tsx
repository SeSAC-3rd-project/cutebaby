import { CalculateChart } from "./CalculateChart";
import { useFetchData } from "./hooks/useFetchData";
import { useChildData } from "./hooks/useChildData";
import { useShow } from "../../hooks/useShow";
import { CalculateInputArea } from "./CalculateInputArea";
import { CalculateDefaultState } from "./CalculateDefaultState";
import { usePercentiles } from "./hooks/usePercentiles";
import { useFilteredLmsDataByMonths } from "./hooks/useFilteredLmsDataByMonths ";
import { useFilteredLmsDataByGender } from "./hooks/useFilteredLmsDataByGender ";
import { babyinfo } from "../types";
import modal from "../../styles/Modal.module.scss";
import typography from "../../styles/commons/Typography.module.scss";

interface GrowthCalculateProps {
  setOpenCalModal: React.Dispatch<React.SetStateAction<boolean>>;
  babyInfo: babyinfo[];
  selectedBabyId: number | null;
}

export const GrowthCalculate: React.FC<GrowthCalculateProps> = ({
  setOpenCalModal,
  babyInfo,
  selectedBabyId,
}) => {
  // customHook 가져오기
  const { childData, setChildData } = useChildData(babyInfo, selectedBabyId); // babyInfo / selectedBabyId가 변경될 때 childData 업데이트
  const { show, setShow } = useShow();
  const { lmsData, percentileData, isLoading } = useFetchData(childData, show);
  const { filteredLmsDataByGender } = useFilteredLmsDataByGender(
    lmsData,
    childData
  ); // lmsData -> 성별과 일치하는 데이터만 필터링
  const { filteredLmsDataByMonths } = useFilteredLmsDataByMonths(
    filteredLmsDataByGender,
    childData
  ); // lmsData -> 성별+개월수까지 일치하는 데이터 필터링
  const { percentiles, setPercentiles } = usePercentiles(
    childData,
    percentileData,
    filteredLmsDataByMonths
  );

  console.log("GrowthCalculate 모달의 childData", childData);

  return (
    <div
      onClick={() => {
        setOpenCalModal(false);
      }}
      className={modal.modal_overlay}
    >
      <div
        className={modal.modalWrap}
        onClick={(e) => {
          e.stopPropagation();
        }}

      >
        <div className={modal.titleArea}>
          <div className={modal.textWrap}>
            <h2 className={`${modal.modalTitle} ${typography.text4xlBd}`}>
              성장상태 측정계산기
            </h2>
            <p className={`${modal.pageGuide} ${typography.textXlMd}`}>
              우리 아이의 성장 상태를 확인해보세요:)
            </p>
          </div>

          <div
            className={modal.closeBtn}
            onClick={() => {
              setOpenCalModal(false);
            }}
          >
            <img src="/img/icons/i-modal-close-s32.svg" alt="" />
          </div>

        </div>
        <div className={modal.modalContentsArea}>
          {/* 사용자 입력값 설정 */}
          <CalculateInputArea
            childData={childData}
            setChildData={setChildData}
            setShow={setShow}
          />
          {/* 차트 */}
          {/* 차트 표시 여부에 따라 렌더링 */}{" "}
          {show ? (
            isLoading ? (
              <div className={modal.loadingContens}>
                <img src="/img/visuals/visual_loading_ggomul_04.svg" alt="" />
                <p className={typography.textLgMd}>

                  자료를 가져오고 있어요..
                  <br />
                  조금만 기다려주세요..
                </p>
              </div>
            ) : (
              <CalculateChart
                childData={childData}
                filteredLmsDataByGender={filteredLmsDataByGender}
                filteredLmsDataByMonths={filteredLmsDataByMonths}
                percentileData={percentileData}
                percentiles={percentiles}
              />
            )
          ) : (
            <CalculateDefaultState />
          )}
        </div>
      </div>
    </div>
  );
};
