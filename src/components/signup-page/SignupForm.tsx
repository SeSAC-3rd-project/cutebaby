import React, { useEffect, useRef, useState } from "react";
import {
  validateEmail,
  validatePassword,
  validateConfirmPassword,
  validateName,
} from "./SignupValidation";
import { checkEmailDuplication, registerUser } from "./SignupAPI";
import { Link, useNavigate } from "react-router-dom";
import { Input, InputSignupEmail } from "../commons/Input";

import axios from "axios";

const SignupForm: React.FC = () => {
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL;

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
  });

  const [messages, setMessages] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
  });

  const [emailbtn, setEmailCheck] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [signUpCheck, setSignUpCheck] = useState({
    name: false,
    email: false,
    password: false,
    passwordCheck: false,
  });

  const inputRef = useRef({
    email: null as HTMLInputElement | null,
    password: null as HTMLInputElement | null,
    checkPassword: null as HTMLInputElement | null,
    name: null as HTMLInputElement | null,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const emailValidation = validateEmail(formData.email, emailbtn);
    const passwordValidation = validatePassword(formData.password);
    const confirmPasswordValidation = validateConfirmPassword(
      formData.password,
      formData.confirmPassword
    );
    const nameValidation = validateName(formData.name);

    // 각 필드의 유효성 검사 결과를 signUpCheck에 반영
    setSignUpCheck({
      name: nameValidation.isValid,
      email: emailValidation.isValid,
      password: passwordValidation.isValid,
      passwordCheck: confirmPasswordValidation.isValid,
    });

    //입력값 다 잘 통과되었는지 확인해야함
    const isAllFieldsValid =
      nameValidation.isValid &&
      emailValidation.isValid &&
      passwordValidation.isValid &&
      confirmPasswordValidation.isValid &&
      emailbtn; // 이메일 중복 검사 통과 여부 확인하기

    setIsFormValid(isAllFieldsValid);

    // 메시지 업데이트하기
    setMessages({
      email: emailValidation.message,
      password: passwordValidation.message,
      confirmPassword: confirmPasswordValidation.message,
      name: nameValidation.message,
    });
  }, [formData, emailbtn]);

  const emailCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email.includes("@")) {
      setMessages((prev) => ({
        ...prev,
        email: "유효하지 않은 이메일 주소입니다!",
      }));
      return;
    }
    const response = await checkEmailDuplication(formData.email);
    setMessages((prev) => ({ ...prev, email: response.message }));
    setEmailCheck(response.success);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    const response = await registerUser(formData);
    if (response.success) {
      const user = formData;
      const email = user.email;
      const password = user.password;
      const emailPost = await axios.post(`${API_URL}/user`, {
        email,
        password,
      });
      sessionStorage.setItem("user", JSON.stringify(user));
      sessionStorage.setItem("useremail", user.email);
      sessionStorage.setItem("username", user.name);

      alert("회원가입이 완료되었습니다!");
      navigate("/Home", { state: formData });
      window.location.reload();
    } else {
      alert(response.message);
    }
  };

  return (
    <main>
      <div className="centerWrapper">
        <div className="contentsSectionWrap max-w-[35rem]">
          <h2>이메일로 가입하기</h2>

          <section className="flex flex-col h-full  justify-between w-full">
            <div>
              <div className="gap-[1.5rem] flex flex-col">
                <Input
                  label="이름"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="이름을 입력해주세요."
                  ref={(el) => {
                    inputRef.current.name = el;
                  }}
                />
                {messages.name && <p>{messages.name}</p>}
              </div>

              <div>
                <div className="flex items-end gap-4">
                  <Input
                    label="이메일"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="이메일을 입력해주세요."
                    ref={(el: any) => {
                      inputRef.current.email = el;
                    }}
                  />
                  <button className="emailCheckBtn" onClick={emailCheck}>
                    중복체크
                  </button>
                </div>
                {messages.email && <p>{messages.email}</p>}
              </div>

              <div>
                <Input
                  label="비밀번호"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="비밀번호를 입력해주세요."
                  ref={(el) => {
                    inputRef.current.password = el;
                  }}
                />
                {messages.password && <p>{messages.password}</p>}
              </div>

              <div>
                <Input
                  label="비밀번호 확인"
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="비밀번호를 한번 더 입력해주세요."
                  ref={(el) => {
                    inputRef.current.checkPassword = el;
                  }}
                />
                {messages.confirmPassword && <p>{messages.confirmPassword}</p>}
              </div>
            </div>
            <div>
              <Link to="/SelectLogin">
                <button>취소</button>
              </Link>

              <button disabled={!isFormValid} onClick={handleSubmit}>
                완료
              </button>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default SignupForm;
