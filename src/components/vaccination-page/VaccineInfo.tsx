import React from "react";
import { vaccineInfoArray } from "./vaccineInfoArray";
import typography from "../../styles/commons/Typography.module.scss";
import modal from "../../styles/Modal.module.scss";

interface VaccineInfoProps {
  setOpenInfoModal: React.Dispatch<React.SetStateAction<boolean>>;
}
export const VaccineInfo: React.FC<VaccineInfoProps> = ({
  setOpenInfoModal,
}) => {
  return (
    <div
      onClick={() => {
        setOpenInfoModal(false);
      }}
      className={modal.modal_overlay}
    >
      <div
        className={modal.modalWrap}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className={modal.modalContentsArea}>
          <div className={modal.titleArea}>
            <h2 className={`${modal.title} ${typography.text4xlBd}`}>
              백신 정보
            </h2>
            <div
              onClick={() => {
                setOpenInfoModal(false);
              }}
              className={modal.closeBtn}
            >
              <img src="/img/icons/i-modal-close-s32.svg" alt="" />
            </div>
          </div>

          <div
            className={`${typography.textSmRg} ${modal.modalContentsAreaWrap}`}
          >
            <span className={modal.tooltipContents}>
              <strong>국가예방접종</strong>
              <p>
                국가에서 권장하는 필수예방접종(국가는 ⌜감염병의 예방 및 관리에
                관한 법률⌟ 을 통해 예방접종 대상 감염병과 예방접종 실시기준 및
                방법을 정하고, 이를 근거로 재원을 마련하여 지원하고 있음)
              </p>
            </span>

            <ul className={modal.vacInfoWrap}>
              {vaccineInfoArray.map((vaccine, index) => (
                <li className={typography.textMdRg} key={index}>
                  <span
                    className={`${modal.vacInfoIndex} ${typography.textLgMd}`}
                  >
                    {index + 1}
                  </span>
                  <div
                    style={{
                      whiteSpace: "pre-line", // \n을 인식하여 줄바꿈 적용
                    }}
                  >
                    <strong
                      className={`${typography.textLgBd} ${modal.vacName}`}
                    >
                      {vaccine.name}
                    </strong>
                    <br />
                    {vaccine.description}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
