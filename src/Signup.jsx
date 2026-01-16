import React, { useState, useEffect } from "react";
import styles from "./Signup.module.css";

const TEAM_ID = "19-8";
const SIGN_UP_URL = `https://fe-project-epigram-api.vercel.app/${TEAM_ID}/auth/signUp`;

const Signup = () => {
  const [formData, setFormData] = useState({
    email: "",
    isEmailChecked: false,
    name: "",
    nickname: "",
    isNicknameChecked: false,
    password: "",
    confirmPassword: "",
  });

  const [validation, setValidation] = useState({
    passwordMatch: true,
    isSubmitting: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      // 값 변경 시 중복확인 상태 초기화 (다시 확인하도록 유도)
      [`is${name.charAt(0).toUpperCase() + name.slice(1)}Checked`]: false,
    }));
  };

  useEffect(() => {
    setValidation((prev) => ({
      ...prev,
      passwordMatch:
        formData.password === formData.confirmPassword ||
        formData.confirmPassword === "",
    }));
  }, [formData.password, formData.confirmPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validation.isSubmitting) return;

    setValidation((prev) => ({ ...prev, isSubmitting: true }));

    const requestBody = {
      email: formData.email,
      nickname: formData.nickname,
      password: formData.password,
      passwordConfirmation: formData.confirmPassword,
    };

    try {
      const response = await fetch(SIGN_UP_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (response.ok) {
        alert("회원가입이 완료되었습니다!");
        window.location.href = "/"; // 홈 화면으로 이동
      } else {
        // 닉네임 중복 시 500 에러 처리
        if (response.status === 500) {
          alert("이미 사용 중인 닉네임이거나 서버 오류가 발생했습니다.");
        } else {
          alert(`실패: ${data.message || "입력 정보를 다시 확인해주세요."}`);
        }
      }
    } catch (error) {
      alert("네트워크 오류가 발생했습니다.");
    } finally {
      setValidation((prev) => ({ ...prev, isSubmitting: false }));
    }
  };

  const isFormValid =
    formData.email &&
    formData.nickname &&
    formData.name &&
    formData.password &&
    formData.confirmPassword &&
    validation.passwordMatch &&
    !validation.isSubmitting;

  return (
    <div className={styles.signupContainer}>
      <div className={styles.signupCard}>
        <h1 className={styles.logo}>에피그램</h1>
        <form onSubmit={handleSubmit} className={styles.signupForm}>
          {/* Email */}
          <div className={styles.inputGroup}>
            <label>이메일</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="이메일을 입력해 주세요"
              required
            />
          </div>

          {/* Name */}
          <div className={styles.inputGroup}>
            <label>이름</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="이름을 입력해 주세요"
              required
            />
          </div>

          {/* Nickname */}
          <div className={styles.inputGroup}>
            <label>닉네임</label>
            <input
              type="text"
              name="nickname"
              value={formData.nickname}
              onChange={handleChange}
              placeholder="닉네임을 입력해 주세요"
              required
            />
          </div>

          {/* Password */}
          <div className={styles.inputGroup}>
            <label>비밀번호</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="비밀번호"
              required
            />
          </div>

          {/* Password Confirm */}
          <div className={styles.inputGroup}>
            <label>비밀번호 확인</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="비밀번호 확인"
              required
            />
            {!validation.passwordMatch && formData.confirmPassword && (
              <p className={styles.error}>비밀번호가 일치하지 않습니다.</p>
            )}
          </div>

          <button
            type="submit"
            className={styles.submitButton}
            disabled={!isFormValid}
          >
            {validation.isSubmitting ? "가입 중..." : "가입하기"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
