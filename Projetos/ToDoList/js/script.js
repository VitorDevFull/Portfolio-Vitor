// pegando os elementos do HTML pelo id
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const taskCount = document.getElementById('task-count');
const completedCount = document.getElementById('completed-count');
const emptyMsg = document.getElementById('empty-msg');

// carrego as tarefas salvas assim que a página abre
let tasks = loadTasks();

// salva as tarefas no localStorage pra não perder quando fechar o navegador
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// carrega as tarefas do localStorage
function loadTasks() {
  const saved = localStorage.getItem('tasks');

  if (saved) {
    return JSON.parse(saved);
  }

  return [];
}

// atualiza os contadores de total e concluídas
function updateCounts() {
  taskCount.textContent = tasks.length;

  // conta só as que estao como completed = true
  const done = tasks.filter(task => task.completed).length;
  completedCount.textContent = done;
}

// mostra ou esconde a mensagem de "nenhuma tarefa"
function toggleEmptyMsg() {
  if (tasks.length === 0) {
    emptyMsg.classList.remove('hidden');
  } else {
    emptyMsg.classList.add('hidden');
  }
}

// renderiza (desenha) todas as tarefas na tela
function renderTasks() {
  taskList.innerHTML = '';

  const ordedTasks = [...tasks].sort((a, b) => a.completed - b.completed);

  ordedTasks.forEach(task => {
    const li = document.createElement('li');
    li.classList.add('task-item');

    if (task.completed) {
      li.classList.add('completed');
    }

    // cria o texto da tarefa
    const span = document.createElement('span');
    span.textContent = task.text;

    // botao de concluir ou desfazer
    const completeBtn = document.createElement('button');
    completeBtn.textContent = task.completed ? 'Desfazer' : 'Concluir';
    completeBtn.classList.add('complete-btn');

    completeBtn.addEventListener('click', () => {
      toggleTask(task.id);
    });

    // botao de editar
    const editBtn = document.createElement('button');
    editBtn.textContent = '✏️';
    editBtn.classList.add('edit-btn');
    editBtn.title = 'Editar tarefa';

    editBtn.addEventListener('click', () => {
      editTask(task.id);
    });

    // botao de excluir
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Excluir';
    deleteBtn.classList.add('delete-btn');

    deleteBtn.addEventListener('click', () => {
      deleteTask(task.id);
    });

    // montando o item com o texto e os botoes
    li.appendChild(span);
    li.appendChild(completeBtn);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);

    taskList.appendChild(li);
  });

  updateCounts();
  toggleEmptyMsg();
}

// adiciona uma nova tarefa
function addTask(event) {
  event.preventDefault(); // evita que a pagina recarregue

  const texto = taskInput.value.trim();

  if (texto === '') {
    alert('Escreva alguma coisa antes de adicionar!');
    return;
  }

  // cria o objeto da nova tarefa
  const novaTarefa = {
    id: Date.now(), // uso o timestamp como id unico
    text: texto,
    completed: false
  };

  tasks.unshift(novaTarefa);
  saveTasks();
  renderTasks();

  taskInput.value = '';
  taskInput.focus();
}

// exclui uma tarefa pelo id
function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  saveTasks();
  renderTasks();
}

// marca ou desmarca uma tarefa como concluida
function toggleTask(id) {
  tasks = tasks.map(task => {
    if (task.id === id) {
      return { ...task, completed: !task.completed };
    }
    return task;
  });

  saveTasks();
  renderTasks();
}

// edita o texto de uma tarefa
function editTask(id) {
  const taskToEdit = tasks.find(task => task.id === id);

  const newText = prompt('Editar tarefa:', taskToEdit.text);

  if (newText === null) {
    return;
  }

  const trimmedText = newText.trim();

  if (trimmedText === '') {
    alert('A tarefa não pode ficar vazia.');
    return;
  }

  tasks = tasks.map(task => {
    if (task.id === id) {
      return { ...task, text: trimmedText };
    }
    return task;
  });

  saveTasks();
  renderTasks();
}

// evento do formulario - quando clica em Adicionar
taskForm.addEventListener('submit', addTask);

// renderiza as tarefas salvas quando a pagina carrega
renderTasks();
