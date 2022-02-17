import React, { Component } from 'react';

export default class Task extends Component {

  onDragStart(e, task) {
    console.log("dragStart", task);
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
    } = this.props;

    return (
      <div
        draggable
        onDragStart={(e) => this.onDragStart(e, task)}
        className='task-wrapper'
      >
        {task}
      </div>
    );
  }
}
