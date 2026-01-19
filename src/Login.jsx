import React, { useState } from "react";
import styles from "./Login.module.css";

const TEAM_ID = "19-8";
const SIGN_IN_URL = `https://fe-project-epigram-api.vercel.app/${TEAM_ID}/auth/signIn`;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(SIGN_IN_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // [중요 수정] API마다 응답 구조가 다르므로 두 가지 경로를 모두 체크합니다.
        // data.accessToken 또는 data.data.accessToken
        const token = data.accessToken || (data.data && data.data.accessToken);
        const refreshToken =
          data.refreshToken || (data.data && data.data.refreshToken);
        const userData = data.user || (data.data && data.data.user);

        if (token) {
          localStorage.setItem("accessToken", token);
          if (refreshToken) localStorage.setItem("refreshToken", refreshToken);
          if (userData) localStorage.setItem("user", JSON.stringify(userData));

          alert("반갑습니다!");
          window.location.href = "/";
        } else {
          // 토큰이 undefined로 저장되는 것을 방지합니다.
          console.error("Token not found in response:", data);
          alert(
            "로그인 성공했으나 인증 토큰을 받지 못했습니다. 서버 응답을 확인하세요."
          );
        }
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
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <h1
          className={styles.logo}
          onClick={() => (window.location.href = "/")}
          style={{ cursor: "pointer" }}
        >
          에피그램
        </h1>
        <form onSubmit={handleLogin} className={styles.loginForm}>
          <div className={styles.inputGroup}>
            <label>이메일</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="이메일을 입력해 주세요"
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label>비밀번호</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력해 주세요"
              required
            />
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
  );
};

export default Login;
