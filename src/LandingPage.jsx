import React, { useEffect, useState } from "react";
import styles from "./LandingPage.module.css";

const TEAM_ID = "19-8";
const API_BASE_URL = `https://fe-project-epigram-api.vercel.app/${TEAM_ID}`;

const LandingPage = () => {
  const [epigrams, setEpigrams] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // 로컬 스토리지에서 유저 정보 가져오기 (로그인 상태 확인용)
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    const fetchEpigrams = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/epigrams?limit=3`);
        const data = await response.json();
        if (response.ok) {
          setEpigrams(data.list);
        }
      } catch (error) {
        console.error("데이터 로드 실패:", error);
      }
    };
    fetchEpigrams();
  }, []);

  const handleLogoClick = () => {
    window.location.href = "/"; // "/" 페이지로 이동하며 새로고침
  };

  const handleFeedClick = () => {
    window.location.href = "/feed"; // 피드 페이지 이동
  };

  return (
    <div className={styles.container}>
      {/* 상단 네비게이션 바 (Navigation bar.png 반영) */}
      <nav className={styles.navbar}>
        <div className={styles.navLeft}>
          <div className={styles.navLogo} onClick={handleLogoClick}>
            <span className={styles.logoIcon}>📚</span>
            <span className={styles.logoText}>Epigram</span>
          </div>
          <span className={styles.navItem} onClick={handleFeedClick}>
            피드
          </span>
        </div>
        <div className={styles.navRight}>
          {user ? (
            <div className={styles.userProfile}>
              <div className={styles.profileCircle}>👤</div>
              <span className={styles.userName}>
                {user.nickname || "김코드"}
              </span>
            </div>
          ) : (
            <span
              className={styles.navItem}
              onClick={() => (window.location.href = "/login")}
            >
              로그인
            </span>
          )}
        </div>
      </nav>

      {/* 섹션 1: 로고 (Frame 59) */}
      <section className={styles.logoSection}>
        <div className={styles.centerLogo}>
          <p>날마다</p>
          <h1>에피그램</h1>
        </div>
      </section>

      {/* ... 이하 기존 섹션 2 ~ 6 동일 ... */}
      <section className={styles.heroSection}>
        <h2 className={styles.heroTitle}>
          나만 갖고 있기엔
          <br />
          아까운 글이 있지 않나요?
        </h2>
        <p className={styles.heroSub}>다른 사람들과 감정을 공유해 보세요.</p>
      </section>

      {/* 섹션 3: 기능 소개 - 공유 (Frame 2609886) */}
      <section className={styles.featureSection}>
        <div className={styles.contentWrapper}>
          <div className={styles.previewBox}>
            <div className={styles.floatingCard}>
              <p>"오랫동안 꿈을 그리는 사람은 마침내 그 꿈을 닮아 간다."</p>
              <span>- 앙드레 말로 -</span>
            </div>
            <div className={styles.tags}>#나아가야할때 #꿈을이루고싶을때</div>
          </div>
          <div className={styles.textBox}>
            <h3>
              명언이나 글귀,
              <br />
              토막 상식들을 공유해 보세요.
            </h3>
            <p className={styles.highlight}>
              나만 알던 소중한 글들을
              <br />
              다른 사람들에게 전파하세요.
            </p>
          </div>
        </div>
      </section>

      {/* 섹션 4: 기능 소개 - 위로 (Frame 2609887) */}
      <section className={`${styles.featureSection} ${styles.reverse}`}>
        <div className={styles.contentWrapper}>
          <div className={styles.previewBox}>
            <div className={styles.emotionRow}>
              <div className={styles.emotionIcon}>기쁨</div>
              <div className={styles.emotionIcon}>고민</div>
              <div className={`${styles.emotionIcon} ${styles.active}`}>
                <span className={styles.emoji}>😢</span>
                <span>슬픔</span>
              </div>
              <div className={styles.emotionIcon}>분노</div>
            </div>
            <div className={styles.blueTags}>#우울해요 #마음이착잡할때</div>
          </div>
          <div className={styles.textBox}>
            <h3>
              감정 상태에 따라,
              <br />
              알맞은 위로를 받을 수 있어요.
            </h3>
            <p className={styles.highlight}>
              태그를 통해 글을 모아 볼 수 있어요.
            </p>
          </div>
        </div>
      </section>

      {/* 섹션 5: 기능 소개 - 통계 (Frame 2609888) */}
      <section className={styles.featureSection}>
        <div className={styles.contentWrapper}>
          <div className={styles.chartPreview}>
            <div className={styles.donutChart}>
              <div className={styles.chartInner}>
                😊
                <br />
                기쁨
              </div>
            </div>
            <ul className={styles.statList}>
              <li>
                <span
                  className={styles.dot}
                  style={{ background: "#4dabf7" }}
                ></span>{" "}
                😊 35%
              </li>
              <li>
                <span
                  className={styles.dot}
                  style={{ background: "#ffec99" }}
                ></span>{" "}
                😍 20%
              </li>
            </ul>
          </div>
          <div className={styles.textBox}>
            <h3>
              내가 요즘 어떤 감정 상태인지
              <br />
              통계로 한눈에 볼 수 있어요.
            </h3>
            <p className={styles.highlight}>
              감정 달력으로
              <br />내 마음에 담긴 감정을 확인해보세요.
            </p>
          </div>
        </div>
      </section>

      {/* 섹션 6: 실시간 에피그램 (Frame 2609889) */}
      <section className={styles.listSection}>
        <h3>
          사용자들이 직접
          <br />
          인용한 에피그램들
        </h3>
        <div className={styles.epigramList}>
          {epigrams.length > 0 ? (
            epigrams.map((item) => (
              <div key={item.id} className={styles.apiCard}>
                <p className={styles.content}>{item.content}</p>
                <p className={styles.author}>- {item.author} -</p>
                <div className={styles.cardTags}>
                  {item.tags?.map((tag) => (
                    <span key={tag.id}>#{tag.name}</span>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className={styles.apiCard}>
              <p>"오랫동안 꿈을 그리는 사람은 마침내 그 꿈을 닮아 간다."</p>
              <p className={styles.author}>- 앙드레 말로 -</p>
            </div>
          )}
        </div>
        <button
          className={styles.startBtn}
          onClick={() => (window.location.href = "/signup")}
        >
          에피그램 시작하기
        </button>
      </section>
    </div>
  );
};

export default LandingPage;
