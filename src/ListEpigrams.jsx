import React, { useEffect, useState } from "react";
import styles from "./ListEpigrams.module.css";

const TEAM_ID = "19-8";
const API_URL = `https://fe-project-epigram-api.vercel.app/${TEAM_ID}/epigrams`;

const ListEpigrams = () => {
  const [list, setList] = useState([]); // 문장 목록 저장
  const [totalCount, setTotalCount] = useState(0); // 전체 개수

  // 데이터를 불러오는 함수
  const fetchEpigrams = async () => {
    try {
      const response = await fetch(`${API_URL}?limit=10&page=1`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        // API 응답 구조: { totalCount: number, list: Array }
        setList(data.list);
        setTotalCount(data.totalCount);
      }
    } catch (error) {
      console.error("데이터를 불러오는데 실패했습니다:", error);
    }
  };

  // 컴포넌트가 마운트될 때 실행
  useEffect(() => {
    fetchEpigrams();
  }, []);

  return (
    <div className={styles.container}>
      <h2>최신 에피그램 ({totalCount})</h2>
      <div className={styles.grid}>
        {list.map((item) => (
          <div key={item.id} className={styles.card}>
            <p className={styles.content}>{item.content}</p>
            <p className={styles.author}>- {item.author} -</p>
            <div className={styles.tags}>
              {item.tags?.map((tag) => (
                <span key={tag.id}>#{tag.name}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListEpigrams;
