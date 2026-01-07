/* IDEA BANK */
const ideaBank = {
  plastic: [
    "Modular storage system from plastic bottles",
    "Vertical garden using plastic containers"
  ],
  paper: [
    "Eco-friendly notebooks from waste paper",
    "Paper-based sustainable packaging"
  ],
  metal: [
    "Lamp stand made from scrap metal",
    "Durable tool holder from metal waste"
  ],
  fabric: [
    "Reusable shopping bag from old clothes",
    "Cushion covers from fabric scraps"
  ],
  glass: [
    "Decorative lamp from glass bottles",
    "Spice jars made from glass waste"
  ]
};

/* STEP ELEMENT REFERENCES */

// Step 1
const step1 =
  document.querySelectorAll(".generate-card")[0]
    .querySelectorAll("input");

// Step 2
const step2 =
  document.querySelectorAll(".generate-card")[1]
    .querySelectorAll("input");

// Step 3 (multi-select)
const step3 =
  document.querySelectorAll(".generate-card")[2]
    .querySelectorAll("input");

/* STEP 1 – SELECT ONE ONLY */
step1.forEach(input => {
  input.addEventListener("change", () => {
    step1.forEach(other => {
      if (other !== input) other.checked = false;
    });
  });
});

/* STEP 2 – SELECT ONE ONLY */
step2.forEach(input => {
  input.addEventListener("change", () => {
    step2.forEach(other => {
      if (other !== input) other.checked = false;
    });
  });
});

/* STEP 3 – MULTI SELECT (NO UNCHECK) */
step3.forEach(input => {
  input.addEventListener("change", generateIdeas);
});

/* GET USER INPUT */
function getProblem() {
  const checked = [...step1].find(i => i.checked);
  return checked ? checked.parentElement.textContent.trim() : null;
}

function getMaterial() {
  const checked = [...step2].find(i => i.checked);
  return checked ? checked.value : null;
}

function getStimulations() {
  return [...step3]
    .filter(i => i.checked)
    .map(i => i.parentElement.textContent.trim());
}

/* STEP 4 – GENERATE IDEAS */
function generateIdeas() {
  if (!ideaContainer) return;

  const problem = getProblem();
  const material = getMaterial();
  const stimulations = getStimulations();

  ideaContainer.innerHTML = "";

  if (!problem || !material) {
    ideaContainer.innerHTML =
      "<p>Please complete Step 1 and Step 2.</p>";
    return;
  }

  const ideas = ideaBank[material];
  window.generatedIdeas = ideas;

  ideas.forEach((idea, index) => {
    const card = document.createElement("div");
    card.className = "idea-card";

    card.innerHTML = `
      <h3>Idea ${index + 1}</h3>
      <p><strong>Concept:</strong> ${idea}</p>
      <p><strong>Material:</strong> ${material}</p>
      <p><strong>Problem:</strong> ${problem}</p>
      ${
        stimulations.length
          ? `<p><strong>Inspired by:</strong> ${stimulations.join(", ")}</p>`
          : ""
      }
    `;

    ideaContainer.appendChild(card);
  });

  renderStep5();
}

/* Step 5: Convergent */
function renderStep5() {
  const step5 =
    document.querySelectorAll(".generate-card")[4];

  if (!window.generatedIdeas) return;

  step5.innerHTML = `
    <span class="step">Step 5</span>
    <h2>Select Best Idea</h2>
    <p>Evaluate and choose ONE idea with the highest potential.</p>

    <div class="idea-select-grid">
      ${window.generatedIdeas
        .map(
          (idea, i) => `
          <div class="select-card" data-idea="${idea}">
            <h3>Idea ${i + 1}</h3>
            <p>${idea}</p>
            <span class="select-tag">Select</span>
          </div>
        `
        )
        .join("")}
    </div>

    <button class="primary-btn" id="confirmIdea">
      Confirm Selection
    </button>
  `;

  enableCardSelection();
}

function enableCardSelection() {
  const cards =
    document.querySelectorAll(".select-card");

  let selectedIdea = null;

  cards.forEach(card => {
    card.addEventListener("click", () => {
      cards.forEach(c => c.classList.remove("selected"));
      card.classList.add("selected");
      selectedIdea = card.dataset.idea;
    });
  });

  document
    .getElementById("confirmIdea")
    .addEventListener("click", () => {
      if (!selectedIdea) {
        alert("Please select one idea.");
        return;
      }

      showSummary(selectedIdea);
    });
}

/* STEP 6 – PROCEED */
function showSummary(finalIdea) {
  const summaryStep =
    document.getElementById("finalStep");

  const summaryText =
    document.getElementById("finalIdea");

  summaryStep.style.display = "block";

  summaryText.innerHTML = `
    <strong>Problem:</strong> ${getProblem()}<br><br>
    <strong>Material:</strong> ${getMaterial()}<br><br>
    <strong>Stimulations Applied:</strong>
    ${getStimulations().join(", ") || "None"}<br><br>
    <strong>Selected Idea:</strong><br>
    ${finalIdea}
  `;

  summaryStep.scrollIntoView({ behavior: "smooth" });
}
