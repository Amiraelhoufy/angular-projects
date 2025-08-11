export const APIConstant = {
  Todo: {
    base:'api/v1',
    all:(username: string) => `/users/${username}/todos`,
    getById: (username: string, id: number) => `/users/${username}/todos/${id}`,
    deleteTodo: (username: string, id: number) => `/users/${username}/todos/${id}`,
    updateTodo: (username: string, id: number)=> `/users/${username}/todos/${id}`,
    addTodo: (username: string) => `/users/${username}/todos`
  },
  Authentication:{
    base: 'api/v1/auth/basic',
    authenticate: '/authenticate'
  },
  Hello:{
    base:'hello',
    bean:'hello/bean',
    pathParam:(name:string) => `/hello/path-variable/${name}`
  }
};
