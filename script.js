// script.js
const canvas = document.getElementById("map-canvas");
const tooltip = document.getElementById("tooltip");
const sidebar = document.getElementById("sidebar");
const sidebarTitle = document.getElementById("sidebar-title");
const sidebarBody = document.getElementById("sidebar-body");
const closeSidebar = document.getElementById("sidebar-close");
const svg = document.getElementById("line-layer");
let isDragging = false;
let startX = 0;
let startY = 0;
let offsetX = 0;
let offsetY = 0;

const canvasContainer = document.getElementById("canvas-container");

canvasContainer.addEventListener("mousedown", (e) => {
  isDragging = true;
  startX = e.clientX;
  startY = e.clientY;
  canvasContainer.style.cursor = "grabbing";
});

window.addEventListener("mousemove", (e) => {
  if (!isDragging) return;
  const dx = e.clientX - startX;
  const dy = e.clientY - startY;
  offsetX += dx;
  offsetY += dy;
  startX = e.clientX;
  startY = e.clientY;
  document.getElementById("map-canvas").style.transform = `translate(${offsetX}px, ${offsetY}px)`;
  document.getElementById("line-layer").style.transform = `translate(${offsetX}px, ${offsetY}px)`;
});

window.addEventListener("mouseup", () => {
  isDragging = false;
  canvasContainer.style.cursor = "grab";
});


closeSidebar.onclick = () => sidebar.classList.remove("show");

const nodes = [
    { id: "agenda", label: "Agenda", tooltip: "several reasons can explain the contemporary growth of religious and political fake news in India: the rise of Hindutva and Hindu nationalism inspired and/or patronized by the BJP-government is perhaps the most prominent one", info: "The underlying reason driving the spread of fake news.", x: 300, y: 100, className: "node yellow" },
    { id: "thinkTanks", label: "Think Tanks", tooltip: "Organizations shaping public discourse.", info: "Can have specific agendas influencing content creation.", x: 50, y: 100, className: "node blue" },
    { id: "disinfoCreator", label: "Disinformation Creator", tooltip: "Entities generating misleading content.", info: "Includes IT Cells, troll farms, or propaganda machines.", x: 300, y: 200, className: "node blue" },
    { id: "fakeNews", label: "Intentional Fake News", tooltip: "Deliberately crafted false content.", info: "WhatsApp is mostly used for fake news propagation becauseof its instant messaging capacity, easier usability, and wide reach. For example,WhatsApp fake news triggered the Muzaffarnagar Riot in Uttar Pradesh in 2017, eight months before thefederal election, and had both political and religious purposes.", x: 550, y: 200, className: "node yellow" },
    { id: "contentTypeData", label: "Data and Stats", tooltip: "Misrepresented numbers.", info: "E.g. GDP claims, population exaggeration.", x: 750, y: 150, className: "node circle" },
    { id: "contentTypeImages", label: "Images", tooltip: "Doctored or misleading visuals.", info: "Text & photo and text & video are the most-popular fakenews contents. This may have been caused by the changes in users’ content consumption patterns duringthe pandemic: consumption of mostly visual contents in India increased by 61-71%, and social media useincreased by 75%", x: 750, y: 200, className: "node circle" },
    { id: "contentTypeText", label: "Text", tooltip: "Fake quotes, articles.", info: "Misattributed statements, slogans.", x: 750, y: 250, className: "node circle" },
    { id: "contentTypeVideo", label: "Video", tooltip: "Edited or falsely subtitled videos.", info: "Used to provoke emotion.", x: 750, y: 300, className: "node circle" },
    { id: "info", label: "Information", tooltip: "What viewers consume.", info: "Can be true, partially true, or completely false.", x: 900, y: 300, className: "node" },
    { id: "mediaLiteracy", label: "Media Literacy", tooltip: "Skill to verify and interpret media.", info: "Helps evaluate facts and resist manipulation.", x: 900, y: 100, className: "node yellow" },
    { id: "evaluationFacts", label: "Evaluation of Facts", tooltip: "Critical assessment of information.", info: "Involves checking sources and evidence.", x: 1100, y: 100, className: "node yellow" },
    { id: "truthiness", label: "Truthiness", tooltip: "regardless of whether there is intent to mislead", info: "Built through repetition and emotion.", x: 1100, y: 300, className: "node yellow" },
    { id: "viewer", label: "Viewer", tooltip: "Receives and interprets content.", info: "Can become a spreader or a skeptic.", x: 1300, y: 200, className: "node blue" },
    { id: "propagator", label: "Propagator", tooltip: "Spreads information further.", info: "Reposts or shares misinformation.", x: 1400, y: 300, className: "node blue" },
    { id: "misinfo", label: "Misinformation", tooltip: "False info shared unknowingly.", info: "Disinformation Example: Modi claimed demonetization would curb black money, reduce inflation, and disrupt the “parallel economy.Reality: These claims were unsupported by empirical data and contradicted economic trends. Growth in industrial production had already declined prior to demonetization, and its economic effects hurt small traders, women, elderly, and farmers​. Post-truth framing: Modi’s New Year 2016 speech was packed with half-truths and announcements framed emotionally to deflect attention from the failures of the policy.", x: 1600, y: 250, className: "node blue" },
    { id: "disinfo", label: "Disinformation", tooltip: "False info shared with intent.", info: "The BJP and its allied Hindutva organizations propagated the notion that Muslim men were seducing Hindu women with the aim of converting them to Islam. This narrative began in 2009 with a Kerala High Court comment and quickly gained traction.", x: 1600, y: 350, className: "node blue" },
    { id: "endFakeNews", label: "End of Fake News", tooltip: "Goal: informed viewer.", info: "Possible through education and awareness.", x: 1400, y: 100, className: "node green" },
    { id: "postTruth", label: "Post-Truth", tooltip: "Political debates are no longer based on any truth or factual accuracy, but on “post-truth”, whereby truth is simply abandoned as a shared ground whereon opinions should successively be constructed.", info: "The 31 December 2016 address to the nation by Narendra Modi was a classic case of Post-truth. The 45-minute speech, delivered first in Hindi and then in English, was filled with half-truths that were clearly aimed at assuaging the huge hardships that had been caused to virtually each and every citizen of the country by his arbitrary and suddendecision to cancel the legal tender status of high-denomination currency notes on 8 November.", x: 950, y: 500, className: "node yellow" },
    { id: "evaluationEmotions", label: "Evaluation of Emotions", tooltip: "Emotional response influencing belief.", info: "Feelings can override logical assessment.", x: 1100, y: 500, className: "node yellow" },
    { id: "emotions", label: "Emotions", tooltip: "Anger, pride, fear.", info: "Manipulated to bypass logic.", x: 800, y: 650, className: "node yellow" },
    { id: "biases", label: "Biases", tooltip: "Cognitive tendencies.", info: "E.g. confirmation bias.", x: 800, y: 600, className: "node yellow" },
    { id: "mediaAccess", label: "Rapid IT Development", tooltip: "Mobile + internet boom.", info: "Access without literacy fuels spread.", x: 600, y: 100, className: "node" },
    { id: "lowEducation", label: "Insufficient Media Education", tooltip: "A systematic delivery of media (and information) literacy, even in its basic critical pedagogic form, has eluded India’s schools and colleges. On the contrary, vested groups have usurped the space.", info: "Thousands of WhatsApp groups routinely campaign during elections for the ruling BJP and for its extreme-right ideological parent, the RSS.", x: 600, y: 50, className: "node" },
    { id: "newsSource", label: "News", tooltip: "Traditional and digital news outlets.", info: "Can be a source of both accurate and inaccurate information.", x: 250, y: 455, className: "node" },
    { id: "intent", label: "Intent", tooltip: "Underlying purpose or motivation.", info: "Can be malicious, political, or financial.", x: 600, y: 450, className: "node yellow" },
    { id: "newsChannels", label: "News Channels", tooltip: "TV, online news platforms.", info: "Jaffrelot and Verniers (2020) write: “Republic TV, Times Now and Zee TV, among many other channels, regularly spread pieces of (dis)information that echoed to a large extent the social media handled by the BJP IT Cell", x: 700, y: 400, className: "node blue" },
    { id: "socialMedia", label: "Social Media Platforms", tooltip: "Facebook, Twitter, etc.", info: "Facilitate rapid and wide dissemination.", x: 700, y: 450, className: "node blue" },
    { id: "immediateAssociates", label: "Viewers are less likely to challenge information if it comes from their elders or family members", tooltip: "Friends, family, colleagues.", info: "Personal networks influence belief.", x: 700, y: 500, className: "node blue" },
    { id: "Data", label: "Data and Stats", tooltip: "Misrepresented numbers.", info: "E.g. GDP claims, population exaggeration.", x: 50, y: 350, className: "node" },
    { id: "Images", label: "Images", tooltip: "Doctored or misleading visuals.", info: "Photos used out of context.", x: 50, y: 420, className: "node" },
    { id: "Text", label: "Text", tooltip: "Fake quotes, articles.", info: "Misattributed statements, slogans.", x: 50, y: 490, className: "node" },
    { id: "Video", label: "Video", tooltip: "Edited or falsely subtitled videos.", info: "Used to provoke emotion.", x: 50, y: 560, className: "node" },
];

const edges = [
    ["agenda", "disinfoCreator"],
    ["thinkTanks", "agenda"],
    ["disinfoCreator", "fakeNews"],
    ["fakeNews", "contentTypeData"],
    ["fakeNews", "contentTypeImages"],
    ["fakeNews", "contentTypeText"],
    ["fakeNews", "contentTypeVideo"],
    ["contentTypeData", "info"],
    ["contentTypeImages", "info"],
    ["contentTypeText", "info"],
    ["contentTypeVideo", "info"],
    ["Data", "newsSource"],
    ["Images", "newsSource"],
    ["Video", "newsSource"],
    ["Text", "newsSource"],
    ["newsSource", "disinfoCreator"],
    ["newsSource", "intent"],
    ["info", "truthiness"],
    ["mediaLiteracy", "evaluationFacts"],
    ["evaluationFacts", "truthiness"],
    ["truthiness", "viewer"],
    ["truthiness", "propagator"],
    ["viewer", "endFakeNews"],
    ["propagator", "misinfo"],
    ["propagator", "disinfo"],
    ["biases", "postTruth"],
    ["emotions", "postTruth"],
    ["postTruth", "evaluationEmotions"],
    ["evaluationEmotions", "truthiness"],
    ["mediaAccess", "mediaLiteracy"],
    ["lowEducation", "mediaLiteracy"],
    ["intent", "newsChannels"],
    ["intent", "socialMedia"],
    ["intent", "immediateAssociates"],
    ["newsChannels", "info"], // Implicit "Source"
    ["socialMedia", "info"],   // Implicit "Source"
    ["immediateAssociates", "info"] // Implicit "Source"
];

const nodeMap = {};
nodes.forEach((node) => {
  const el = document.createElement("div");
  el.className = node.className;
  el.innerText = node.label;
  el.style.left = `${node.x}px`;
  el.style.top = `${node.y}px`;

  el.onmouseover = (e) => {
    tooltip.innerText = node.tooltip;
    tooltip.style.left = `${e.pageX + 15}px`;
    tooltip.style.top = `${e.pageY + 15}px`;
    tooltip.classList.remove("hidden");
  };
  el.onmouseleave = () => tooltip.classList.add("hidden");

  el.onclick = () => {
    sidebarTitle.innerText = node.label;
    sidebarBody.innerText = node.info;
    sidebar.classList.add("show");
  };

  canvas.appendChild(el);
  nodeMap[node.id] = node;
});

function drawLines() {
    svg.innerHTML = "";

    edges.forEach(([fromId, toId]) => {
        const from = nodeMap[fromId];
        const to = nodeMap[toId];

        // Calculate start and end points, adjusting for node size/shape
        const fromX = from.x + (from.className.includes('circle') ? 30 : 75);
        const fromY = from.y + (from.className.includes('circle') ? 30 : 25);
        const toX = to.x + (to.className.includes('circle') ? 30 : 15);
        const toY = to.y + (to.className.includes('circle') ? 30 : 25);

        // Calculate midpoint
        const midX = (fromX + toX) / 2;
        const midY = (fromY + toY) / 2;

        // Calculate angle for arrowhead orientation
        const angle = Math.atan2(toY - fromY, toX - fromX) * 180 / Math.PI;

        // Draw the main line (without arrowhead)
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", fromX);
        line.setAttribute("y1", fromY);
        line.setAttribute("x2", toX);
        line.setAttribute("y2", toY);
        line.setAttribute("stroke", "#888");
        line.setAttribute("stroke-width", "1.5");
        svg.appendChild(line);

        // Create the arrowhead as a path
        const arrowheadSize = 8;
        const arrowhead = document.createElementNS("http://www.w3.org/2000/svg", "path");
        const pathStr = `M -${arrowheadSize / 2} -${arrowheadSize / 3} L ${arrowheadSize / 2} 0 L -${arrowheadSize / 2} ${arrowheadSize / 3} z`;
        arrowhead.setAttribute("d", pathStr);
        arrowhead.setAttribute("fill", "#888");
        arrowhead.setAttribute("transform", `translate(${midX}, ${midY}) rotate(${angle})`);
        svg.appendChild(arrowhead);
    });
}

window.onload = drawLines;
