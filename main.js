// PlantUMLサーバーURL
const plantUMLServer = "https://www.plantuml.com/plantuml/svg/";

// 初期のPlantUMLコード（@startumlとタイトルのみを初期設定）
let umlCode = `
@startuml
title キャリアのタイムライン
`;

// PlantUMLのステップごとのコードスニペット
const umlSteps = [
  "|2007年|\nstart\n",
  ":自動車電装会社入社 - システムエンジニア;\n",
  ":カーナビ開発導入プロジェクトに従事;\n",
  ":チームリーダーとして要求定義、要件定義、\\n設計、プログラミング、テストを担当;\n",
  ":業務効率化により工数を20%削減;\n",
  
  "|2010年|\n",
  ":電力会社に転職 - プロジェクトマネージャー;\n",
  ":業務改善およびERP導入プロジェクト;\n",
  ":ERP導入による業務効率化を15%達成;\n",
  ":提案依頼書の作成、要件定義、システム最適化に従事;\\nERP、原子力発電所対策も担当;\n",
  ":プロジェクト期間中、関係者と週次会議を実施し\\nステークホルダー間の調整をリード;\n",

  "|2015年|\n",
  ":ゲーム会社入社 - 統括マネージャー;\n",
  ":新規コンテンツ開発、海外プロジェクト;\n",
  ":年商10億円のコンテンツ推進、マーケティングと経営戦略に携わる;\n",
  ":営業、マーケティングチームと連携し、リスク管理を徹底;\n",

  "|2021年|\n",
  ":映像配信会社に入社 - PMO担当;\n",
  ":大規模映像配信システムの刷新プロジェクト;\n",
  ":進捗管理、課題整理、ベンダーコントロールを担当;\n",
  ":プロジェクト計画を策定し、\\nチーム間のスケジュール調整とリソース割り当てを最適化;\n",

  "|2022年|\n",
  ":医療機関連携開発会社に入社 - プロジェクトマネージャー;\n",
  ":医療機関連携プロジェクト;\n",
  ":医療データの共有とセキュリティの課題解決;\n",
  ":セキュリティ保護、システム設計、進捗管理をリードし、\\n医療データの安全な共有を実現;\n",

  "stop\n@enduml"
];

// アニメーションの速度設定
const animationSpeed = 800; // ミリ秒

// PlantUMLコードをエンコードしてURLを作成
function encodePlantUML(uml) {
  const encoded = plantumlEncoder.encode(uml);
  return `${plantUMLServer}${encoded}`;
}

// PlantUML画像を更新
function updateUMLImage() {
  const imageUrl = encodePlantUML(umlCode);
  document.getElementById("uml-image").src = imageUrl;
}

// ステップごとにPlantUMLコードを追加して画像を更新する
async function animateUMLSequence() {
  for (const step of umlSteps) {
    umlCode += step;  // ステップを追加
    updateUMLImage();  // 画像を更新
    await new Promise(resolve => setTimeout(resolve, animationSpeed)); // 次のステップまで待機
  }
}

// ページ読み込み時にアニメーション開始
document.addEventListener("DOMContentLoaded", () => {
  animateUMLSequence();
});



// =============================
// 自動コード入力・繰り返しテストデモのスクリプト
// =============================

const codeDisplay = document.getElementById('codeDisplay');
const outputDisplay = document.getElementById('outputDisplay');
const testDataDisplay = document.getElementById('testDataDisplay');

// 入力されるコード（途中まで入力されるものを複数設定）
const codeSamples = [
  `import sys\nfrom collections import defaultdict\n\ndef multiply_dict(d, factor):\n    return {k: v * factor for k, v in d.items()}\n\ndef add_dicts(d1, d2):\n    for k in d2:\n        if k in d1:\n            d1[k] += d2[k]\n        else:\n            d1[k] = d2[k}\n`,
  `from collections import deque\n\ndef bfs(maze, start, goal, rows, cols):\n    directions = [(-1, 0), (1, 0), (0, -1), (0, 1)]\n    queue = deque([(start[0], start[1], 0)])\n    visited = set()\n    visited.add((start[0], start[1]))\n\n    while queue:\n        x, y, dist = queue.popleft()\n        if (x, y) == goal:\n            return dist\n`
];

// テストデータの定義
const testCases = [
  { input: "abcdefg10h12(ij2(3k))l9mnop4(3(2(6(qq)r)s5tu)7v5w)x15(yz)", expected: "q 288\nr 24\n..." },
  { input: "10000(10000(10000(2000(ab)500(dz)c200h)2mu3000(fpr)))", expected: "a 2000000000000000\nb 200000..." },
  { input: "4 5\n0 s 0 1\n0 0 1 0\n0 1 1 0\n0 0 1 g\n0 0 0 0", expected: "9" },
  { input: "4 4\n0 s 0 1\n1 0 0 0\n0 1 1 1\n0 0 0 g", expected: "Fail" }
];

let typingIndex = 0;
let testIndex = 0;
let codeIndex = 0;
let demoCount = 0; // デモ表示の回数をカウント
const maxDemos = 2; // 最大表示回数
const typingSpeed = 50; // コード入力の速度

// コードをアニメーションで途中まで表示する関数
function startTypingAnimation() {
  // 表示回数が指定の回数を超えたら停止
  if (demoCount >= maxDemos) {
    console.log("デモ表示が終了しました。"); // デバッグ用メッセージ
    codeDisplay.textContent = '';
    testDataDisplay.textContent = '';
    outputDisplay.textContent = '';
    return;
  }
  codeDisplay.textContent = '';
  outputDisplay.textContent = '';
  testDataDisplay.textContent = '';

  typingIndex = 0;

  function type() {
    if (typingIndex < codeSamples[codeIndex].length) {
      codeDisplay.textContent += codeSamples[codeIndex][typingIndex];
      typingIndex++;
      setTimeout(type, typingSpeed);
    } else {
      displayTestData();
    }
  }
  type();
}

// テストデータを表示し、裏で完全な処理を実行して結果を出力
function displayTestData() {
  const currentTest = testCases[testIndex];
  testDataDisplay.textContent = `入力データ:\n${currentTest.input}`;

  // 完全な処理を模擬して出力
  setTimeout(() => {
    const result = currentTest.expected;
    outputDisplay.innerHTML = `テスト合格:<br>${result.replace(/\n/g, '<br>')}`;

    // 次のテストケース・コードに進む
    testIndex = (testIndex + 1) % testCases.length;
    codeIndex = (codeIndex + 1) % codeSamples.length;
    demoCount++; // デモ表示の回数をカウント

    setTimeout(startTypingAnimation, 3000); // 次のアニメーション開始
  }, 1000);
}

// 初回アニメーション開始
startTypingAnimation();

// =============================
// スライドショーの設定
// =============================

// スライドショーの表示サイズをユーザーが指定
const slideshowWidth = 1400;  // 幅を指定（ピクセル単位）
const slideshowHeight = 450;  // 高さを指定（ピクセル単位）

// スライドショー関連の変数
let slideshowElementGroup1;
let slideshowImageElement;
const slideshowImages = [
  "assets/Paizaレーティング.jpg",
  "assets/S007_結果サマリ.png",
  "assets/S002_結果サマリ.png"
];
let currentImageIndex = 0;
let slideshowRepeatCount = 0;
const maxRepeats = 1; // スライドショーの繰り返し回数

// スライドショーの画像を切り替える関数
function changeImage() {
  // 指定回数繰り返した後、スライドショーを停止して1枚目に固定
  if (slideshowRepeatCount >= maxRepeats) {
    currentImageIndex = 0; // 1枚目の画像に戻す
    slideshowImageElement.src = slideshowImages[currentImageIndex]; // 1枚目に設定
    clearInterval(slideshowInterval); // スライドショーを停止
    console.log("スライドショーを停止しました。1枚目の画像で固定されています。");
    return;
  }

  // 画像を切り替える
  slideshowImageElement.src = slideshowImages[currentImageIndex];
  currentImageIndex = (currentImageIndex + 1) % slideshowImages.length;

  // スライドショーが一巡した場合、繰り返し回数を増やす
  if (currentImageIndex === 0) {
    slideshowRepeatCount++;
    console.log(`スライドショーが一巡しました。現在の繰り返し回数: ${slideshowRepeatCount}`);
  }
}

// DOMの読み込み完了後にスライドショーを初期化
document.addEventListener("DOMContentLoaded", function() {
  slideshowElementGroup1 = document.getElementById("slideshow-group-1");
  slideshowImageElement = slideshowElementGroup1.querySelector("img"); // 最初の画像要素を取得

  if (slideshowElementGroup1 && slideshowImageElement) {
    // スライドショー領域のサイズを固定
    slideshowElementGroup1.style.width = `${slideshowWidth}px`;
    slideshowElementGroup1.style.height = `${slideshowHeight}px`;

    // スライドショー開始
    const slideshowInterval = setInterval(changeImage, 3000);
    console.log("スライドショーを開始します");
  } else {
    console.error("スライドショー要素が見つかりませんでした");
  }
});

// =============================
// slideshow2の設定
// =============================

const slideshowElementGroup2 = document.getElementById("slideshow-group-2");
const slideshowImages2 = [
  "assets/S007_問題文.png",  // 1枚目の画像
  "assets/S002_問題文.png"   // 2枚目の画像
];

let currentImageIndex2 = 0;
let repeatCount2 = 0;
const maxRepeats2 = 1;  // スライドショーの最大繰り返し回数
let slideshowTimeout; // タイマーIDを保存する変数

// slideshow2用の画像を切り替える関数
function changeImage2() {
  if (repeatCount2 >= maxRepeats2) {
    // 指定回数を超えた場合、スライドショーを停止し、非表示にする
    clearTimeout(slideshowTimeout); // タイマーをクリア
    slideshowElementGroup2.style.display = "none"; // slideshow2を非表示にする
    console.log("slideshow2を停止し、非表示にしました。");
    return;
  }

  // 現在の画像を切り替え
  slideshowElementGroup2.querySelector("img").src = slideshowImages2[currentImageIndex2];
  console.log(`slideshow2の現在の画像: ${currentImageIndex2 + 1}枚目`);

  // 画像インデックスの更新（0と1を交互に）
  currentImageIndex2 = (currentImageIndex2 + 1) % slideshowImages2.length;

  // 1枚目 -> 2枚目に切り替える際は9秒、2枚目 -> 1枚目に切り替える際は17秒後に変更
  if (currentImageIndex2 === 0) {
    repeatCount2++;  // 1巡完了とみなして繰り返しカウントを増やす
    slideshowTimeout = setTimeout(changeImage2, 21500); // 2枚目から1枚目に戻るときは17秒待機
  } else {
    slideshowTimeout = setTimeout(changeImage2, 9500); // 1枚目から2枚目に切り替えるときは9秒待機
  }
}

// slideshow2の初期設定
document.addEventListener("DOMContentLoaded", function() {
  if (slideshowElementGroup2) {
    // slideshow2を表示し、1枚目の画像を設定
    slideshowElementGroup2.style.display = "block";
    slideshowElementGroup2.querySelector("img").src = slideshowImages2[0];

    // slideshow2を開始
    slideshowTimeout = setTimeout(changeImage2, 9500);  // 初回は9秒後に2枚目に変更
  } else {
    console.error("slideshow2要素が見つかりませんでした");
  }
});
