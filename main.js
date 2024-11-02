// スクロールエフェクト
document.addEventListener('scroll', () => {
  const projects = document.querySelectorAll('.project');
  projects.forEach(project => {
    const position = project.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    if (position < windowHeight - 100) {
      project.style.opacity = '1';
      project.style.transform = 'translateY(0)';
    }
  });
});

// 初期状態を隠す設定
document.querySelectorAll('.project').forEach(project => {
  project.style.opacity = '0';
  project.style.transform = 'translateY(50px)';
  project.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
});
