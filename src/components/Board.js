import React, { Component } from 'react';
import mapValues from 'lodash/mapValues';
import { projectStatuses } from '../globalAPI';

import Column from './Column';

import '../css/board.css';

export default class Board extends Component {
  constructor(props) {
    super(props);

    this.state = {}

    this.addTodoToColumn = this.addTodoToColumn.bind(this)
  }

  addTodoToColumn(todo) {
    const todoColumn = this.state[todo.status] || [];

    this.setState({
      [todo.status]: [...todoColumn, todo.task],
    })
  }

  render() {
    return (
      <div className='board-wrapper'>
        {projectStatuses.map((project) => {
          const todos = this.state[project.status];
          console.log(todos)
          return (
            <Column
              key={project.column}
              column={project.column}
              status={project.status}
              addTodoToColumn={this.addTodoToColumn}
              todos={todos}
            />
          )}
        )}
      </div>
    );
  }
}