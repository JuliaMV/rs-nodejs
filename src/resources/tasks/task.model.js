const mongoose = require('mongoose');
const uuid = require('uuid');

const taskSchema = new mongoose.Schema(
  {
    title: String,
    order: Number,
    description: String,
    userId: String,
    boardId: String,
    columnId: String,
    _id: {
      type: String,
      default: uuid
    }
  },
  { versionKey: false }
);

taskSchema.statics.toResponse = task => {
  const { id, title, order, description, userId, columnId, boardId } = task;
  return { id, title, order, description, userId, columnId, boardId };
};

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
