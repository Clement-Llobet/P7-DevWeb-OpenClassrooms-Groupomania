import * as types from '../interfaces/index';

export class ApiService {
  private urlBase: string | undefined;

  constructor(urlBase?: string) {
    this.urlBase = urlBase;
  }

  apiEmployeesSignUp = async (data: types.EmployeesData) => {
    let url = this.urlBase + 'api/employees/signup';

    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    const userData = await response.json();
    localStorage.setItem('token', userData.token);
    return userData;
  };

  apiEmployeesLogin = async (data: types.EmployeesLoginData) => {
    let url = this.urlBase + 'api/employees/login';

    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    const userData = await response.json();
    localStorage.setItem('token', userData.token);
    return userData;
  };

  apiUpdateEmployees = async (data?: types.EmployeesData) => {
    let url = this.urlBase + `api/employees/${data?.id}`;

    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const updateEmployeeData = response.json();
    return updateEmployeeData;
  };

  apiDeleteEmployees = async (data?: string) => {
    let url = this.urlBase + `api/employees/${data}`;

    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const deleteEmployeeData = response.json();
    return deleteEmployeeData;
  };

  apiGetAllEmployees = async () => {
    let url = this.urlBase + 'api/employees/';

    const response = await fetch(url);
    const employeesData = response.json();
    return employeesData;
  };

  apiGetEmployeeById = async (data?: string) => {
    let url = this.urlBase + `api/employees/${data}`;

    const response = await fetch(url);
    const employeeByIdData = response.json();
    return employeeByIdData;
  };

  apiCreatePost = async (data: types.PostsData) => {
    let url = this.urlBase + 'api/posts/';

    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    const postData = await response.json();
    return postData;
  };

  apiUpdatePost = async (data: types.PostsData) => {
    let url = this.urlBase + `api/posts/${data.id}`;

    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const updatePostData = response.json();
    return updatePostData;
  };

  apiDeletePost = async (id?: string) => {
    let url = this.urlBase + `api/posts/${id}`;

    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(id),
    });
    const deletePostData = response.json();
    return deletePostData;
  };

  apiGetPostById = async (data?: string) => {
    let url = this.urlBase + `api/posts/${data}`;

    const response = await fetch(url);
    const postByIdData = response.json();
    return postByIdData;
  };

  apiGetAllPosts = async () => {
    let url = this.urlBase + `api/posts/`;

    const response = await fetch(url);
    const postData = response.json();

    return postData;
  };

  apiCreateLike = async (data: types.LikesData) => {
    let url = this.urlBase + `api/posts/${data.likesId}/like`;

    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    const likeData = response.json();
    return likeData;
  };

  apiDeleteLike = async (data: string) => {
    let url = this.urlBase + `api/posts/${data}/like`;

    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const deleteLikeData = response.json();
    return deleteLikeData;
  };
}
