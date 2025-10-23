const questions = [
  {
    question: "¿Cuál fue el primer amor platónico de la novia?",
    options: ["Un profesor", "Un actor famoso", "Un vecino", "Un cantante pop"],
    answer: 1,
    penalty: "¡Haz una imitación dramática de una escena romántica!"
  },
  {
    question: "¿Qué es lo más loco que ha hecho por amor?",
    options: ["Viajar sin avisar", "Tatuarse iniciales", "Escribir una canción", "Llamar 100 veces en un día"],
    answer: 0,
    penalty: "¡Haz una declaración de amor a una silla!"
  },
  // ... (agregá las otras 18 preguntas aquí)
];

let current = 0;
let score = 0;
let answered = false;

function loadQuestion() {
  const card = document.getElementById("card");
  const questionEl = document.getElementById("question");
  const optionsEl = document.getElementById("options");
  const feedbackEl = document.getElementById("feedback");
  const scoreEl = document.getElementById("score");

  card.classList.remove("show");
  setTimeout(() => {
    card.classList.add("show");
  }, 100);

  const q = questions[current];
  questionEl.textContent = q.question;
  optionsEl.innerHTML = "";
  feedbackEl.textContent = "";
  answered = false;
  scoreEl.textContent = `Puntaje: ${score}`;

  q.options.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.onclick = () => checkAnswer(i);
    optionsEl.appendChild(btn);
  });
}

function checkAnswer(index) {
  if (answered) return;
  const feedback = document.getElementById("feedback");
  const q = questions[current];
  if (index === q.answer) {
    feedback.textContent = "✅ ¡Correcto!";
    feedback.style.color = "green";
    score++;
  } else {
    feedback.textContent = `❌ Incorrecto. Reto: ${q.penalty}`;
    feedback.style.color = "red";
  }
  answered = true;
  document.getElementById("score").textContent = `Puntaje: ${score}`;
}

function nextQuestion() {
  current++;
  if (current < questions.length) {
    loadQuestion();
  } else {
    showFinalScore();
  }
}

function showFinalScore() {
  let mensaje = "";
  if (score === questions.length) {
    mensaje = "👑 ¡Sos la reina absoluta de la trivia!";
  } else if (score >= questions.length * 0.75) {
    mensaje = "💖 ¡Conocés muy bien a la novia!";
  } else if (score >= questions.length * 0.5) {
    mensaje = "😅 ¡No estuvo mal, pero podés mejorar!";
  } else {
    mensaje = "😂 ¡Necesitás una charla urgente con la novia!";
  }

  document.getElementById("card").innerHTML = `
    <h2>🎉 ¡Juego terminado!</h2>
    <p class="final">Tu puntaje fue: ${score} de ${questions.length}</p>
    <p class="final">${mensaje}</p>
    <button class="next-btn" onclick="restartGame()">Volver a jugar</button>
  `;
}

function restartGame() {
  current = 0;
  score = 0;
  loadQuestion();
}

window.onload = loadQuestion;
