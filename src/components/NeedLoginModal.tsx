import React from 'react'
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Modal.module.scss'
interface modalStateProps {
    modalState : ()=> void
}
export const NeedLoginModal:React.FC<modalStateProps> = ({modalState}) => {
    const navigate = useNavigate();

    const gotoLogin = ()=>{
        navigate('/Login')

    }
    const goBack = () => {
        navigate(-1); // 이전 페이지로 이동
      };
  return (
      <div className={styles.modalbackground}>
        <div className={styles.mainModal}>
        <p>로그인이 필요한 서비스입니다.</p>
        <div >
          <button onClick={gotoLogin} >
            로그인하러 가기
          </button>
          <button onClick={goBack} >
            닫기
          </button>
        </div>
        </div>
      </div>
  )
}
