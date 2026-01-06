// ================================
// CPS DATA STORAGE
// ================================
let cpsIdeas = [];

// ================================
// STEP 1: SAVE PROBLEM
// ================================
const materialSelect = document.getElementById("wasteType");
const problemInput = document.querySelector(".cps-card textarea");

if (materialSelect && problemInput) {
  materialSelect.addEventListener("change", saveProblem);
  problemInput.addEventListener("input", saveProblem);
}

function saveProblem() {
  localStorage.setItem("material", materialSelect.value);
  localStorage.setItem("problem", problemInput.value);
}

// ================================
// STEP 2: SCAMPER IDEA GENERATION
// ================================
const scamperButtons = document.querySelectorAll(".scamper-buttons button");
const ideaList = document.querySelector(".idea-list");

const scamperIdeas = {
  plastic: {
    substitute: "Substitute plastic bottles as plant pots",
    combine: "Combine plastic bottles to create a vertical garden",
    adapt: "Adapt plastic containers as storage organizers",
    modify: "Modify plastic bottles into lamp shades",
    put: "Put plastic bottles to use as watering tools",
    eliminate: "Eliminate bottle caps to create drainage holes",
    reverse: "Reverse bottle position to create hanging planters"
  },
  fabric: {
    substitute: "Substitute plastic bags with fabric bags",
    combine: "Combine fabric waste into patchwork bags",
    adapt: "Adapt old clothes into reusable cloths",
    modify: "Modify fabric into cushion covers",
    put: "Put fabric waste to use as shopping bags",
    eliminate: "Eliminate sleeves to reduce fabric waste",
    reverse: "Reverse jeans into inside-out tote bags"
  }
};

scamperButtons.forEach(button => {
  button.addEventListener("click", () => {
    const material = materialSelect.value;
    const type = button.textContent.toLowerCase().split(" ")[0];

    if (!material) {
      alert("Please select a material first.");
      return;
    }

    const idea =
      scamperIdeas[material]?.[type] ||
      "No idea available for this SCAMPER technique.";

    cpsIdeas.push(idea);
    renderCpsIdeas();
  });
});

function renderCpsIdeas() {
  if (!ideaList) return;
  ideaList.innerHTML = "";
  cpsIdeas.forEach(idea => {
    const li = document.createElement("li");
    li.textContent = idea;
    ideaList.appendChild(li);
  });
}

// ================================
// STEP 3: CONVERGENT THINKING
// ================================
const cpsCards = document.querySelectorAll(".cps-card");
const radiosContainer = cpsCards[2];

function renderRadioIdeas() {
  if (!radiosContainer) return;

  radiosContainer.querySelectorAll(".radio").forEach(r => r.remove());

  cpsIdeas.forEach(idea => {
    const label = document.createElement("label");
    label.className = "radio";
    label.innerHTML = `
      <input type="radio" name="finalIdea" value="${idea}">
      ${idea}
    `;
    radiosContainer.insertBefore(
      label,
      radiosContainer.querySelector("textarea")
    );
  });
}

if (ideaList) {
  const observer = new MutationObserver(renderRadioIdeas);
  observer.observe(ideaList, { childList: true });
}

// ================================
// STEP 4: FINAL SOLUTION DISPLAY
// ================================
const finalTextArea = radiosContainer?.querySelector("textarea");
const finalSection = cpsCards[3];

if (finalTextArea) {
  finalTextArea.addEventListener("input", () => {
    const selected = document.querySelector("input[name='finalIdea']:checked");

    if (selected) {
      finalSection.innerHTML = `
        <span class="step">Step 4</span>
        <h2>Final Solution</h2>
        <p class="cps-desc">Your selected upcycling idea and its sustainability impact.</p>
        <p><strong>Selected Idea:</strong> ${selected.value}</p>
        <p><strong>Improvement:</strong> ${finalTextArea.value}</p>
      `;
    }
  });
}

// ================================
// UPCYCLING IDEAS PAGE (IMAGE + VIDEO LINK)
// ================================
const ideaData = [
  {
    title: "Plastic Bottle Planter",
    material: "plastic",
    desc: "Used plastic bottles can be transformed into decorative plant pots suitable for homes or schools.",
    image: "plastic-planter.jpg",
    video: "https://www.youtube.com/watch?v=IOb0R7tObD0"
  },
  {
    title: "Recycled Paper Desk Organizer",
    material: "paper",
    desc: "Old newspapers and cardboard can be reused to create functional desk organizers.",
    image: "paper-organizer.jpg",
    video: "https://www.youtube.com/watch?v=GC7xMulhq7c"
  },
  {
    title: "Glass Jar Lantern",
    material: "glass",
    desc: "Glass jars can be reused as decorative lanterns for indoor or outdoor use.",
    image: "glass-lantern.jpg",
    video: "https://www.youtube.com/watch?v=_OJ6Hz5vFNY"
  },
  {
    title: "Can Metal Pen Holder",
    material: "metal",
    desc: "Aluminum cans can be redesigned into pen holders and desk accessories.",
    image: "metal-penholder.jpg",
    video: "https://www.youtube.com/watch?v=KU7EbcatJII"
  },
  {
    title: "Fabric Tote Bag",
    material: "fabric",
    desc: "Old clothes and fabric waste can be redesigned into reusable tote bags to reduce plastic usage.",
    image: "fabric-tote.jpg",
    video: "https://www.youtube.com/watch?v=TxfeyP8R9jk"
  }
];

const grid = document.getElementById("ideaGrid");
const buttons = document.querySelectorAll(".filter-btn");

function renderIdeaCards(filter) {
  if (!grid) return;

  grid.innerHTML = "";

  const list =
    filter === "all"
      ? ideaData
      : ideaData.filter(i => i.material === filter);

  list.forEach(idea => {
    grid.innerHTML += `
      <div class="idea-card">
        <div class="idea-text">
          <h3>${idea.title}</h3>
          <span class="material-tag ${idea.material}">
            ${idea.material.toUpperCase()}
          </span>
          <p>${idea.desc}</p>
        </div>

        <a href="${idea.video}" target="_blank" class="idea-image">
          <img src="${idea.image}" alt="${idea.title}">
          <span class="play-icon">▶</span>
        </a>
      </div>
    `;
  });
}

buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    buttons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    renderIdeaCards(btn.dataset.filter);
  });
});

// INITIAL LOAD
renderIdeaCards("all");
