/* 基本スタイル */
body {
  font-family: Arial, sans-serif;
  color: #e4e4e4;
  background-color: #222222;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 100vh;
  padding: 20px;
  box-sizing: border-box;
}

#container {
  max-width: 1200px;
  width: 100%;
  padding: 20px;
  background-color: #333333;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
}

/* ヘッダーのスタイル */
header {
  background-color: #444444;
  color: #a4d4a4;
  text-align: center;
  padding: 1.5em;
  border-radius: 10px;
  margin-bottom: 20px;
  font-size: 1.8em;
  font-weight: bold;
  animation: fadeIn 1s ease;
}

/* セクションのスタイル */
section {
  margin-bottom: 20px;
  padding: 1.5em;
  background-color: #2a2a2a;
  color: #e4e4e4;
  border-radius: 8px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease;
}

section:hover {
  transform: translateY(-5px);
}

section h2 {
  color: #4caf50;
  border-bottom: 2px solid #4caf50;
  padding-bottom: 0.3em;
  margin-bottom: 1em;
}

/* ポートフォリオ画像のスタイル */
.portfolio-img {
  display: block;
  max-width: 100%;
  height: auto;
  margin: 0 auto;
  border-radius: 8px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.5);
}

/* リストとテキストスタイルの調整 */
ul {
  list-style-type: disc;
  padding-left: 20px;
  margin: 1em 0;
}

li {
  margin-bottom: 0.5em;
  line-height: 1.5;
}

p, a {
  color: #e4e4e4;
}

a:hover {
  color: #4caf50;
  text-decoration: underline;
}

/* 各プロジェクトカードのスタイル */
.project {
  background-color: #444444;
  padding: 1.2em;
  border-radius: 8px;
  margin-bottom: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.project h3 {
  color: #a4d4a4;
  margin-top: 0;
  font-size: 1.5em;
}

.project p {
  margin: 0.5em 0;
  line-height: 1.5;
}

/* 画像のスタイル */
.project-img {
  width: 100%;
  max-width: 600px;
  height: auto;
  display: block;
  margin: 0 auto 1em;
  border-radius: 8px;
}

/* コード実行エリアのスタイル */
#codeInput {
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  background-color: #2a2a2a;
  color: #e4e4e4;
  border: 1px solid #4caf50;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

button {
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  background-color: #4caf50;
  color: #fff;
  font-size: 1em;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 10px;
}

button:hover {
  background-color: #45a049;
}

/* フッターのスタイル */
footer {
  text-align: center;
  padding: 1em;
  background-color: #444444;
  color: #e4e4e4;
  border-radius: 10px;
}

footer a {
  color: #4caf50;
}
footer a:hover {
  text-decoration: underline;
}

/* レスポンシブデザイン */
@media (max-width: 768px) {
  #container {
    padding: 10px;
  }
  header, section, footer {
    padding: 1em;
  }
  section h2 {
    font-size: 1.4em;
  }
  button {
    font-size: 0.9em;
  }
}

/* アニメーション */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
