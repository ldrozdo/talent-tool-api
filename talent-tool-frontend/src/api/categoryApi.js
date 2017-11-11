class CategoryApi {

  static getAllCategories() {
    return fetch('http://localhost:4000/categories').then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }

  static updateCategory(category, authToken) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + authToken);
   const request = new Request(`http://localhost:4000/categories/${category.id}`, {
     method: 'PUT',
     headers: headers,
     body: JSON.stringify(category)
   });

   return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
 }

 static createCategory(category, authToken) {
     let headers = new Headers();
     headers.append('Content-Type', 'application/json');
     headers.append('Authorization', 'Bearer ' + authToken);
    const request = new Request('http://localhost:4000/categories', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(category)
    });

    return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }

  static deleteCategory(category, authToken) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + authToken);
    const request = new Request(`http://localhost:4000/categories/${category.id}`, {
      method: 'DELETE',
      headers: headers
    });

    return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }

}

export default CategoryApi;
