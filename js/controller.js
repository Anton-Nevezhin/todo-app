class Controller{
	constructor(model, view){
		this.model = model
		this.view = view;

    this.getList();
		view.on('add', this.addTodo.bind(this));
		view.on('toggle', this.toggleTodo.bind(this));
		view.on('edit', this.editTodo.bind(this));
		view.on('remove', this.removeTodo.bind(this));
	}

	addTodo(title){
	this.model.addItem({
			id: Date.now(),
			title,
			done: false
		}, (err, item) => {
      if(err) {
        throw err;
      }else{
       this.view.addItem(item)
     }
   });
	}

  getList(){
    this.model.getList((err, items) => {
      if(err) {
        throw err;
      }else{
        this.view.getList(items);
      };
      
    })
  }

	toggleTodo({id, done}){
		this.model.updateItem(id, {done}, (err, item) => {
      if(err) {
        throw err;
      }else{
        this.view.toggleItem(item)
      };
    });
	}
	editTodo({id, title}){
    this.model.updateItem(id, {title}, (err, item) => {
      if(err) {
        throw err;
      }else{
       this.view.editItem(item);
      };
    });
	}

	removeTodo({id}){
    this.model.removeItem(id, (err, item) => {
      if(err) {
        throw err;
      }else{
       this.view.removeItem(id);
      };
    });
	}

}


export default Controller;