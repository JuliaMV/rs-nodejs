const uuid = require('uuid');

class Task {
  constructor({
    id = uuid(),
    title = 'BOARD',
    order = 0,
    description = 'Lorem ipsum',
    userId = null,
    boardId = null,
    columnId = null
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }

  static toResponse(task) {
    const { id, title, order, description, userId, columnId, boardId } = task;
    return { id, title, order, description, userId, columnId, boardId };
  }
}

module.exports = Task;