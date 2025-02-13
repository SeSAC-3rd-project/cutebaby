import React, { useCallback, useRef, useState } from "react";
// import styles from "../../styles/Mypage.module.scss";
import styles from "../../styles/Modal.module.scss";
import tabs from "../../styles/commons/ChildrenTabs.module.scss";
import { babyinfo } from "../types";
import { useCreatebaby } from "./hooks/useCreatebaby";
import { ImageUploader } from "./ImageUploader";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { fetchBabyInfo } from "../../store/babySlice";
import { BabyModal } from "./MypageModal";
import { Input } from "../commons/Input";
import { BabyList } from "../commons/BabyList";
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
  const [selectedGender, setSelectedGender] = useState("boy");
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
    console.log(gender);
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
      <div
        onClick={(e) => e.stopPropagation()}
        className={styles.modal_container}
      >
        <div className={styles.modal_title_wrap}>
          <div className={styles.modal_title}>아이 정보 등록</div>
          <div className={styles.X_btn}>X</div>
        </div>
        <div className={styles.modal_img_wrap}>
          {defaultImg && <img src="/img/Profile.png" alt="아기 사진" />}
          <div style={{ position: "relative", bottom: "60px", left: "30px" }}>
            <ImageUploader
              setDefaultImg={setDefaultImg}
              onImageSelect={(file) =>
                setNewBabyData((prev) => ({ ...prev, picture: file }))
              }
              resetTrigger={resetImage}
            />
          </div>
        </div>
        <form className={styles.modal_Input_wrap}>
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
          {/* <section>
            <label>이름</label>
            <input
              type="text"
              id="babyname"
              placeholder="아이의 이름을 입력해주세요!"
              value={newBabyData.babyname}
              onChange={handleInputChange}
              ref={(el) => {
                inputRef.current.babyname = el;
              }}
            />
          </section> */}

          {/* <section>
            <label>생년월일</label>
            <input
              type="date"
              id="birthday"
              value={newBabyData.birthday}
              onChange={handleInputChange}
              ref={(el) => {
                inputRef.current.birthday = el;
              }}
            />
          </section> */}
          <section>
            {/* <label>성별</label>
            <div className={tabs.button_group}>
              <div className={tabs.button_selected}>남아</div>
              <div className={tabs.button}>여아</div>
            </div> */}
            <label>성별 :</label>
            <GenderInput
              setSelectedGender={handleGenderChange}
              selectedGender={selectedGender}
            />
            {/* <label>
              <input
                type="checkbox"
                name="gender"
                value="boy"
                checked={newBabyData.gender === "boy"}
                onChange={handleGenderChange}
              />
              남아
            </label>
            <label>
              <input
                type="checkbox"
                name="gender"
                value="girl"
                checked={newBabyData.gender === "girl"}
                onChange={handleGenderChange}
              />
              여아
            </label> */}
            {genderCheck && "아이의 성별을 체크해주세요!"}
          </section>
        </form>
        <div className={styles.modal_button_container}>
          <button
            className={`${styles.modal_btn} ${styles.modal_cancel_button}`}
            onClick={createBaby}
          >
            취소
          </button>
          <button
            className={`${styles.modal_btn} ${styles.modal_done_button}`}
            onClick={onClose}
          >
            완료
          </button>
        </div>
      </div>
    </>
  );
};
