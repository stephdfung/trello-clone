import React, { Component } from 'react';
import { projectStatuses } from '../globalAPI';

import Column from './Column';

import '../css/board.css';

export default class Board extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  onDrop(e) {
    
    const task = e.dataTransfer.getData('id');
    this.addTask(task);
  } 

  render() {
    return (
      <div className='board-wrapper'>
        {projectStatuses.map(({status}) =>
          <Column
            key={status}
            status={status}
          />)}
      </div>
    );
  }
}