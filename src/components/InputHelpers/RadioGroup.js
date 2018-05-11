import React, { Component, Children } from 'react';

export const RadioInput = ({ text, answerID, name, onSelectItem }) =>
  <div>
    <label>
      <input
        type="radio"
        name={name}
        onChange={e => onSelectItem({ text, answerID })}
      />
      <span>{text}</span>
    </label>
  </div>;

export class RadioGroup extends Component {
  renderChildren() {
    const { children, name, onSelectItem } = this.props;
    return Children.map(children, (child, idx) => {
      return (
        <RadioInput name={name} onSelectItem={onSelectItem} {...child.props} />
      );
    });
  }

  render() {
    return (
      <div>
        {this.renderChildren()}
      </div>
    );
  }
}
