import React, { useCallback, useState } from "react";
import modal from "../../styles/Modal.module.scss";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { ImageUploader } from "./ImageUploader";
import { useBabyUpdate } from "./hooks/useBabyUpdate";
import { fetchBabyInfo } from "../../store/babySlice";
import { Input } from "../commons/Input";
import { GenderInput } from "../commons/genderList";

interface UpdateBabyProps {
  onClose: () => void;
  selectedBaby: {
    babyid: number;
    babyname: string;
    gender: string;
    birthday: string;
    picture: string | null;
  };
}

export const UpdateBaby: React.FC<UpdateBabyProps> = ({
  onClose,
  selectedBaby,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { requestbaby } = useBabyUpdate();
  const [defaultImg, setDefaultImg] = useState(true);

  //기존 데이터를 유지하면서 변경 가능하도록 설정
  const [rewriteData, setRewriteData] = useState({
    babyname: selectedBaby.babyname,
    gender: selectedBaby.gender,
    birthday: selectedBaby.birthday,
    picture: selectedBaby.picture as string | File | null,
  });

  // 력값이 변경될 때 `rewriteData`를 업데이트
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setRewriteData((prev) => ({ ...prev, [id]: value }));
  };

  // 성별 선택 시 `rewriteData` 업데이트
  // const handleGenderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setRewriteData((prev) => ({ ...prev, gender: e.target.value }));
  // };
  const handleGenderChange = useCallback((gender: string) => {
    setSelectedGender(gender);
    setRewriteData((prev) => ({ ...prev, gender }));
  }, []);

  // 이미지 변경 시 `rewriteData` 업데이트
  const handleImageSelect = (file: File | null) => {
    setRewriteData((prev) => ({
      ...prev,
      picture: file ? file : prev.picture, // 새 이미지가 없으면 기존 이미지 유지
    }));
  };

  // 변경된 값만 FormData에 추가하여 서버로 전송
  const rewrite = async () => {
    const formData = new FormData();
    formData.append("babyid", String(selectedBaby.babyid));

    // 기존 데이터와 비교하여 입력값이 없으면 기존 값으로 채우기
    const babyname = rewriteData.babyname || selectedBaby.babyname;
    const birthday = rewriteData.birthday || selectedBaby.birthday;
    const gender = rewriteData.gender || selectedBaby.gender;
    const picture = rewriteData.picture || selectedBaby.picture;

    formData.append("babyname", babyname);
    formData.append("birthday", birthday);
    formData.append("gender", gender);

    // 기존 이미지 유지 또는 새 이미지 추가
    if (picture instanceof File) {
      formData.append("picture", picture);
    } else if (typeof picture === "string") {
      formData.append("existingPicture", picture); // 기존 이미지 URL을 서버에 전달
    }

    console.log("📦 서버로 전송할 변경된 데이터:", [...formData.entries()]);

    try {
      await requestbaby(formData);
      alert("아이 정보가 수정되었습니다!");
      dispatch(fetchBabyInfo());
      onClose();
    } catch (error) {
      console.error("업데이트 오류:", error);
    }
  };
  const [selectedGender, setSelectedGender] = useState(rewriteData.gender);

  return (
    <div className={modal.modalWrap}>
      <div
        onClick={(e) => e.stopPropagation()}
        className={modal.modalbackground}
      >
        <div className={modal.modal_title_wrap}>
          <div className={modal.modal_title}>아기 정보 수정</div>
          <div onClick={onClose} className={modal.X_btn}>
            X
          </div>
        </div>
        <div className={modal.modal_img_wrap}>
          {defaultImg && <img src="/img/Profile.png" alt="아기 사진" />}
          <div style={{ position: "relative", bottom: "60px", left: "30px" }}>
            <ImageUploader
              setDefaultImg={setDefaultImg}
              onImageSelect={handleImageSelect}
              resetTrigger={false}
            />
          </div>
        </div>
        <div className={modal.modal_Input_wrap}>
          <Input
            label="이름"
            placeholder="이름 입력"
            id="babyname"
            value={rewriteData.babyname}
            onChange={handleInputChange}
          ></Input>
          {/* <label>
            <h2>이름</h2>
            <input
              className={modal.modal_input}
              id="babyname"
              placeholder="이름 입력"
              value={rewriteData.babyname} // 기존 이름 유지
              onChange={handleInputChange}
            />
          </label> */}
          <Input
            label="생년월일"
            type="date"
            id="birthday"
            value={rewriteData.birthday}
            onChange={handleInputChange}
          ></Input>

          {/* <label>
            <h2>생년월일</h2>
            <input
              className={modal.modal_input}
              type="date"
              id="birthday"
              value={rewriteData.birthday} // 기존 날짜 유지
              onChange={handleInputChange}
            />
          </label> */}

          <section>
            <label>성별 :</label>
            <GenderInput
              setSelectedGender={handleGenderChange}
              selectedGender={selectedGender}
            />
          </section>
        </div>

        <div className={modal.modal_button_container}>
          <button
            className={`${modal.modal_btn} ${modal.modal_cancel_button}`}
            onClick={onClose}
          >
            취소
          </button>
          <button
            onClick={rewrite}
            className={`${modal.modal_btn} ${modal.modal_done_button}`}
          >
            완료
          </button>
        </div>
      </div>
      <div onClick={onClose} className={modal.modal_overlay}></div>
    </div>
  );
};
