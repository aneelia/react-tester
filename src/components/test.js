import React from 'react';
import Code from './Code';
import './test.css';
import { connect } from 'react-redux';

function setClass(result) {
  if (result === 'notAnswered') {
    return '';
  }
  if (result === 'success') {
    return 'question-success';
  }
  return 'question-failed';
}

const TestComponent = ({
  result,
  description,
  errorMessage,
  mode,
  code,
  setCode,
  submitQuestion,
  tabKey
}) => {
  return (
    <div>
      <div>
        <p className={setClass(result)}>{description}</p>

        {errorMessage !== '' ? <div>{errorMessage}</div> : undefined}
      </div>
      <div>
        <div className="editor">
          <Code
            mode={mode.lang}
            onCodeUpdate={code => setCode(tabKey, code)}
            initialCode={code}
          />
          <pre>{code}</pre>
        </div>
        <button onClick={() => submitQuestion(tabKey, code)}>Submit</button>
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  setCode: (id, value, field = 'code') =>
    dispatch({
      type: 'UPDATE_FIELD',
      payload: {
        id,
        value,
        field
      }
    }),
  submitQuestion: (id, code) =>
    dispatch({
      type: 'SUBMIT_ANSWER',
      payload: {
        id,
        code
      }
    })
});

export default connect(null, mapDispatchToProps)(TestComponent);
