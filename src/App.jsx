import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import styles from "./LandingPage.module.css";
import Login from "./Login"; // 이미 작성된 Login 컴포넌트 임포트
import Signup from "./Signup"; // 이미 작성된 Signup 컴포넌트 임포트

const TEAM_ID = "19-8";
const API_BASE_URL = `https://fe-project-epigram-api.vercel.app/${TEAM_ID}`;

// 네비게이션 바 컴포넌트 (공통 사용)
const Navbar = ({ user }) => {
  const navigate = useNavigate();

  return (
    <nav className={styles.navbar}>
      <div className={styles.navLeft}>
        {/* Link를 사용하면 새로고침 없이 홈으로 이동합니다 */}
        <Link to="/" className={styles.navLogo}>
          <span className={styles.logoIcon}>📚</span>
          <span className={styles.logoText}>Epigram</span>
        </Link>
        <Link to="/feed" className={styles.navItem}>
          피드
        </Link>
      </div>
      <div className={styles.navRight}>
        {user ? (
          <div className={styles.userProfile}>
            <div className={styles.profileCircle}>👤</div>
            <span className={styles.userName}>{user.nickname || "김코드"}</span>
            <button
              onClick={() => {
                localStorage.clear();
                window.location.href = "/";
              }}
              className={styles.logoutBtn}
            >
              로그아웃
            </button>
          </div>
        ) : (
          <Link to="/login" className={styles.navItem}>
            로그인
          </Link>
        )}
      </div>
    </nav>
  );
};

// 메인 랜딩 페이지 컴포넌트
const LandingPage = () => {
  const [epigrams, setEpigrams] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEpigrams = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/epigrams?limit=3`);
        const data = await response.json();
        if (response.ok) setEpigrams(data.list);
      } catch (error) {
        console.error("데이터 로드 실패:", error);
      }
    };
    fetchEpigrams();
  }, []);

  return (
    <>
      <section className={styles.logoSection}>
        <div className={styles.centerLogo}>
          <p>날마다</p>
          <h1>에피그램</h1>
        </div>
      </section>

      <section className={styles.heroSection}>
        <h2 className={styles.heroTitle}>
          나만 갖고 있기엔
          <br />
          아까운 글이 있지 않나요?
        </h2>
        <p className={styles.heroSub}>다른 사람들과 감정을 공유해 보세요.</p>
      </section>

      {/* ... (기타 섹션 3~5 생략) ... */}

      <section className={styles.listSection}>
        <h3>
          사용자들이 직접
          <br />
          인용한 에피그램들
        </h3>
        <div className={styles.epigramList}>
          {epigrams.map((item) => (
            <div key={item.id} className={styles.apiCard}>
              <p className={styles.content}>{item.content}</p>
              <p className={styles.author}>- {item.author} -</p>
            </div>
          ))}
        </div>
        <button className={styles.startBtn} onClick={() => navigate("/signup")}>
          에피그램 시작하기
        </button>
      </section>
    </>
  );
};

// 메인 App 컴포넌트 (라우터 설정)
const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  return (
    <Router>
      <div className={styles.container}>
        <Navbar user={user} />

        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {/* <Route path="/feed" element={<Feed />} /> */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
