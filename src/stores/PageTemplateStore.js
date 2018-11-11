import { observable, computed, action } from "mobx";


export default class PageTemplateStore {
  @observable todos = [];

  @computed
  get unfinishedTodoCount() {
    return this.todos.filter(todo => !todo.finished).length;
  }

  @action
  addTodo(title) {
    // this.todos.push(new TodoStore(title));
    this.todos.push({
      id: Math.random(),
      title,
      finished: false
    });
  }
}
