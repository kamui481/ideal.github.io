// =============================
// スクロールエフェクトのスクリプト
// =============================

// 要素がビューポートに入ったかどうかをチェック
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return rect.top < window.innerHeight - 100 && rect.bottom >= 0;
}

// スクロールエフェクトを適用する関数
function applyScrollEffect() {
  document.querySelectorAll('.project').forEach(project => {
    if (isInViewport(project)) {
      project.style.opacity = '1';
      project.style.transform = 'translateY(0)';
    }
  });
}

// 初期状態を隠す設定
function initializeProjects() {
  document.querySelectorAll('.project').forEach(project => {
    project.style.opacity = '0';
    project.style.transform = 'translateY(50px)';
    project.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
  });
}

// スクロールイベントに対して requestAnimationFrame を使用
let scrollTimeout;
document.addEventListener('scroll', () => {
  if (!scrollTimeout) {
    scrollTimeout = requestAnimationFrame(() => {
      applyScrollEffect();
      scrollTimeout = null;
    });
  }
});

// 初期設定
initializeProjects();
