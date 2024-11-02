// =============================
// スライドショーの設定
// =============================

// スライドショー画像のリスト
const slideshowImages = [
  "assets/Paizaレーティング.jpg",
  "assets/S007_結果サマリ.png",
  "assets/S007_問題文.png", // 特別なタイミング
  "assets/S002_結果サマリ.png",
  "assets/S002_問題文.png"  // 特別なタイミング
];

let currentImageIndex = 0;
const slideshowElement = document.getElementById("slideshow-image");
const outputDisplay = document.getElementById('outputDisplay');
let isWaitingForOutputClear = false; // 出力結果が消えるのを待機中かどうか

// スライドショーの画像を切り替える関数
function changeImage() {
  // 現在の画像が3枚目または5枚目の場合、出力結果のクリアを待つ
  if ((currentImageIndex === 2 || currentImageIndex === 4) && !isOutputCleared()) {
    isWaitingForOutputClear = true;
    return; // 出力結果が消えるまで切り替えを待つ
  }

  // 次の画像に切り替え
  currentImageIndex = (currentImageIndex + 1) % slideshowImages.length;
  slideshowElement.src = slideshowImages[currentImageIndex];
  isWaitingForOutputClear = false;
}

// 出力結果がクリアされているかをチェックする関数
function isOutputCleared() {
  return outputDisplay.textContent.trim() === ''; // 出力結果が空ならtrue
}

// 3秒ごとに通常の画像を切り替え
setInterval(() => {
  if (!isWaitingForOutputClear) {
    changeImage();
  }
}, 3000);

// 出力結果がクリアされたときに画像を切り替える
const observer = new MutationObserver(() => {
  if (isWaitingForOutputClear && isOutputCleared()) {
    changeImage(); // 出力結果がクリアされたら画像を切り替え
  }
});

// 出力結果の変化を監視する
observer.observe(outputDisplay, { childList: true, subtree: true });
