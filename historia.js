// 1) Typing effect da intro
const splashText = document.getElementById('splash-text');
const phrases = [
  "Mary...", 
  "Preparada para máquina do tempo?", 
  "Vamos relembrar juntos cada momento."
];
let pIndex = 0, charIndex = 0;

// digita frase a frase
function type() {
  if (pIndex >= phrases.length) {
    endSplash();
    return;
  }
  const current = phrases[pIndex];
  if (charIndex < current.length) {
    splashText.textContent += current.charAt(charIndex);
    charIndex++;
    setTimeout(type, 100);
  } else {
    // pequena pausa antes da próxima frase
    setTimeout(() => {
      splashText.textContent = "";
      charIndex = 0;
      pIndex++;
      type();
    }, 1000);
  }
}
type();

// 2) fade out do splash e mostrar conteúdo
function endSplash() {
  const splash = document.getElementById('splash');
  splash.style.animation = 'fadeOut 1s forwards';
  splash.addEventListener('animationend', () => {
    splash.remove();
    const main = document.getElementById('main-content');
    main.classList.remove('hidden');
    window.scrollTo({ top: 0 });
    revealMemories();
  });
}

// define keyframes fadeOut via JS
const style = document.createElement('style');
style.innerHTML = `
@keyframes fadeOut {
  to { opacity: 0; visibility: hidden; }
}`;
document.head.appendChild(style);

// 3) revelar cada sessão de memória ao scroll
function revealMemories() {
  const sections = document.querySelectorAll('.memory');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 });

  sections.forEach(sec => io.observe(sec));
}