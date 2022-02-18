import React, { Component } from 'react';
import { projectStatuses } from '../globalAPI';

import Column from './Column';

import '../css/board.css';

export default class Board extends Component {
  constructor(props) {
    super(props);

    this.state = {}

    this.addTodoToColumn = this.addTodoToColumn.bind(this);
    this.moveTodo = this.moveTodo.bind(this);
    this.deleteTodoFromColumn = this.deleteTodoFromColumn.bind(this)
  }

  addTodoToColumn(todo) {
    const todoColumn = this.state[todo.column] || [];

    this.setState({
      [todo.column]: [...todoColumn, todo.task],
    })
  }

  deleteTodoFromColumn(todo, column) {
    let col = this.state[column];    
    col = col.filter(task => task !== todo);

    this.setState({
      [column]: [...col],
    })
  }

  moveTodo(todo, newColumn) {
    let lastCol = this.state[todo.column];
    const nextCol = this.state[newColumn] || [];
    
    lastCol = lastCol.filter(task => task !== todo.task);

    this.setState({
      [todo.column]: [...lastCol],
      [newColumn]: [...nextCol, todo.task],
    })
  }

  render() {
    return (
      <div className='board-wrapper'>
        {projectStatuses.map((project) => {
          const todos = this.state[project.column];

          return (
            <Column
              key={project.column}
              column={project.column}
              status={project.status}
              addTodoToColumn={this.addTodoToColumn}
              deleteTodoFromColumn={this.deleteTodoFromColumn}
              moveTodo={this.moveTodo}
              todos={todos}
            />
          )}
        )}
      </div>
    );
  }
}