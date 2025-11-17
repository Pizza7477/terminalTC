let currentLesson = "basics"; // "basics" or "enum"

const outputEl = document.getElementById("terminal-output");
const cmdInput = document.getElementById("cmd");

// For normal output lines
function addOutputLine(text = "") {
  const line = document.createElement("div");
  line.className = "line";
  line.innerHTML = text; // allows <span class="command"> etc.
  outputEl.appendChild(line);
  outputEl.scrollTop = outputEl.scrollHeight;
}

// For the student's command line (prompt + command)
function addCommandLine(commandText = "") {
  const line = document.createElement("div");
  line.className = "line";

  const promptSpan = document.createElement("span");
  promptSpan.className = "prompt-inline";
  promptSpan.textContent = "student@practice$";

  const space = document.createTextNode(" ");

  const cmdSpan = document.createElement("span");
  cmdSpan.textContent = commandText;

  line.appendChild(promptSpan);
  line.appendChild(space);
  line.appendChild(cmdSpan);

  outputEl.appendChild(line);
  outputEl.scrollTop = outputEl.scrollHeight;
}

function getActiveCommands() {
  return currentLesson === "basics" ? commandsBasics : commandsEnum;
}

function runCommand(command) {
  const trimmed = command.trim();

  // always show what the student typed
  addCommandLine(trimmed);

  // highlight step in flowchart (if function exists)
  if (typeof highlightStepForCommand === "function") {
    highlightStepForCommand(currentLesson, trimmed);
  }

  if (!trimmed) return;

  const activeCommands = getActiveCommands();

  if (trimmed === "clear") {
    outputEl.innerHTML = "";
    return;
  }

  if (Object.prototype.hasOwnProperty.call(activeCommands, trimmed)) {
    const output = activeCommands[trimmed];
    output.split("\n").forEach(line => addOutputLine(line));
  } else {
    addOutputLine("Command not available in this lesson.");
  }
}

// Handle Enter key
cmdInput.addEventListener("keydown", e => {
  if (e.key === "Enter") {
    const value = cmdInput.value;
    cmdInput.value = "";
    runCommand(value);
  }
});

// Keep focus on input when user clicks anywhere in the app
document.querySelector(".app").addEventListener("click", () => cmdInput.focus());

// ===== Lesson tab switching =====
document.querySelectorAll(".lesson-tab").forEach(btn => {
  btn.addEventListener("click", () => {
    const lesson = btn.dataset.lesson; // "basics" or "enum"
    if (lesson === currentLesson) return;

    currentLesson = lesson;

    // update tab styles
    document.querySelectorAll(".lesson-tab").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    // show correct flow panel
    document.querySelectorAll(".lesson-panel").forEach(panel => {
      panel.classList.toggle("active", panel.dataset.lesson === lesson);
    });

    // clear terminal when changing lesson
    outputEl.innerHTML = "";
    // clear flow highlights
    if (typeof clearFlowHighlights === "function") {
      clearFlowHighlights();
    }
  });
});
