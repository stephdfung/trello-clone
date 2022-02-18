import React, { Component } from 'react';
import { openCreateTask } from '../globalAPI';

import Task from './Task';
import CreateTask from './CreateTask';

import '../css/board.css';

class Column extends Component {
  constructor(props) {
    super(props);

    this.state = {
      toggleCreateTask: false,
    };
    this.toggleCreateTask = this.toggleCreateTask.bind(this)
    this.addTodo = this.addTodo.bind(this)
  }

  toggleCreateTask() {
    const { toggleCreateTask } = this.state;
    this.setState({
      toggleCreateTask: !toggleCreateTask,
    })
  }

  onDragOver(e) {
    e.preventDefault();
  }

  onDrop(e) {
    const { column } = this.props;
    const data = JSON.parse(e.dataTransfer.getData('id'));

    this.props.moveTodo(data, column)
  }

  addTodo(task) {
    this.toggleCreateTask()
    this.props.addTodoToColumn(task)
  }

  render() {
    const { toggleCreateTask } = this.state;
    const {
      todos,
      status,
      column,
      deleteTodoFromColumn,
    } = this.props;

    return (
      <div
        onDragOver={(e)=> this.onDragOver(e)}
        onDrop={(e) => this.onDrop(e, 'complete')}
        className='column'
      >
        <div className='column-header'>
          <h3>{status}</h3>
        </div>
        <div className='column-tasks'>
          {todos.map((task, i) =>
            <Task
              column={column}
              task={task}
              key={i}
              deleteTodoFromColumn={deleteTodoFromColumn}
            />
          )}
          {toggleCreateTask && (
            <CreateTask
              column={column}
              addTodo={this.addTodo}
              toggleCreateTask={this.toggleCreateTask}
            />
          )}
        </div>
        <div className='column-footer'>
          <div
            className='new-task-button'
            onClick={this.toggleCreateTask}
          >
            <span className='icon-plus'>&#43;</span><span>{openCreateTask}</span>
          </div>
        </div>
      </div>
    );
  }
}

Column.defaultProps = {
  todos: [],
}

export default React.memo(Column);