export const APIConstant = {
  Todo: {
    base:'users',
    all:(username: string) => `users/${username}/todos`,
    getById: (username: string, id: number) => `users/${username}/todos/${id}`,
    deleteTodo: (username: string, id: number) =>`users/${username}/todos/${id}` 
  }
};
