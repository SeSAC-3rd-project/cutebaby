import { useState } from "react";
import axios from "axios";

export const useCreatebaby = () => {
  const [createbaby, setCreateBaby] = useState(null);
  const usernumber = sessionStorage.getItem("usernumber");
  if (!usernumber) {
    throw new Error("usernumber가 존재하지 않습니다.");
  }
  const request = async (data: {
    babyname: string;
    birthday: string;
    gender: string;
    picture: File | null;
  }) => {
    const API_URL = process.env.REACT_APP_API_URL;

    try {
      const formData = new FormData();
      formData.append("babyname", data.babyname);
      formData.append("usernumber", usernumber);
      formData.append("birthday", data.birthday);
      formData.append("gender", data.gender);

      if (data.picture instanceof File) {
        formData.append("picture", data.picture);
      }

      // console.log("📦 전송할 FormData:", formData); //FormData 확인

      const response = await axios.post(`${API_URL}/babycreate`, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // 파일 업로드 필수 헤더
        },
      });

      // console.log("데이터 전송 성공:", response);
      setCreateBaby(response.data);
      return response.data;
    } catch (error) {
      // console.error("데이터 전송 실패:", error);
      throw error;
    }
  };

  return { createbaby, request };
};
