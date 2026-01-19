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

  // 입력값 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 태그 추가 (엔터 키 입력 시)
  const handleTagKeyDown = (e) => {
    if (e.key === "Enter" && formData.tagInput.trim() !== "") {
      e.preventDefault();
      // 중복 태그 방지
      if (!formData.tags.includes(formData.tagInput.trim())) {
        setFormData((prev) => ({
          ...prev,
          tags: [...prev.tags, formData.tagInput.trim()],
          tagInput: "",
        }));
      } else {
        setFormData((prev) => ({ ...prev, tagInput: "" }));
      }
    }
  };

  // 태그 삭제 핸들러
  const removeTag = (indexToRemove) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((_, index) => index !== indexToRemove),
    }));
  };

  // 에피그램 등록 제출
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("accessToken");

    // 1. 토큰 존재 여부 확인 (Forbidden 방지 1단계)
    if (!token || token === "undefined") {
      alert("로그인이 필요한 서비스입니다. 다시 로그인해 주세요.");
      window.location.href = "/login";
      return;
    }

    setIsLoading(true);

    // 2. 서버가 거절하지 않도록 데이터 정제 (Forbidden 방지 2단계)
    const requestData = {
      content: formData.content,
      author: formData.author,
      // URL이 비어있으면 아예 null로 보내어 유효성 검사 통과
      referenceUrl: formData.referenceUrl.trim() || null,
      referenceTitle: formData.referenceTitle.trim() || null,
      tags: formData.tags,
    };

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // 3. Bearer와 토큰 사이 공백 확인 (Forbidden 방지 3단계)
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        alert("에피그램이 성공적으로 등록되었습니다! 👌");
        // 폼 초기화 및 목록으로 이동 혹은 새로고침
        window.location.href = "/feed";
      } else if (response.status === 403) {
        alert("권한이 없습니다. 다시 로그인해 주세요.");
        localStorage.removeItem("accessToken"); // 잘못된 토큰 제거
        window.location.href = "/login";
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
          <label>내용 *</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="공유하고 싶은 문장을 입력하세요 (최소 1자)"
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label>저자 *</label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            placeholder="저자 이름을 입력하세요"
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
            placeholder="책 제목, 영화 제목 등"
          />
        </div>

        <div className={styles.inputGroup}>
          <label>출처 URL</label>
          <input
            type="url"
            name="referenceUrl"
            value={formData.referenceUrl}
            onChange={handleChange}
            placeholder="https://example.com"
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
                #{tag}
                <button
                  type="button"
                  onClick={() => removeTag(index)}
                  className={styles.tagDeleteBtn}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        <button type="submit" className={styles.submitBtn} disabled={isLoading}>
          {isLoading ? "등록 중..." : "에피그램 등록하기"}
        </button>
      </form>
    </div>
  );
};

export default CreateEpigram;
