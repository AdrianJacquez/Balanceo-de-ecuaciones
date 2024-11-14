// script.js
const ecuaciones = {
  easy: [
    {
      reactivos: "C + O2",
      productos: "CO2",
      coeficientes: { C: 1, O2: 1, CO2: 1 },
    },
    {
      reactivos: "H2 + O2",
      productos: "H2O",
      coeficientes: { H2: 2, O2: 1, H2O: 2 },
    },
    {
      reactivos: "N2 + H2",
      productos: "NH3",
      coeficientes: { N2: 1, H2: 3, NH3: 2 },
    },
    {
      reactivos: "C4H10 + O2",
      productos: "CO2 + H2O",
      coeficientes: { C4H10: 2, O2: 13, CO2: 8, H2O: 10 },
    },
    {
      reactivos: "Na + Cl2",
      productos: "NaCl",
      coeficientes: { Na: 2, Cl2: 1, NaCl: 2 },
    },
    {
      reactivos: "Fe + O2",
      productos: "Fe2O3",
      coeficientes: { Fe: 4, O2: 3, Fe2O3: 2 },
    },
  ],
  medium: [
    {
      reactivos: "C2H6 + O2",
      productos: "CO2 + H2O",
      coeficientes: { C2H6: 2, O2: 7, CO2: 4, H2O: 6 },
    },
    {
      reactivos: "CH4 + O2",
      productos: "CO + H2O",
      coeficientes: { CH4: 1, O2: 2, CO: 1, H2O: 2 },
    },
    {
      reactivos: "C3H8 + O2",
      productos: "CO2 + H2O",
      coeficientes: { C3H8: 1, O2: 5, CO2: 3, H2O: 4 },
    },
    {
      reactivos: "C6H12O6 + O2",
      productos: "CO2 + H2O",
      coeficientes: { C6H12O6: 1, O2: 6, CO2: 6, H2O: 6 },
    },
  ],
  hard: [
    {
      reactivos: "C4H10 + O2",
      productos: "CO2 + H2O",
      coeficientes: { C4H10: 2, O2: 13, CO2: 8, H2O: 10 },
    },
    {
      reactivos: "C2H5OH + O2",
      productos: "CO2 + H2O",
      coeficientes: { C2H5OH: 1, O2: 3, CO2: 2, H2O: 3 },
    },
  ],
};

let currentEquation = null;
let currentDifficulty = "easy";

document.getElementById("difficulty").addEventListener("change", (e) => {
  currentDifficulty = e.target.value;
});

document.getElementById("startBtn").addEventListener("click", () => {
  loadNewEquation();
});

document
  .getElementById("checkAnswerBtn")
  .addEventListener("click", checkAnswer);

document
  .getElementById("nextEquationBtn")
  .addEventListener("click", loadNewEquation);

function loadNewEquation() {
  const equations = ecuaciones[currentDifficulty];
  currentEquation = equations[Math.floor(Math.random() * equations.length)];

  displayEquation(currentEquation);
  generateInputFields(currentEquation);
}

function displayEquation(equation) {
  document.getElementById(
    "equation"
  ).textContent = `${equation.reactivos} → ${equation.productos}`;
}

function generateInputFields(equation) {
  const inputFieldsContainer = document.getElementById("input-fields");
  inputFieldsContainer.innerHTML = ""; // Limpiar los campos existentes

  const reactivos = equation.reactivos.split(" + ");
  const productos = equation.productos.split(" + ");

  const totalCompounds = [...reactivos, ...productos];

  totalCompounds.forEach((compound, index) => {
    const input = document.createElement("input");
    input.placeholder = `Coef. ${compound}`;
    input.id = `input-${index}`;
    input.type = "number";
    input.min = 1;
    input.value = 1; // Inicialmente a 1
    inputFieldsContainer.appendChild(input);
  });
}

function checkAnswer() {
  const inputs = document.querySelectorAll("input");
  let correct = true;

  inputs.forEach((input, index) => {
    const compound = input.id.split("-")[1];
    const compoundName = Object.keys(currentEquation.coeficientes)[index];
    if (parseInt(input.value) !== currentEquation.coeficientes[compoundName]) {
      correct = false;
    }
  });

  if (correct) {
    document.getElementById("result").textContent = "¡Respuesta Correcta!";
  } else {
    document.getElementById("result").textContent =
      "Respuesta Incorrecta, intenta de nuevo.";
  }
}
