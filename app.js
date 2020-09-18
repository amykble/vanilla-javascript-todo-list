// Selectors
const todoInput = document.querySelector('.todo-input')
const todoButton = document.querySelector('.todo-button')
const todoList = document.querySelector('.todo-list')

const filterOption = document.querySelector('.filter-todo')

const toast = document.querySelector('.toast')

// Event Listeners
todoButton.addEventListener('click', addTodo)
todoList.addEventListener('click', deleteOrCheck)
filterOption.addEventListener('click', filterTodo)

// Functions
function addTodo(event) {
	event.preventDefault() // Stops form submit/browser refresh

	if (todoInput.value.length === 0) {
		toast.classList.add('show')
		toast.addEventListener('animationend', function () {
			toast.className = toast.className.replace('show', '')
		})
	} else {
		const todoDiv = document.createElement('div') // Creates div
		todoDiv.classList.add('todo') // Adds class name

		const newTodo = document.createElement('li') // creates li
		newTodo.innerText = todoInput.value // Uses input value as text
		todoInput.value = '' // clears text
		newTodo.classList.add('todo-item')
		todoDiv.appendChild(newTodo) // Makes li into a child of div

		const completedBtn = document.createElement('button')
		completedBtn.innerHTML = '<i class="fas fa-check"></i>' // Adding i tag for font awesome
		completedBtn.classList.add('completed-btn')
		todoDiv.appendChild(completedBtn)

		const deleteBtn = document.createElement('button')
		deleteBtn.innerHTML = '<i class="fas fa-trash"></i>'
		deleteBtn.classList.add('delete-btn')
		todoDiv.appendChild(deleteBtn)

		todoList.appendChild(todoDiv)
	}
}

function deleteOrCheck(event) {
	const item = event.target // Item is equal to whatever we click on
	if (item.classList[0] === 'completed-btn') {
		const todo = item.parentElement
		todo.classList.toggle('completed') // remove the parent element of the button
	}
	if (item.classList[0] === 'delete-btn') {
		const todo = item.parentElement
		todo.classList.add('shift')
		todo.addEventListener('transitionend', function () {
			todo.remove() // remove the parent element of the button
		})
	}
}

function filterTodo(event) {
	const todos = todoList.childNodes // children of the list
	todos.forEach(function (todo) {
		switch (event.target.value) {
			case 'all':
				todo.style.display = 'flex' // display all children
				break
			case 'completed':
				if (todo.classList.contains('completed')) {
					todo.style.display = 'flex' // display completed
				} else {
					todo.style.display = 'none'
				}
				break
			case 'incomplete':
				if (!todo.classList.contains('completed')) {
					// display incompleted
					todo.style.display = 'flex'
				} else {
					todo.style.display = 'none'
				}
				break
		}
	})
}
