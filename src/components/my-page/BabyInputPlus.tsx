import React, { useCallback, useRef, useState } from "react";

import { babyinfo } from "../types";
import { useCreatebaby } from "./hooks/useCreatebaby";
import { ImageUploader } from "./ImageUploader";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { fetchBabyInfo } from "../../store/babySlice";
import { Input } from "../commons/Input";
import { GenderInput } from "../commons/genderList";

interface BabyInputProps {
  babyInfo: babyinfo[];
  onClose: () => void;
}

export const BabyInputPlus: React.FC<BabyInputProps> = ({ onClose }) => {
  const today = new Date();
  const birthday = today
    .toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .replace(/. /g, "-")
    .replace(".", "");
  const [defaultImg, setDefaultImg] = useState(true);
  const [selectedGender, setSelectedGender] = useState("");
  const [resetImage, setResetImage] = useState(true); // 리셋시키기위한 상태관리
  const [newBabyData, setNewBabyData] = useState<babyinfo>({
    babyid: 0,
    babyname: "",
    birthday: birthday,
    gender: "",
    picture: null as File | null, // File | null` 타입 유지
  });
  const [genderCheck, setGenderCheck] = useState<boolean>(false);
  const inputRef = useRef({
    babyname: null as HTMLInputElement | null,
    birthday: null as HTMLInputElement | null,
    gender: null as HTMLInputElement | null,
    name: null as HTMLInputElement | null,
  });

  const dispatch = useDispatch<AppDispatch>();
  const { request } = useCreatebaby();
  // const handleGenderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setNewBabyData((prev) => ({ ...prev, gender: e.target.value }));
  // };
  const handleGenderChange = useCallback((gender: string) => {
    setSelectedGender(gender);
    // console.log(gender);
    setNewBabyData((prev) => ({ ...prev, gender }));
  }, []);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setNewBabyData((prev) => ({ ...prev, [id]: value }));
  };

  //입력잘했는지 검사
  const createBaby = async () => {
    if (!newBabyData.babyname) {
      inputRef.current.babyname?.focus();
    } else if (!newBabyData.birthday) {
      inputRef.current.babyname?.focus();
    } else if (!newBabyData.gender) {
      setGenderCheck(true);
      inputRef.current.gender?.focus();
    } else {
      try {
        await request({
          babyname: newBabyData.babyname,
          birthday: newBabyData.birthday,
          gender: newBabyData.gender,
          picture: newBabyData.picture,
        });

        // 입력 필드 초기화
        setNewBabyData({
          babyid: 0,
          babyname: "",
          birthday: birthday,
          gender: "",
          picture: null,
        });
        setResetImage((prev) => !prev);
        dispatch(fetchBabyInfo());
        onClose();
        alert("등록성공!");
      } catch (error) {
        alert("등록에 실패했습니다.");
      }
    }
  };

  return (
    <>
      <div onClick={(e) => e.stopPropagation()}>
        <div>
          <div>아이 정보 등록</div>
          <div onClick={onClose}>
            <img src="/img/icons/i-modal-close-s32.svg" alt="" />
          </div>
        </div>
        <div>
          <div>
            <div>
              {defaultImg && <img src="/img/Profile.png" alt="아기 사진" />}
              <div
                style={{ position: "relative", bottom: "60px", left: "30px" }}
              >
                <ImageUploader
                  setDefaultImg={setDefaultImg}
                  onImageSelect={(file) =>
                    setNewBabyData((prev) => ({ ...prev, picture: file }))
                  }
                  resetTrigger={resetImage}
                />
              </div>
            </div>
            <div>
              <Input
                label="이름"
                placeholder="이름을 입력해주세요."
                id="babyname"
                value={newBabyData.babyname}
                onChange={handleInputChange}
                ref={(el) => {
                  inputRef.current.babyname = el;
                }}
              ></Input>
              <Input
                label="생년월일"
                type="date"
                id="birthday"
                value={newBabyData.birthday}
                onChange={handleInputChange}
                ref={(el) => {
                  inputRef.current.birthday = el;
                }}
              ></Input>
              <section>
                <label>성별</label>
                <GenderInput
                  setSelectedGender={handleGenderChange}
                  selectedGender={selectedGender}
                />
                {genderCheck && "아이의 성별을 체크해주세요!"}
              </section>
            </div>
          </div>
          <div>
            <button type="button" onClick={onClose}>
              취소
            </button>
            <button onClick={createBaby} type="button">
              완료
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
