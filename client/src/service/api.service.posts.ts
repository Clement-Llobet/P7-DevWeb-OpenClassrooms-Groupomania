export class ApiService {
  private urlBase: string | undefined;

  constructor(urlBase?: string) {
    this.urlBase = urlBase;
  }

  apiEmployeesSignUp() {}

  apiEmployeesLogin() {}

  apiUpdateEmployees() {}

  apiDeleteEmployees() {}

  apiGetAllEmployees() {}

  apiGetEmployeeById() {}

  apiCreatePost() {}

  apiUpdatePost() {}

  apiDeletePost() {}

  apiGetPostById() {}

  apiGetAllPosts = async () => {
    let url = this.urlBase + '/api/posts/';
    console.log(url);

    // await fetch(url);
  };

  apiCreateLike() {}

  apiUpdateLike() {}
}
