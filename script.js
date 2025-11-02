let questions = [];
let current = 0;
let score = 0;
let answered = false;
let ranking = [];

// 🔹 Cargar CSV y parsear
async function loadCSV() {
  try {
    const response = await fetch("preguntas.csv");
    const data = await response.text();

    // Separar líneas y quitar encabezado
    const lines = data.trim().split("\n").slice(1);

    questions = lines.map(line => {
      // Dividir por comas respetando comillas
      const values = line.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g).map(v =>
        v.replace(/^"|"$/g, "")
      );

      return {
        question: values[0],
        options: [values[1], values[2], values[3], values[4]],
        answer: parseInt(values[5]),
        penalty: values[6]
      };
    });

    loadQuestion();
  } catch (err) {
    console.error("Error cargando CSV:", err);
  }
}

function loadQuestion() {
  const q = questions[current];
  document.getElementById("question").textContent = q.question;

  // Ícono genérico (puedes mapear según categoría si querés)
  const iconContainer = document.getElementById("questionIcon");
  iconContainer.innerHTML = `<i class="fas fa-heart text-pink-500 text-6xl"></i>`;

  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";
  q.options.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.className =
      "w-full bg-pink-200 hover:bg-pink-300 text-purple-900 font-semibold py-2 px-4 rounded transition";
    btn.onclick = () => checkAnswer(i);
    optionsDiv.appendChild(btn);
  });

  document.getElementById("score").textContent = `Puntaje: ${score}`;
  document.getElementById("feedback").textContent = "";
  answered = false;
}

function checkAnswer(i) {
  if (answered) return;
  answered = true;

  const q = questions[current];
  const feedback = document.getElementById("feedback");

  if (i === q.answer) {
    score++;
    feedback.textContent = "¡Correcto!";
    feedback.className = "text-green-600 font-bold mt-4";
  } else {
    feedback.textContent = `Incorrecto. ${q.penalty}`;
    feedback.className = "text-red-600 font-bold mt-4";
  }

  document.getElementById("score").textContent = `Puntaje: ${score}`;
}

function nextQuestion() {
  current++;
  if (current < questions.length) {
    loadQuestion();
  } else {
    endGame();
  }
}

function iniciarJuego() {
  const nombre = document.getElementById("nombreInput").value.trim();
  if (!nombre) return;

  document.getElementById("inicio").classList.add("hidden");
  document.getElementById("juego").classList.remove("hidden");
  document.getElementById("jugadora").textContent = `Jugadora: ${nombre}`;

  current = 0;
  score = 0;
  loadCSV();
}

function endGame() {
  document.getElementById("juego").classList.add("hidden");
  document.getElementById("final").classList.remove("hidden");

  const nombre = document.getElementById("jugadora").textContent.replace("Jugadora: ", "");
  ranking.push({ nombre, score });

  ranking.sort((a, b) => b.score - a.score);

  document.getElementById("resultadoFinal").textContent = `Tu puntaje final es ${score}`;
  const rankingList = document.getElementById("ranking");
  rankingList.innerHTML = "";
  ranking.forEach(r => {
    const li = document.createElement("li");
    li.textContent = `${r.nombre}: ${r.score}`;
    rankingList.appendChild(li);
  });
}

function reiniciar() {
  document.getElementById("final").classList.add("hidden");
  document.getElementById("inicio").classList.remove("hidden");
}
