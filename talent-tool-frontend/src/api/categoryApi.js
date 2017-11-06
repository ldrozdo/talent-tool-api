class CategoryApi {

  static getAllCategories() {
    return fetch('http://localhost:4000/categories').then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }

  static updateCategory(category) {
   const request = new Request(`http://localhost:4000/categories/${category.id}`, {
     method: 'PUT',
     headers: new Headers({
       'Content-Type': 'application/json'
     }),
     body: JSON.stringify(category)
   });

   return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
 }

 static createCategory(category) {
    const request = new Request('http://localhost:4000/categories', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(category)
    });

    return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }

  static deleteCategory(category) {
    const request = new Request(`http://localhost:4000/categories/${category.id}`, {
      method: 'DELETE'
    });

    return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }

}

export default CategoryApi;
