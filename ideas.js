/* UPCYCLING IDEAS PAGE */
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

// FILTER BUTTONS
buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    buttons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    renderIdeaCards(btn.dataset.filter);
  });
});

// INITIAL LOAD
renderIdeaCards("all");