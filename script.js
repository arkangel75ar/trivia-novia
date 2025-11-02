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
let nombre = "";
let ranking = [];
let answered = false;
let selectedOptionIndex = -1; // Para rastrear la opción seleccionada

function iniciarJuego() {
  const input = document.getElementById("nombreInput");
  nombre = input.value.trim();
  if (nombre === "") return alert("Por favor ingresá tu nombre.");
  document.getElementById("inicio").classList.add("hidden");
  document.getElementById("juego").classList.remove("hidden");
  document.getElementById("jugadora").textContent = `Turno de: ${nombre}`;
  loadQuestion();
}

function loadQuestion() {
  const q = questions[current];
  document.getElementById("question").textContent = q.question;
  document.getElementById("options").innerHTML = "";
  document.getElementById("feedback").textContent = "";
  document.getElementById("score").textContent = `Puntaje: ${score}`;
  answered = false;
  selectedOptionIndex = -1; // Resetear la selección

  q.options.forEach((opt, i) => {
    const btn = document.createElement("button");
    // Clase inicial de Tailwind para opciones
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
    // Si la persona intenta pasar sin responder, podemos forzar una respuesta o simplemente alertar.
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
  if (score === questions.length) {
    mensaje = "¡Sos la reina absoluta de la trivia!";
    iconClass = "fas fa-crown text-yellow-500";
  } else if (score >= questions.length * 0.75) {
    mensaje = "¡Conocés muy bien a la novia!";
    iconClass = "fas fa-heart text-pink-500";
  } else if (score >= questions.length * 0.5) {
    mensaje = "¡No estuvo mal, pero podés mejorar!";
    iconClass = "fas fa-meh text-yellow-500";
  } else {
    mensaje = "¡Necesitás una charla urgente con la novia!";
    iconClass = "fas fa-dizzy text-red-500";
  }

  document.getElementById("resultadoFinal").innerHTML = `
    <div class="text-3xl font-extrabold text-gray-800 mb-2">
      <i class="${iconClass} mr-2"></i> ${nombre}, tu puntaje fue ${score} de ${questions.length}.
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
