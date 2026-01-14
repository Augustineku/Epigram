import { useState } from "react";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div>
      <input onChange={(e) => setEmail(e.target.value)} value={email} />
      <input onChange={(e) => setPassword(e.target.value)} value={password} />
      <button
        onClick={async () => {
          const res = await fetch(
            "https://fe-project-epigram-api.vercel.app/19-8/auth/signIn",
            {
              body: JSON.stringify({
                email,
                password,
              }),
            }
          );
          // 토큰 저장
        }}
      >
        로그인
      </button>
    </div>
  );
}

export default App;
