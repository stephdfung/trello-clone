import React, { Component } from 'react';
import { openCreateTask } from '../globalAPI';

import Task from './Task';
import CreateTask from './CreateTask';

import '../css/board.css';

export default class Column extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: [],
      toggleCreateTask: false,
    };
    this.toggleCreateTask = this.toggleCreateTask.bind(this)
    this.addTask = this.addTask.bind(this)
  }
  
  toggleCreateTask() {
    const { toggleCreateTask } = this.state;
    this.setState({
      toggleCreateTask: !toggleCreateTask,
    })
  }

  addTask(task) {
    const {
      tasks
    } = this.state;
    this.setState({
      tasks: [...tasks, task],
      toggleCreateTask: false,
    })
  }

  onDragOver(e) {
    e.preventDefault();
  }

  onDrop(e) {
    console.log('on drop')
    const task = e.dataTransfer.getData('id');
    console.log(task)
    this.addTask(task);
  }

  onDragStart(e, task) {
    console.log("dragStart", task);
    e.dataTransfer.setData('id', task);
  }

  render() {
    const {
      tasks,
      toggleCreateTask,
    } = this.state;
    const {
      status
    } = this.props;
    console.log('renders')
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
          {tasks.map((task, i) =>
            <Task
              task={task}
              key={i}
            />
          )}
          {toggleCreateTask && (
            <CreateTask
              addTask={this.addTask}
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
