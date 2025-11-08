let questions = []; // Array vacío para las preguntas cargadas del JSON
let current = 0;
let score = 0;
let nombre = "";
let ranking = [];
let answered = false;
let selectedOptionIndex = -1;

// **********************************************
// * FUNCIÓN PRINCIPAL PARA CARGAR EL JSON *
// **********************************************
async function loadQuestionsFromJSON() {
  // RUTA DIRECTA AL ARCHIVO RAW EN GITHUB (Asegúrate de que este nombre y rama sean correctos)
  const jsonUrl = 'https://raw.githubusercontent.com/arkangel75ar/trivia-novia/main/preguntas.json'; 
  
  try {
    const response = await fetch(jsonUrl);
    
    if (!response.ok) {
      throw new Error(`Error HTTP ${response.status} al cargar el JSON desde GitHub. (Verifica que el archivo exista en ${jsonUrl})`);
    }
    
    // Usamos response.json() para parsear los datos directamente
    const rawQuestions = await response.json();
    
    // Transformamos la estructura del JSON al formato que el juego espera
    questions = transformQuestions(rawQuestions);
    
    if (questions.length === 0) {
        throw new Error("El archivo JSON no contiene preguntas válidas.");
    }

    // Ocultar el spinner/mensaje de carga y mostrar el inicio
    document.getElementById("loading-message").classList.add("hidden");
    document.getElementById("inicio").classList.remove("hidden");

  } catch (error) {
    console.error("Fallo al cargar la trivia:", error);
    document.getElementById("loading-message").innerHTML = `
        <i class="fas fa-exclamation-triangle mr-3 text-red-500"></i> Error crítico al cargar: ${error.message}
        <br>Por favor, sube el archivo 'preguntas.json' a tu repositorio.
    `;
    document.getElementById("loading-message").classList.add("text-red-500", "font-bold");
  }
}

// Función para transformar el formato del JSON
function transformQuestions(rawQuestions) {
    // Itera sobre el JSON y crea un nuevo array con la estructura esperada:
    // {question, options: [], answer, penalty}
    return rawQuestions.map(q => ({
        question: q.pregunta,
        options: [q.opcion1, q.opcion2, q.opcion3, q.opcion4],
        answer: q.respuesta, // Ya es un índice numérico
        penalty: q.penalizacion
    }));
}


// **********************************************
// * FUNCIONES DE JUEGO (Sin Cambios) *
// **********************************************

function iniciarJuego() {
  if (questions.length === 0) {
      return alert("Las preguntas aún no han cargado. Intenta de nuevo.");
  }
  const input = document.getElementById("nombreInput");
  nombre = input.value.trim();
  if (nombre === "") return alert("Por favor ingresá tu nombre.");
  document.getElementById("inicio").classList.add("hidden");
  document.getElementById("juego").classList.remove("hidden");
  document.getElementById("jugadora").textContent = `Turno de: ${nombre}`;
  loadQuestion();
}

function loadQuestion() {
  if (current >= questions.length) {
    mostrarFinal();
    return;
  }
  
  const q = questions[current];
  document.getElementById("question").textContent = q.question;
  document.getElementById("options").innerHTML = "";
  document.getElementById("feedback").textContent = "";
  document.getElementById("score").textContent = `Puntaje: ${score}`;
  answered = false;
  selectedOptionIndex = -1;

  q.options.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.classList.add(
      'option-btn', 
      'bg-white', 'hover:bg-pink-50', 'text-gray-700', 'font-medium',
      'py-3', 'px-4', 'rounded-lg', 'shadow-md', 'border', 'border-gray-200',
      'flex', 'items-center', 'text-left', 'transition-all', 'duration-200',
      'focus:outline-none', 'focus:ring-2', 'focus:ring-pink-500'
    );
    btn.dataset.index = i;
    btn.innerHTML = `
      <i class="far fa-circle text-purple-400 text-lg mr-3 option-icon"></i>
      <span class="flex-1">${opt}</span>
    `;
    btn.onclick = () => selectOption(i);
    document.getElementById("options").appendChild(btn);
  });
}

function selectOption(index) {
  if (answered) return;

  // Limpiar selección previa
  document.querySelectorAll('.option-btn').forEach(btn => {
    btn.classList.remove('bg-pink-100', 'border-pink-500', 'text-pink-700', 'scale-105');
    btn.querySelector('.option-icon').classList.remove('fas', 'fa-check-circle', 'text-pink-500');
    btn.querySelector('.option-icon').classList.add('far', 'fa-circle', 'text-purple-400');
  });

  // Marcar nueva selección
  const selectedBtn = document.querySelector(`.option-btn[data-index='${index}']`);
  selectedBtn.classList.add('bg-pink-100', 'border-pink-500', 'text-pink-700', 'scale-105');
  selectedBtn.querySelector('.option-icon').classList.remove('far', 'fa-circle', 'text-purple-400');
  selectedBtn.querySelector('.option-icon').classList.add('fas', 'fa-check-circle', 'text-pink-500');
  
  selectedOptionIndex = index;
  
  // Llamar a checkAnswer inmediatamente al seleccionar
  checkAnswer(index);
}

function checkAnswer(index) {
  if (answered) return;
  const q = questions[current];
  const feedback = document.getElementById("feedback");
  const selectedBtn = document.querySelector(`.option-btn[data-index='${index}']`);

  // Deshabilitar todos los botones después de responder
  document.querySelectorAll('.option-btn').forEach(btn => btn.onclick = null);

  if (index === q.answer) {
    feedback.innerHTML = '<i class="fas fa-check-circle text-green-500 mr-2"></i> ¡Correcto! +1 punto';
    feedback.classList.remove('text-red-500');
    feedback.classList.add('text-green-500');
    selectedBtn.classList.remove('bg-pink-100', 'border-pink-500', 'text-pink-700');
    selectedBtn.classList.add('bg-green-200', 'border-green-500', 'text-green-800');
    selectedBtn.querySelector('.option-icon').classList.remove('fas', 'fa-check-circle');
    selectedBtn.querySelector('.option-icon').classList.add('fas', 'fa-thumbs-up', 'text-green-600');
    score++;
  } else {
    // Mostrar la respuesta correcta
    const correctBtn = document.querySelector(`.option-btn[data-index='${q.answer}']`);
    correctBtn.classList.remove('bg-white', 'border-gray-200', 'text-gray-700');
    correctBtn.classList.add('bg-yellow-200', 'border-yellow-500', 'text-yellow-800');
    correctBtn.querySelector('.option-icon').classList.remove('far', 'fa-circle');
    correctBtn.querySelector('.option-icon').classList.add('fas', 'fa-star', 'text-yellow-600');

    // Marcar la incorrecta seleccionada
    feedback.innerHTML = `<i class="fas fa-times-circle text-red-500 mr-2"></i> Incorrecto. <span class="font-normal block mt-2 text-gray-700">Reto: ${q.penalty}</span>`;
    feedback.classList.remove('text-green-500');
    feedback.classList.add('text-red-500');
    selectedBtn.classList.remove('bg-pink-100', 'border-pink-500', 'text-pink-700');
    selectedBtn.classList.add('bg-red-200', 'border-red-500', 'text-red-800');
    selectedBtn.querySelector('.option-icon').classList.remove('fas', 'fa-check-circle');
    selectedBtn.querySelector('.option-icon').classList.add('fas', 'fa-skull-crossbones', 'text-red-600');
  }
  
  answered = true;
  document.getElementById("score").textContent = `Puntaje: ${score}`;
}

function nextQuestion() {
  if (!answered) {
    return alert("Debes seleccionar una opción antes de pasar a la siguiente pregunta.");
  }
  current++;
  if (current < questions.length) {
    loadQuestion();
  } else {
    mostrarFinal();
  }
}

function mostrarFinal() {
  ranking.push({ nombre, score });
  ranking.sort((a, b) => b.score - a.score);

  document.getElementById("juego").classList.add("hidden");
  document.getElementById("final").classList.remove("hidden");

  let mensaje = "";
  let iconClass = "";
  const maxScore = questions.length || 1; 

  if (score === maxScore) {
    mensaje = "¡Sos la reina absoluta de la trivia!";
    iconClass = "fas fa-crown text-yellow-500";
  } else if (score >= maxScore * 0.75) {
    mensaje = "¡Conocés muy bien a la novia!";
    iconClass = "fas fa-heart text-pink-500";
  } else if (score >= maxScore * 0.5) {
    mensaje = "¡No estuvo mal, pero podés mejorar!";
    iconClass = "fas fa-meh text-yellow-500";
  } else {
    mensaje = "¡Necesitás una charla urgente con la novia!";
    iconClass = "fas fa-dizzy text-red-500";
  }

  document.getElementById("resultadoFinal").innerHTML = `
    <div class="text-3xl font-extrabold text-gray-800 mb-2">
      <i class="${iconClass} mr-2"></i> ${nombre}, tu puntaje fue ${score} de ${maxScore}.
    </div>
    <div class="text-xl text-gray-600 italic">${mensaje}</div>
  `;

  const lista = document.getElementById("ranking");
  lista.innerHTML = "";
  ranking.forEach((p, i) => {
    const li = document.createElement("li");
    li.classList.add("p-2", "border-b", "border-pink-100", "flex", "justify-between", "items-center", "font-semibold");
    
    let rankIcon = '';
    let rankColor = 'text-gray-600';
    if (i === 0) {
      rankIcon = '<i class="fas fa-trophy text-yellow-500 mr-2"></i>';
      rankColor = 'text-yellow-600';
      li.classList.add('bg-yellow-50');
    } else if (i === 1) {
      rankIcon = '<i class="fas fa-medal text-gray-400 mr-2"></i>';
      li.classList.add('bg-gray-50');
    } else if (i === 2) {
      rankIcon = '<i class="fas fa-award text-amber-600 mr-2"></i>';
    }

    li.innerHTML = `
        <span class="${rankColor}">${rankIcon} ${i + 1}. ${p.nombre}</span>
        <span class="font-bold text-purple-600">${p.score} pts</span>
    `;
    lista.appendChild(li);
  });
}

function reiniciar() {
  current = 0;
  score = 0;
  answered = false;
  selectedOptionIndex = -1;
  document.getElementById("nombreInput").value = "";
  document.getElementById("inicio").classList.remove("hidden");
  document.getElementById("juego").classList.add("hidden");
  document.getElementById("final").classList.add("hidden");
}

// Inicia la carga del JSON al cargar el script.
loadQuestionsFromJSON();