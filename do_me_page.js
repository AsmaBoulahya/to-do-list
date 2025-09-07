document.addEventListener("DOMContentLoaded", () => {
  // Afficher la section par défaut
  switchView('projects');

  // Ajouter les événements aux boutons pour changer de vue
  document.querySelectorAll(".top-buttons button").forEach(btn => {
    btn.addEventListener("click", function () {
      document.querySelectorAll(".top-buttons button").forEach(b => b.classList.remove("active"));
      this.classList.add("active");
      document.getElementById("selectedProject").innerText = this.textContent;
      switchView(this.getAttribute("data-view"));
    });
  });

  // Affichage par défaut du timer Pomodoro
  updateDisplay();
});

// Tableau pour stocker les tâches ajoutées
let tasks = [];

// Fonction pour ajouter ou mettre à jour une tâche
function addTask(event) {
  event.preventDefault(); // Empêche la soumission du formulaire

  // Récupération des valeurs du formulaire
  const taskName = event.target.task_name.value;
  const responsible = event.target.responsible.value;
  const date = event.target.date.value;
  const priority = event.target.priority.value;
  const category = event.target.category.value;
  const status = event.target.status.value;

  // Validation des champs
  if (!taskName || !responsible || !date || !priority || !category || !status) {
    alert("Tous les champs doivent être remplis.");
    return;
  }

  // Si l'index de la tâche existe, mettre à jour la tâche
  const submitButton = event.target.querySelector('button[type="submit"]');
  const index = submitButton.getAttribute('data-index');

  if (index !== null) {
    // Mise à jour de la tâche existante
    tasks[index] = { taskName, responsible, date, priority, category, status };
    submitButton.removeAttribute('data-index');
    submitButton.textContent = 'Add Task'; // Remet le texte à "Add Task"
  } else {
    // Crée un objet de tâche
    const task = {
      taskName,
      responsible,
      date,
      priority,
      category,
      status
    };

    tasks.push(task); // Ajout de la nouvelle tâche au tableau
  }

  renderTasks(); // Rendre à nouveau les tâches
  event.target.reset(); // Réinitialiser le formulaire
}

// Afficher les tâches dans le conteneur
function renderTasks() {
  const tasksContainer = document.getElementById("tasksContainer");
  tasksContainer.innerHTML = ''; // Vider le conteneur avant de le remplir

  tasks.forEach((task, index) => {
    const taskDiv = document.createElement('div');
    taskDiv.classList.add('task');
    taskDiv.setAttribute('data-status', task.status.toLowerCase());

    taskDiv.innerHTML = `
      <p>${task.taskName}</p>
      <p>${task.responsible}</p>
      <p>${task.date}</p>
      <p>${task.priority}</p>
      <p>${task.category}</p>
      <p>${task.status}</p>
      <div class="task-buttons">
          <button onclick="markAsDone(this)">✔️</button>
        <button onclick="editTask(${index})">Edit</button>
        <button onclick="deleteTask(${index})">Delete</button>
      </div>
    `;
    tasksContainer.appendChild(taskDiv);
  });
}

function markAsDone(button) {
  const taskName = button.closest('.task').querySelector('.task-name');
  taskName.classList.toggle("done");
}

// Fonction pour supprimer une tâche
function deleteTask(index) {
  tasks.splice(index, 1); // Retirer la tâche du tableau
  renderTasks(); // Re-rendre la liste des tâches après suppression
}

// Fonction pour éditer une tâche
function editTask(index) {
  const task = tasks[index];

  // Remplir le formulaire avec les valeurs existantes
  document.querySelector('input[name="task_name"]').value = task.taskName;
  document.querySelector('input[name="responsible"]').value = task.responsible;
  document.querySelector('input[name="date"]').value = task.date;
  document.querySelector('select[name="priority"]').value = task.priority;
  document.querySelector('select[name="category"]').value = task.category;
  document.querySelector('select[name="status"]').value = task.status;

  // Changer le texte du bouton de soumission en "Mettre à jour"
  const submitButton = document.querySelector('button[type="submit"]');
  submitButton.textContent = 'Update Task';

  // Ajouter un attribut pour identifier l'index de la tâche à mettre à jour
  submitButton.setAttribute('data-index', index);
}

// Fonction pour mettre à jour une tâche après édition
function updateTask(event) {
  event.preventDefault();

  const index = event.target.querySelector('button[type="submit"]').getAttribute('data-index');
  const taskName = event.target.task_name.value;
  const responsible = event.target.responsible.value;
  const date = event.target.date.value;
  const priority = event.target.priority.value;
  const category = event.target.category.value;
  const status = event.target.status.value;

  // Mise à jour des valeurs dans le tableau des tâches
  tasks[index] = { taskName, responsible, date, priority, category, status };
  
  // Re-rendre les tâches après la mise à jour
  renderTasks();

  // Réinitialiser le formulaire
  event.target.reset();
  event.target.querySelector('button[type="submit"]').textContent = 'Add Task'; // Remettre le texte du bouton à "Ajouter une tâche"
  delete event.target.querySelector('button[type="submit"]').getAttribute('data-index'); // Supprimer l'attribut de l'index
}

// Filtrer les tâches par statut
function filterTasks(status) {
  const tasksContainer = document.getElementById("tasksContainer");
  const taskDivs = tasksContainer.querySelectorAll('.task');

  taskDivs.forEach(taskDiv => {
    if (status === 'all' || taskDiv.getAttribute('data-status') === status) {
      taskDiv.style.display = 'flex';
    } else {
      taskDiv.style.display = 'none';
    }
  });
}

// Fonction pour rechercher une tâche spécifique parmi les éléments
function searchTask() {
  const query = document.getElementById("searchInput").value.toLowerCase();
  const tasks = document.querySelectorAll(".task");
  tasks.forEach(task => {
    const match = task.innerText.toLowerCase().includes(query);
    task.style.display = match ? "block" : "none";
  });
}

// Fonction pour basculer la visibilité de la barre latérale
function toggleSidebar() {
  document.getElementById("sidebar").classList.toggle("hidden");
}

let workMinutes = 25;
let breakMinutes = 5;
let isWorking = true;
let timeLeft = workMinutes * 60;
let timerInterval;
let isRunning = false;

function updateDisplay() {
  const minutes = Math.floor(timeLeft / 60).toString().padStart(2, '0');
  const seconds = (timeLeft % 60).toString().padStart(2, '0');
  document.getElementById("timer").textContent = `${minutes}:${seconds}`;
  document.getElementById("status").textContent = `Pomodoro: ${isWorking ? "Travail" : "Pause"}`;
}

function startCustomTimer() {
  workMinutes = parseInt(document.getElementById("workInput").value) || 25;
  breakMinutes = parseInt(document.getElementById("breakInput").value) || 5;
  isWorking = true;
  timeLeft = workMinutes * 60;
  resetTimer();
  toggleTimer();
}

function toggleTimer() {
  if (isRunning) {
    clearInterval(timerInterval);
    isRunning = false;
  } else {
    timerInterval = setInterval(() => {
      if (timeLeft > 0) {
        timeLeft--;
      } else {
        isWorking = !isWorking;
        timeLeft = (isWorking ? workMinutes : breakMinutes) * 60;
        alert(isWorking ? "Retour au travail !" : "Pause bien méritée !");
      }
      updateDisplay();
    }, 1000);
    isRunning = true;
  }
}

function resetTimer() {
  clearInterval(timerInterval);
  isRunning = false;
  timeLeft = (isWorking ? workMinutes : breakMinutes) * 60;
  updateDisplay();
}

// Fonction pour changer de vue dans l'application (sections visibles)
function switchView(view) {
  const sections = document.querySelectorAll(".section");
  sections.forEach(sec => sec.style.display = "none");
  document.getElementById(view + "-section").style.display = "block";
}

// Fonction pour gérer l'affichage du mode de tâche (par exemple, liste ou grille)
function setViewMode(mode) {
  const container = document.getElementById("tasksContainer");
  container.className = "tasks " + mode;
}
function switchView(section) {
  const sections = document.querySelectorAll('.section');
  sections.forEach(sec => sec.style.display = 'none');

  document.getElementById(`${section}-section`).style.display = 'block';

  if (section === 'calendar') {
    renderCalendarInterface();
  }
}

// Affiche le calendrier et les tâches du jour sélectionné
function renderCalendarInterface() {
  const calendarSection = document.getElementById("calendar-section");
  calendarSection.innerHTML = `<h2>Calendar View</h2>`;

  const info = document.createElement('p');
  info.textContent = "Choisissez une date pour voir les tâches :";

  const dateInput = document.createElement('input');
  dateInput.type = 'date';
  dateInput.id = 'calendarPicker';
  dateInput.style.marginTop = "10px";

  const results = document.createElement('div');
  results.id = 'calendarTasks';
  results.style.marginTop = '20px';

  dateInput.addEventListener('change', () => {
    const selectedDate = dateInput.value;
    showTasksByDate(selectedDate, results);
  });

  calendarSection.appendChild(info);
  calendarSection.appendChild(dateInput);
  calendarSection.appendChild(results);
}

document.addEventListener('DOMContentLoaded', function () {
  const calendarEl = document.getElementById('fullCalendar');
  if (calendarEl) {
    const calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: 'dayGridMonth',
      height: 650,
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      events: [] // tu ajouteras les événements plus tard
    });
    calendar.render();
  }
});


