// Intro: sequência de frases para o splash
const messages = [
  'Há quase 4 anos você apareceu na minha vida, Duda...',
  'Mary de cabelos azuis, tão linda e distante.',
  'Eu, seu Peter nervoso, sonhando em te chamar para conversar.',
  'Hoje somos quase 4 anos de amor, e aventuras juntos.',
  'Clique para começar nosso mundo juntos 🕷️❤️'
];

let idx = 0;
const introEl = document.getElementById('intro');
const textEl  = document.getElementById('intro-text');

function typeWriter() {
  const text = messages[idx];
  textEl.textContent = '';
  textEl.style.animation = 'none';
  void textEl.offsetWidth; // reset animation

  // digitação
  textEl.textContent = text;
  textEl.style.maxWidth = '0';
  textEl.style.animation = `typing ${Math.max(2, text.length/10)}s steps(${text.length}) forwards, blink 0.75s step-end infinite ${Math.max(2, text.length/10)}s`;

  // aguarda digitar + pausa antes de próxima
  const totalTime = Math.max(2, text.length/10)*1000 + 1500;
  setTimeout(() => {
    idx++;
    if (idx < messages.length) {
      typeWriter();
    } else {
      // última frase: aguarda clique para sair
      introEl.addEventListener('click', () => {
        introEl.classList.add('fade-out');
      });
    }
  }, totalTime);
}

// ao carregar, começa a intro
window.addEventListener('load', () => {
  typeWriter();
  // depois do fade, libera o nav e main
  introEl.addEventListener('animationend', (e) => {
    if (e.animationName === 'fadeOut') {
      document.body.classList.add('loaded');
    }
  });
});

// Troca de abas
const tabs = document.querySelectorAll('.nav-links li');
const contents = document.querySelectorAll('.tab-content');
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    contents.forEach(c => c.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById(tab.dataset.tab).classList.add('active');
  });
});

// Joguinho de flip cards
const cards = document.querySelectorAll('.game-card');
const resetBtn = document.getElementById('resetGame');

cards.forEach(card => {
  card.addEventListener('click', () => {
    if (!card.classList.contains('flipped')) {
      card.classList.add('flipped');
    }
  });
});
resetBtn.addEventListener('click', () => {
  cards.forEach(c => c.classList.remove('flipped'));
});