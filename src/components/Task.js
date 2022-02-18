import React, { Component } from 'react';

export default class Task extends Component {

  onDragStart(e, task) {
    const { column } = this.props;
    const data = {
      column,
      task,
    };
  
    e.dataTransfer.setData('id', JSON.stringify(data));
  }

  render() {
    const {
      task,
      column,
      deleteTodoFromColumn
    } = this.props;

    return (
      <div
        draggable
        onDragStart={(e) => this.onDragStart(e, task)}
        className='task-wrapper'
      >
        <span>{task}</span>
        <span className='icon-close' onClick={() => deleteTodoFromColumn(task, column)}>&#215;</span>
      </div>
    );
  }
}
