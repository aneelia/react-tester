import React, { Component } from 'react';
import 'prismjs/themes/prism.css';
import 'prismjs/prism.js';
import './code.css';
import 'codeflask/src/codeflask.css';
import CodeFlask from '../utils/CodeFlask';

class Code extends Component {
  componentDidMount() {
    const flask = new CodeFlask();
    flask.run('.my-code-editor-' + this.props.mode, {
      language: this.props.mode,
      lineNumbers: true
    });
    flask.update(this.props.initialCode || '');
    flask.onUpdate(code => this.updateCode(code));
  }

  updateCode(code) {
    return this.props.onCodeUpdate(code);
  }

  render() {
    return (
      <div className="codeEditor">
        <div
          className={'my-code-editor-' + this.props.mode}
          style={{ height: '500px' }}
        />
      </div>
    );
  }
}

export default Code;
