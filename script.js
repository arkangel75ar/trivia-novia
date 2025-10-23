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
    question: "¿Qué consejo le daría a alguien que
