import React, { Component } from 'react';
import { newTaskCopy, addCard, validations } from '../globalAPI';

export default class CreateTask extends Component {
  constructor(props) {
    super(props);

    this.state = {
      task: undefined,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    e.preventDefault();
  
    this.setState({
      task: e.target.value
    });
  };

  render() {
    const {
      task,
    } = this.state;
    const {
      addTask
    } = this.props;

    return (
      <div className='create-task-wrapper'>
        <input
          className="input__box"
          onChange={this.handleChange}
          type={'input'}
          validations={validations}
          required={true}
          placeholder={newTaskCopy}
        />
        <div
          className='create-task-button'
          onClick={() => addTask(task)}
        >
          {addCard}
        </div>
      </div>
    );
  }
}
