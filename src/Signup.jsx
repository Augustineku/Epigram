import React, { useState, useEffect, useCallback } from "react";
import styles from "./Signup.module.css";

const TEAM_ID = "4-8";
const SIGN_UP_URL = `https://fe-project-epigram-api.vercel.app/${TEAM_ID}/auth/signUp`;

const Signup = () => {
  const [formData, setFormData] = useState({
    email: "",
    isEmailChecked: false,
    name: "",
    isNameChecked: false,
    nickname: "",
    isNicknameChecked: false,
    password: "",
    confirmPassword: "",
  });

  const [validation, setValidation] = useState({
    emailValid: true,
    passwordMatch: true,
    isSubmitting: false,
  });

  // 입력값 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      // 값 변경 시 해당 항목의 중복확인 상태 초기화
      [`is${name.charAt(0).toUpperCase() + name.slice(1)}Checked`]: false,
    }));
    if (name === "email")
      setValidation((prev) => ({ ...prev, emailValid: true }));
  };

  // 비밀번호 일치 확인
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

    // API가 요구하는 정확한 필드명으로 매칭
    const requestBody = {
      email: formData.email,
      nickname: formData.nickname,
      password: formData.password,
      passwordConfirmation: formData.confirmPassword, // 필드명 수정 필수!
      // 'name' 필드는 서버에서 허용하지 않으므로 삭제합니다.
    };

    try {
      const response = await fetch(SIGN_UP_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (response.ok) {
        alert("회원가입 성공!");
        window.location.href = "/login";
      } else {
        // 이제 상세 에러 메시지가 출력됩니다.
        console.error("서버 에러 상세:", data.details);
        alert(`회원가입 실패: ${data.message}`);
      }
    } catch (error) {
      alert("네트워크 오류가 발생했습니다.");
    }
  };

  const isFormValid =
    formData.email &&
    formData.isEmailChecked &&
    formData.nickname &&
    formData.isNicknameChecked &&
    formData.name &&
    formData.password &&
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
            <div className={styles.inputWithButton}>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="이메일"
                required
              />
              <button
                type="button"
                onClick={() =>
                  setFormData((p) => ({ ...p, isEmailChecked: true }))
                }
                className={formData.isEmailChecked ? styles.checked : ""}
              >
                {formData.isEmailChecked ? "확인됨" : "중복확인"}
              </button>
            </div>
          </div>

          {/* Nickname */}
          <div className={styles.inputGroup}>
            <label>닉네임</label>
            <div className={styles.inputWithButton}>
              <input
                type="text"
                name="nickname"
                value={formData.nickname}
                onChange={handleChange}
                placeholder="닉네임"
                required
              />
              <button
                type="button"
                onClick={() =>
                  setFormData((p) => ({ ...p, isNicknameChecked: true }))
                }
              >
                {formData.isNicknameChecked ? "확인됨" : "중복확인"}
              </button>
            </div>
          </div>

          {/* Name */}
          <div className={styles.inputGroup}>
            <label>이름</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="이름"
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
            {!validation.passwordMatch && (
              <p className={styles.error}>비밀번호가 일치하지 않습니다.</p>
            )}
          </div>

          <button
            type="submit"
            className={styles.submitButton}
            disabled={!isFormValid}
          >
            회원가입
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
