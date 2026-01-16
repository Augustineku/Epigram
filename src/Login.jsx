import React, { useState } from "react";
import styles from "./Login.module.css";

const TEAM_ID = "19-8";
const SIGN_IN_URL = `https://fe-project-epigram-api.vercel.app/${TEAM_ID}/auth/signIn`;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  // 이메일 형식 체크 함수
  const validateEmailFormat = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // 이메일 Blur 핸들러
  const handleEmailBlur = () => {
    let message = "";
    if (!email.trim()) {
      message = "이메일은 필수 입력입니다.";
    } else if (!validateEmailFormat(email)) {
      message = "이메일 형식으로 작성해 주세요.";
    }
    setErrors((prev) => ({ ...prev, email: message }));
  };

  // 비밀번호 Blur 핸들러
  const handlePasswordBlur = () => {
    let message = "";
    if (!password.trim()) {
      message = "비밀번호는 필수 입력입니다.";
    }
    setErrors((prev) => ({ ...prev, password: message }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    // 최종 전송 전 검증
    if (!email || !password || errors.email || errors.password) {
      handleEmailBlur();
      handlePasswordBlur();
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(SIGN_IN_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        if (data.user) localStorage.setItem("user", JSON.stringify(data.user));

        alert("반갑습니다!");
        window.location.href = "/"; // 랜딩 페이지로 이동
      } else {
        alert(data.message || "로그인 정보가 올바르지 않습니다.");
      }
    } catch (error) {
      alert("네트워크 에러가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      {/* 상단 네비게이션 바 */}
      <nav className={styles.navbar}>
        <div className={styles.navLeft}>
          <div
            className={styles.navLogo}
            onClick={() => (window.location.href = "/")}
          >
            <span className={styles.logoIcon}>📚</span>
            <span className={styles.logoText}>Epigram</span>
          </div>
          <span
            className={styles.navItem}
            onClick={() => (window.location.href = "/feed")}
          >
            피드
          </span>
        </div>
        <div className={styles.navRight}>
          <span
            className={styles.navItem}
            onClick={() => (window.location.href = "/login")}
          >
            로그인
          </span>
        </div>
      </nav>

      <div className={styles.loginContainer}>
        <div className={styles.loginCard}>
          <h1 className={styles.logo}>에피그램</h1>
          <form onSubmit={handleLogin} className={styles.loginForm}>
            <div className={styles.inputGroup}>
              <label>이메일</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={handleEmailBlur}
                placeholder="이메일을 입력해 주세요"
                className={errors.email ? styles.inputError : ""}
              />
              {errors.email && (
                <p className={styles.errorMessage}>{errors.email}</p>
              )}
            </div>

            <div className={styles.inputGroup}>
              <label>비밀번호</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={handlePasswordBlur}
                placeholder="비밀번호를 입력해 주세요"
                className={errors.password ? styles.inputError : ""}
              />
              {errors.password && (
                <p className={styles.errorMessage}>{errors.password}</p>
              )}
            </div>

            <button
              type="submit"
              className={styles.submitButton}
              disabled={loading}
            >
              {loading ? "로그인 중..." : "로그인"}
            </button>
          </form>
          <p className={styles.footerText}>
            회원이 아니신가요? <a href="/signup">회원가입하기</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
