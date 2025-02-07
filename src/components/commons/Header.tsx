import { Link } from 'react-router-dom';
import Logout from '../login-page/Logout';
import styles from '../../styles/commons/Header.module.scss';
// import logo from "/logo.png";

export default function Header() {
    return (
        <>
            <div className={styles.header}>
                <div>
                    <Link to="/Home">
                        <img src="/img/logo.png" alt="Logo" />
                    </Link>
                </div>
                <div className={styles.menu_container}>
                    <div className={styles.menu}>서비스 소개</div>
                    <div>
                        {' '}
                        <Link to="/Login" className={styles.menu_gray}>
                            로그인
                        </Link>
                    </div>
                </div>
            </div>

            <div className={styles.header}>
                <div>
                    <Link to="/Home">
                        <img src="/img/logo.png" alt="Logo" />
                    </Link>
                </div>
                <div className={styles.menu_container}>
                    <div className={styles.menu}>
                        <Link
                            to="/Vaccination"
                            style={{ textDecoration: 'none', color: '#3b3b41' }}
                        >
                            예방접종
                        </Link>
                    </div>
                    <div>
                        <Link to="/GrowthDiary" className={styles.menu_gray}>
                            성장기록
                        </Link>
                    </div>
                    <div>
                        <Link
                            to="/Mypage"
                            className={styles.menu_gray}
                            style={{ textDecoration: 'none' }}
                        >
                            마이페이지
                        </Link>
                    </div>
                    {/* <button onClick={Logout}>로그아웃</button> */}
                    <div
                        className={styles.menu_gray}
                        style={{ cursor: 'pointer' }}
                        onClick={Logout}
                    >
                        로그아웃
                    </div>
                </div>
            </div>
        </>
    );
}
