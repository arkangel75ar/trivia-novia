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
  {
    question: "¿Quién fue su peor cita y por qué?",
    options: ["El que habló solo de sí mismo", "El que llegó tarde", "El que olvidó su nombre", "El que trajo a su mamá"],
    answer: 3,
    penalty: "¡Cuenta tu peor cita en 30 segundos!"
  },
  {
    question: "¿Qué canción no puede faltar en su playlist de fiesta?",
    options: ["'Single Ladies'", "'Despacito'", "'Tusa'", "'Livin' la Vida Loca'"],
    answer: 2,
    penalty: "¡Baila 30 segundos sin música!"
  },
  {
    question: "¿Cuál es su bebida favorita para celebrar?",
    options: ["Champagne", "Margarita", "Fernet con cola", "Gin tonic"],
    answer: 2,
    penalty: "¡Brinda con una bebida inventada por el grupo!"
  },
  {
    question: "¿Qué prenda nunca usaría en su luna de miel?",
    options: ["Pijama de franela", "Crocs", "Camisa de su ex", "Medias con agujeros"],
    answer: 0,
    penalty: "¡Haz un desfile con ropa ridícula!"
  },
  {
    question: "¿Qué parte de la boda le emociona más?",
    options: ["La entrada", "El vals", "La comida", "La noche de bodas"],
    answer: 0,
    penalty: "¡Haz una entrada triunfal al estilo telenovela!"
  },
  {
    question: "¿Cuál es su apodo más vergonzoso?",
    options: ["Chanchita", "Bubu", "Pochi", "Tortuguita"],
    answer: 3,
    penalty: "¡Camina como tortuga por 1 minuto!"
  },
  {
    question: "¿Qué hábito extraño tiene al dormir?",
    options: ["Habla dormida", "Abraza una almohada", "Ronca como oso", "Duerme con los ojos entreabiertos"],
    answer: 2,
    penalty: "¡Haz el sonido de un animal dormido!"
  },
  {
    question: "¿Qué haría si se pierde el vestido de novia el día antes?",
    options: ["Llora sin parar", "Improvisa con cortinas", "Se casa en pijama", "Lo busca por toda la ciudad"],
    answer: 1,
    penalty: "¡Haz un desfile con papel higiénico!"
  },
  {
    question: "¿Qué celebridad elegiría para una noche de pasión?",
    options: ["Ryan Gosling", "Maluma", "Brad Pitt", "Pedro Pascal"],
    answer: 3,
    penalty: "¡Haz una mirada seductora a la cámara imaginaria!"
  },
  {
    question: "¿Qué es lo primero que haría si se despierta siendo hombre?",
    options: ["Se mira al espejo", "Va al baño", "Se toma selfies", "Se prueba ropa masculina"],
    answer: 0,
    penalty: "¡Actúa como hombre por 1 minuto!"
  },
  {
    question: "¿Qué objeto no puede faltar en su bolso?",
    options: ["Labial", "Perfume", "Snacks", "Cepillo de pelo"],
    answer: 0,
    penalty: "¡Maquíllate sin espejo!"
  },
  {
    question: "¿Cuál es su fantasía romántica más secreta?",
    options: ["Bajo la lluvia", "En la playa", "En un avión", "En una biblioteca"],
    answer: 1,
    penalty: "¡Haz una escena romántica con sombrero playero!"
  },
  {
    question: "¿Qué haría si se encuentra a su ex en la luna de miel?",
    options: ["Lo ignora", "Lo saluda con cortesía", "Le presume su felicidad", "Se va del lugar"],
    answer: 2,
    penalty: "¡Presume tu felicidad con una pose triunfal!"
  },
  {
    question: "¿Qué parte del cuerpo le gusta más de su pareja?",
    options: ["Ojos", "Manos", "Espalda", "Sonrisa"],
    answer: 3,
    penalty: "¡Haz tu mejor sonrisa falsa!"
  },
  {
    question: "¿Qué película romántica la hace llorar siempre?",
    options: ["Titanic", "El diario de una pasión", "Ghost", "Bajo la misma estrella"],
    answer: 1,
    penalty: "¡Actúa una escena triste con dramatismo!"
  },
  {
    question: "¿Qué haría si se le olvida el nombre de su esposo en el altar?",
    options: ["Lo inventa", "Lo llama 'amor'", "Se ríe nerviosa", "Se desmaya"],
    answer: 1,
    penalty: "¡Haz una escena de boda improvisada!"
  },
  {
    question: "¿Qué haría si su suegra se aparece en la noche de bodas?",
    options: ["La echa con cariño", "La invita a quedarse", "Finge estar dormida", "Se escapa por la ventana"],
    answer: 0,
    penalty: "¡Haz una escena de telenovela con suegra invasora!"
  },
  {
    question: "¿Qué consejo le daría a alguien que está por casarse?",
    options: ["Ten paciencia", "Ríe mucho", "No olvides tu esencia", "Hazlo solo si estás segura"],
    answer: 2,
    penalty: "¡Da un consejo sabio con voz de gurú!"
  }
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
