import React, { useState } from "react";
import styles from "./CreateEpigram.module.css";

const TEAM_ID = "19-8";
const API_URL = `https://fe-project-epigram-api.vercel.app/${TEAM_ID}/epigrams`;

const CreateEpigram = () => {
  const [formData, setFormData] = useState({
    content: "",
    author: "",
    referenceTitle: "",
    referenceUrl: "",
    tagInput: "",
    tags: [],
  });

  const [isLoading, setIsLoading] = useState(false);

  // 입력 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 태그 추가 (엔터 키 입력 시)
  const handleTagKeyDown = (e) => {
    if (e.key === "Enter" && formData.tagInput.trim() !== "") {
      e.preventDefault();
      if (!formData.tags.includes(formData.tagInput.trim())) {
        setFormData((prev) => ({
          ...prev,
          tags: [...prev.tags, formData.tagInput.trim()],
          tagInput: "",
        }));
      }
    }
  };

  // 태그 삭제
  const removeTag = (indexToRemove) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((_, index) => index !== indexToRemove),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("accessToken"); // 로그인 시 저장한 토큰 호출

    if (!token) {
      alert("로그인이 필요한 서비스입니다.");
      return;
    }

    setIsLoading(true);

    const requestData = {
      content: formData.content,
      author: formData.author,
      referenceTitle: formData.referenceTitle,
      referenceUrl: formData.referenceUrl || "https://",
      tags: formData.tags,
    };

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // 토큰 포함 필수
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        alert("에피그램이 등록되었습니다! 👌");
        // 폼 초기화
        setFormData({
          content: "",
          author: "",
          referenceTitle: "",
          referenceUrl: "",
          tagInput: "",
          tags: [],
        });
      } else {
        const errorData = await response.json();
        alert(`등록 실패: ${errorData.message}`);
      }
    } catch (error) {
      alert("네트워크 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2 className={styles.title}>새 에피그램 작성</h2>

        <div className={styles.inputGroup}>
          <label>내용</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="확인중입니다! (최소 1자 이상)"
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label>저자</label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            placeholder="구영철"
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label>출처 제목</label>
          <input
            type="text"
            name="referenceTitle"
            value={formData.referenceTitle}
            onChange={handleChange}
            placeholder="출처 제목을 입력하세요"
          />
        </div>

        <div className={styles.inputGroup}>
          <label>출처 URL</label>
          <input
            type="url"
            name="referenceUrl"
            value={formData.referenceUrl}
            onChange={handleChange}
            placeholder="https://www.naver.com/"
          />
        </div>

        <div className={styles.inputGroup}>
          <label>태그 (Enter를 눌러 추가)</label>
          <input
            type="text"
            name="tagInput"
            value={formData.tagInput}
            onChange={handleChange}
            onKeyDown={handleTagKeyDown}
            placeholder="태그 입력 후 Enter"
          />
          <div className={styles.tagList}>
            {formData.tags.map((tag, index) => (
              <span key={index} className={styles.tagBadge}>
                #{tag}{" "}
                <button type="button" onClick={() => removeTag(index)}>
                  x
                </button>
              </span>
            ))}
          </div>
        </div>

        <button type="submit" className={styles.submitBtn} disabled={isLoading}>
          {isLoading ? "등록 중..." : "에피그램 등록하기"}
        </button>
      </form>

      {/* 반응 섹션 (UI 예시) */}
      <div className={styles.reactionSection}>
        <button onClick={() => alert("반응: OK 🙆‍♀️")}>🙆‍♀️</button>
        <button onClick={() => alert("반응: 좋아요 👍")}>👍</button>
        <button onClick={() => alert("반응: 완료 ✅")}>✅</button>
        <button className={styles.etcBtn}>반응 추가하기</button>
      </div>

      <div className={styles.footerMenu}>
        <span>답장</span>
        <span>전달</span>
        <span>기타</span>
      </div>
    </div>
  );
};

export default CreateEpigram;
