// script.js

// Variables de los coeficientes
let coefficientLeft = 1;
let coefficientRight = 1;

// Ecuaciones químicas predefinidas por nivel de dificultad
const easyEquations = [
  { left: "H2 + O2", right: "H2O" }, // Agua
  { left: "C + O2", right: "CO2" }, // Dióxido de carbono
];

const mediumEquations = [
  { left: "C2H6 + O2", right: "CO2 + H2O" }, // Etano
  { left: "CH4 + O2", right: "CO + H2O" }, // Metano con monóxido de carbono
];

const hardEquations = [
  { left: "C3H8 + O2", right: "CO2 + H2O" }, // Propano
  { left: "C6H12O6 + O2", right: "CO2 + H2O" }, // Glucosa
];

// Selección de dificultad
let currentDifficulty = "easy"; // Inicia con dificultad fácil
let currentEquation = { left: "", right: "" };

// Elementos del DOM
const leftInput = document.getElementById("coefficient-left");
const rightInput = document.getElementById("coefficient-right");
const checkButton = document.getElementById("check-button");
const message = document.getElementById("message");
const helpButton = document.getElementById("help-button");
const instructionsModal = document.getElementById("instructions-modal");
const closeButton = document.getElementById("close-button");
const difficultySelector = document.getElementById("difficulty");
const currentLevel = document.getElementById("current-level");

// Función para generar una ecuación aleatoria
function generateEquation() {
  let equations;

  // Elegir el conjunto de ecuaciones según la dificultad
  if (currentDifficulty === "easy") {
    equations = easyEquations;
    currentLevel.textContent = "Nivel: Fácil";
  } else if (currentDifficulty === "medium") {
    equations = mediumEquations;
    currentLevel.textContent = "Nivel: Medio";
  } else if (currentDifficulty === "hard") {
    equations = hardEquations;
    currentLevel.textContent = "Nivel: Difícil";
  }

  // Elegir una ecuación aleatoria
  const randomIndex = Math.floor(Math.random() * equations.length);
  currentEquation = equations[randomIndex];

  // Mostrar la ecuación en el HTML
  document.getElementById("left-side").textContent = currentEquation.left;
  document.getElementById("right-side").textContent = currentEquation.right;

  // Reiniciar los coeficientes
  leftInput.value = 1;
  rightInput.value = 1;
}

// Función para verificar si la ecuación está balanceada
function checkBalance() {
  coefficientLeft = parseInt(leftInput.value);
  coefficientRight = parseInt(rightInput.value);

  // Verificar si la ecuación está balanceada
  if (
    currentEquation.left === "H2 + O2" &&
    currentEquation.right === "H2O" &&
    coefficientLeft === 2 &&
    coefficientRight === 1
  ) {
    message.textContent = "¡Correcto! La ecuación está balanceada.";
    message.style.color = "green";
    generateEquation(); // Generar una nueva ecuación
  } else if (
    currentEquation.left === "C + O2" &&
    currentEquation.right === "CO2" &&
    coefficientLeft === 1 &&
    coefficientRight === 1
  ) {
    message.textContent = "¡Correcto! La ecuación está balanceada.";
    message.style.color = "green";
    generateEquation(); // Generar una nueva ecuación
  } else {
    message.textContent = "Incorrecto. Intenta de nuevo.";
    message.style.color = "red";
  }
}

// Evento para verificar la respuesta cuando se hace clic en el botón
checkButton.addEventListener("click", checkBalance);

// Mostrar las instrucciones al hacer clic en el botón de ayuda
helpButton.addEventListener("click", function () {
  instructionsModal.style.display = "block";
});

// Cerrar el modal cuando se hace clic en la "X"
closeButton.addEventListener("click", function () {
  instructionsModal.style.display = "none";
});

// Cerrar el modal si se hace clic fuera de él
window.addEventListener("click", function (event) {
  if (event.target === instructionsModal) {
    instructionsModal.style.display = "none";
  }
});

// Cambiar la dificultad cuando el usuario selecciona un nuevo nivel
difficultySelector.addEventListener("change", function () {
  currentDifficulty = difficultySelector.value;
  generateEquation(); // Generar una nueva ecuación con la dificultad seleccionada
});

// Iniciar el juego con una ecuación aleatoria
generateEquation();
