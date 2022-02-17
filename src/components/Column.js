import React, { Component } from 'react';
import { openCreateTask } from '../globalAPI';

import Task from './Task';
import CreateTask from './CreateTask';

import '../css/board.css';

class Column extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: [],
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
    console.log('on drop', )
    const data = JSON.parse(e.dataTransfer.getData('id'));
    // remove task from other column
    // we should store the column AND task in the task
    this.addTodo(data.task);
  }

  onDragStart(e, task) {
    console.log("dragStart", task);
    e.dataTransfer.setData('id', task);
  }

  addTodo(task) {
    this.toggleCreateTask()
    this.props.addTodoToColumn(task)
  }

  render() {
    const {
      toggleCreateTask,
    } = this.state;
    const {
      todos,
      status,
      column,
    } = this.props;
    console.log('renders column', status)
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
              onDragStart={this.onDragStart}
            />
          )}
          {toggleCreateTask && (
            <CreateTask
              column={column}
              addTodo={this.addTodo}
            />
          )}
        </div>
        <div className='column-footer'>
          <div
            className='new-task-button'
            onClick={this.toggleCreateTask}
          >
            <i className='icon-plus'/><span>{openCreateTask}</span>
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