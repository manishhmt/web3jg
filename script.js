// === GLOBAL STATE ===
let groups = [];

// === DOM ELEMENTS ===
const addGroupBtn = document.getElementById("addGroup");
const urlInput = document.getElementById("urlInput");
const dataArea = document.getElementById("dataArea");
const openUrlsBtn = document.getElementById("openUrls");
const exportDataBtn = document.getElementById("exportData");
const importDataBtn = document.getElementById("importData");
const shareLinkBtn = document.getElementById("shareLink");

// === GROUP HANDLING ===
addGroupBtn.addEventListener("click", () => {
  const input = document.querySelector(".sidebar input[type='text']");
  const name = input.value.trim();
  if (name) {
    groups.push({ name, urls: [] });
    input.value = "";
    alert(`Group "${name}" added!`);
  }
});

// === URL INPUT ===
urlInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const url = urlInput.value.trim();
    if (url) {
      if (groups.length === 0) {
        alert("Create a group first!");
        return;
      }
      groups[groups.length - 1].urls.push(url);
      urlInput.value = "";
      alert("URL added to last group");
    }
  }
});

// === OPEN ALL URLs ===
openUrlsBtn.addEventListener("click", () => {
  groups.forEach(group => {
    group.urls.forEach(url => {
      window.open(url, "_blank");
    });
  });
});

// === EXPORT DATA ===
exportDataBtn.addEventListener("click", () => {
  const json = JSON.stringify(groups, null, 2);
  dataArea.value = json;
});

// === IMPORT DATA ===
importDataBtn.addEventListener("click", () => {
  try {
    const imported = JSON.parse(dataArea.value);
    if (Array.isArray(imported)) {
      groups = imported;
      alert("Data imported successfully!");
    } else {
      alert("Invalid data format.");
    }
  } catch (e) {
    alert("Invalid JSON!");
  }
});

// === SHARE LINK (Optional) ===
shareLinkBtn.addEventListener("click", () => {
  const base = window.location.origin + window.location.pathname;
  const encoded = encodeURIComponent(btoa(JSON.stringify(groups)));
  const shareUrl = `${base}?data=${encoded}`;
  navigator.clipboard.writeText(shareUrl).then(() => {
    alert("Shareable link copied to clipboard!");
  });
});

// === THEME TOGGLE ===
document.getElementById("toggleTheme").addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");
});
