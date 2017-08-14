class Model {
  getList(done){
    fetch('/todos')
    .then(res => res.json())
    .then(res => done(null, res))
    .catch(error => done(error));
  }

	addItem(item, done){
   fetch('/todos/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: item.title
      })
    })
   .then(res => res.json())
   .then(res => done(null, res))
   .catch(error => done(error));
	}

	updateItem(id, data, done){
    fetch(`/todos/update/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
   .then(res => res.json())
   .then(res => done(null, res))
   .catch(error => done(error));
		
	}

	removeItem(id, done){
		fetch(`/todos/delete/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
   .then(res => res.json())
   .then(res => done(null))
   .catch(error => done(error));
	}
}

export default Model;