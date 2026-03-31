let data = JSON.parse(localStorage.getItem("notepadData")) || {
  files: []
};

let currentFile = null;
let currentChapter = null;

function save() {
  localStorage.setItem("notepadData", JSON.stringify(data));
}

function updateEditorVisibility() {
  const editor = document.getElementById("editor");

  if (!currentFile || !currentChapter) {
    editor.style.display = "none";
  } else {
    editor.style.display = "block";
  }
}

/* 🗑 DELETE FILE */
function deleteFile(fileId) {
  if (!confirm("Delete this file?")) return;

  data.files = data.files.filter(f => f.id !== fileId);

  if (currentFile && currentFile.id === fileId) {
    currentFile = null;
    currentChapter = null;
  }

  save();
  renderFiles();
  renderChapters();
  updateEditorVisibility();
}

/* 🗑 DELETE CHAPTER */
function deleteChapter(chapterId) {
  if (!confirm("Delete this chapter?")) return;

  currentFile.chapters = currentFile.chapters.filter(c => c.id !== chapterId);

  if (currentChapter && currentChapter.id === chapterId) {
    currentChapter = null;
  }

  save();
  renderChapters();
  updateEditorVisibility();
}

function createFile() {
  const name = prompt("File name?");
  if (!name) return;

  const file = {
    id: Date.now(),
    name,
    chapters: []
  };

  data.files.push(file);
  save();
  renderFiles();
}

function createChapter() {
  if (!currentFile) return;

  const name = prompt("Chapter name?");
  if (!name) return;

  const chapter = {
    id: Date.now(),
    name,
    content: ""
  };

  currentFile.chapters.push(chapter);
  save();
  renderChapters();
}

function selectFile(fileId) {
  currentFile = data.files.find(f => f.id === fileId);
  currentChapter = null;

  renderFiles();
  renderChapters();

  document.getElementById("editor").value = "";

  updateEditorVisibility();
}

function selectChapter(chapterId) {
  currentChapter = currentFile.chapters.find(c => c.id === chapterId);

  renderChapters();

  document.getElementById("editor").value = currentChapter.content;

  updateEditorVisibility();
}

/* 🔹 FILE UI */
function renderFiles() {
  const bar = document.getElementById("filesBar");
  bar.innerHTML = "";

  data.files.forEach(file => {
    const wrapper = document.createElement("div");
    wrapper.style.display = "flex";
    wrapper.style.alignItems = "center";
    wrapper.style.gap = "3px";

    const btn = document.createElement("button");
    btn.textContent = file.name;

    if (currentFile && currentFile.id === file.id) {
      btn.classList.add("active");
    }

    btn.onclick = () => selectFile(file.id);

    const del = document.createElement("button");
    del.textContent = "×";
    del.style.background = "red";
    del.style.color = "white";
    del.onclick = (e) => {
      e.stopPropagation();
      deleteFile(file.id);
    };

    wrapper.appendChild(btn);
    wrapper.appendChild(del);
    bar.appendChild(wrapper);
  });

  const addBtn = document.createElement("button");
  addBtn.textContent = "+ File";
  addBtn.onclick = createFile;
  bar.appendChild(addBtn);
}

/* 🔹 CHAPTER UI */
function renderChapters() {
  const bar = document.getElementById("chaptersBar");
  bar.innerHTML = "";

  if (!currentFile) return;

  currentFile.chapters.forEach(ch => {
    const wrapper = document.createElement("div");
    wrapper.style.display = "flex";
    wrapper.style.alignItems = "center";
    wrapper.style.gap = "3px";

    const btn = document.createElement("button");
    btn.textContent = ch.name;

    if (currentChapter && currentChapter.id === ch.id) {
      btn.classList.add("active");
    }

    btn.onclick = () => selectChapter(ch.id);

    const del = document.createElement("button");
    del.textContent = "×";
    del.style.background = "red";
    del.style.color = "white";
    del.onclick = (e) => {
      e.stopPropagation();
      deleteChapter(ch.id);
    };

    wrapper.appendChild(btn);
    wrapper.appendChild(del);
    bar.appendChild(wrapper);
  });

  const addBtn = document.createElement("button");
  addBtn.textContent = "+ Chapter";
  addBtn.onclick = createChapter;
  bar.appendChild(addBtn);
}

const typeSoundFile = "type-sound.mp3";   // normal keys
const enterSoundFile = "enter-sound.mp3"; // Enter key

document.getElementById("editor").addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    // Play Enter sound
    const enterSound = new Audio(enterSoundFile);
    enterSound.volume = 1;
    enterSound.play();
  } else if (e.key.length === 1) {
    // Play normal key sound
    const keySound = new Audio(typeSoundFile);
    keySound.volume = 1;
    keySound.play();
  }
});

// Auto-save typing
document.getElementById("editor").addEventListener("input", (e) => {
  if (!currentChapter) return;
  currentChapter.content = e.target.value;
  save();
});

// Init
renderFiles();
renderChapters();
updateEditorVisibility();