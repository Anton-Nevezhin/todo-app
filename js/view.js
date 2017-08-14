import { createElement, EventEmitter } from './helpers.js'

class View extends EventEmitter{
	constructor(){
		super();

		this.form = document.getElementById('todo-form');
		this.input = document.getElementById('add-input');
		this.list = document.getElementById('todo-list');

		this.form.addEventListener('submit', this.handleAdd.bind(this));
	}
  
	createElement(todo, type){
   console.log(type)
		const checkbox = createElement('input', {type: 'checkbox', className: 'checkbox', checked: todo.done ? 'checked' : ''});
		const label =  createElement('label', { className: 'title'}, todo.title);
		const editInput = createElement('input', {type: 'text', className: 'textfield'});
		const editButton = createElement('button', {className: 'edit'}, 'Изменить');
		const removeButton = createElement('button', {className: 'remove'}, 'Удалить');
		const item = createElement('li', {className:`${ type ? '' : 'creating '}todo-item${todo.done ? ' completed' : ''}`, 'data-id': todo._id}, checkbox, label, editInput, editButton, removeButton);

    if(!type){
    setTimeout(() => {
      item.classList.remove('creating')
    }, 1000);
  }

    return this.addEventListeners(item);
	}

	findListItem(id){

		return this.list.querySelector(`[data-id="${id}"]`);
	}

	addEventListeners(listItem){
		const checkbox = listItem.querySelector('.checkbox');
		const editButton = listItem.querySelector('button.edit');
		const removeButton = listItem.querySelector('button.remove');


		checkbox.addEventListener('change', this.handleToggle.bind(this));
		editButton.addEventListener('click', this.handleEdit.bind(this));
		removeButton.addEventListener('click', this.handleRemove.bind(this));

		return listItem;
	}

	handleToggle({target}){
		const listItem = target.parentNode;
		const id = listItem.getAttribute('data-id');
		const done = target.checked;

		this.emit('toggle', {id, done})

	}

	handleAdd(event){
		event.preventDefault();

		if(!this.input.value) return alert('необходимо ввести название задачи');

		const value = this.input.value;

		this.emit('add', value);
	}

	handleEdit({target}){
		const listItem = target.parentNode;
		const id = listItem.getAttribute('data-id');
		const label = listItem.querySelector('.title');
		const input = listItem.querySelector('.textfield');
		const editButton = listItem.querySelector('button.edit');
		const title = input.value;
		const isEditing = listItem.classList.contains('editing');

		if(isEditing){

			this.emit('edit', {id, title})
		}else{
			input.value = label.textContent;
			editButton.textContent = 'Сохранить';
			listItem.classList.add('editing')
		}

	}

	handleRemove({target}){
		const listItem = target.parentNode;
		const id = listItem.getAttribute('data-id');
		this.emit('remove', {id})
	}

	addItem(todo, type){
		const listItem = this.createElement(todo, type);

		this.input.value = '';

		this.list.appendChild(listItem)
	}

	toggleItem(todo){
		const listItem = this.findListItem(todo._id);
		const checkbox = listItem.querySelector('.checkbox');
		checkbox.checked = todo.done;
		if(todo.done) {
			listItem.classList.add('completed')
		}else{
			listItem.classList.remove('completed')
		}
	}

	editItem(todo){
		const listItem = this.findListItem(todo._id);
		const label = listItem.querySelector('.title');
		const input = listItem.querySelector('.textfield');
		const editButton = listItem.querySelector('button.edit');


		label.textContent = todo.title;
		editButton.textContent = 'Изменить';
		listItem.classList.remove('editing');
	}
	removeItem(id){
		const listItem = this.findListItem(id);
    listItem.classList.add('removing');
    setTimeout(() => {
      this.list.removeChild(listItem);
    }, 500)
		
	}

  getList(todos){
      todos.forEach(item => {
        this.addItem(item, 'list')
      })
  }
}


export default View;