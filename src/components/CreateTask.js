import React, { Component } from 'react';
import { newTaskCopy, addCard, oops, validations } from '../globalAPI';

export default class CreateTask extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isValid: false,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  validateString(string) {
    let valid = false;
    const regex = RegExp(/^(?!\s*$).+/)

    if (regex.test(string)) {
      valid = true;
    }
    this.setState({
      saveError: false,
      isValid: valid
    });
  }

  handleChange(e) {
    e.preventDefault();

    this.validateString(e.target.value)
    this.setState({
      task: e.target.value
    });
  };

  saveTask() {
    const {
      task,
      isValid
    } = this.state;
    const {
      addTodo,
      column,
    } = this.props;
    if (isValid) {
      addTodo({ task, column })
    } else {
      this.setState({
        saveError: true
      })
    }
  }

  render() {
    const { toggleCreateTask } = this.props;
    const { saveError } = this.state;
    return (
      <div className='create-task-wrapper'>
        <textarea
          className={`create-task-input ${saveError ? 'create-task-input__invalid' : ''}`}
          onChange={this.handleChange}
          type={'input'}
          valid={validations}
          required={true}
          placeholder={newTaskCopy}
          maxlength={160}
        />
        <div className='create-task-actions'>
          <span
            className='create-task-button'
            onClick={() => this.saveTask()}
          >
            {addCard}
          </span>
          <span className='icon-close' onClick={() => toggleCreateTask()}>&#215;</span>
          {saveError && <span className='create-task-invalid'>{oops}</span>}
        </div>
      </div>
    );
  }
}
