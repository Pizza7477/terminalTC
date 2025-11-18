// Map commands to steps for each lesson

// Lesson 1: Basics
const stepByCommandBasics = {
  pwd: "where",
  ls: "list",
  "ls -l": "details",
  "cd Downloads": "move",
  "cat readmePLZ.txt": "read",
  id: "who",
  "unzip important.txt": "unzip",
  "wc -w hackme.txt": "wc",
};

// Lesson 2: Enumeration
const stepByCommandEnum = {
  "sudo netdiscover -r 10.38.1.0": "discover",
  "ping -c 3 10.38.1.117": "verify",
  "nmap -sV -O 10.38.1.117": "scan",
  "hydra -l hari -P hackme.txt 10.38.1.117 http-post-form '/login.php:user=^USER^&pass=^PASS^:Invalid credentials.' -V": "attack",
  "find / -perm -4000 -type f -exec ls -l {} \\; 2>/dev/null": "privesc"
};

function clearFlowHighlights() {
  document.querySelectorAll(".flow-step").forEach(step => {
    step.classList.remove("active");
  });
}

function highlightStep(stepId) {
  clearFlowHighlights();
  if (!stepId) return;
  const target = document.querySelector(`.lesson-panel.active .flow-step[data-step="${stepId}"]`);
  if (target) {
    target.classList.add("active");
  }
}

// Called from terminal.js with the current lesson + command
function highlightStepForCommand(lesson, commandText) {
  const map = lesson === "basics" ? stepByCommandBasics : stepByCommandEnum;
  const stepId = map[commandText];
  highlightStep(stepId);
}

