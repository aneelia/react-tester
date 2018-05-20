import React from 'react';
import styled from 'styled-components'
import { Flex } from 'grid-styled'
import Code from './Code';
import './test.css';
import { connect } from 'react-redux';
import { AutorizeForm } from '../containers/Form/AutorizeForm'

function setClass(result) {
  if (result === 'notAnswered') {
    return '';
  }
  if (result === 'success') {
    return 'question-success';
  }
  return 'question-failed';
}

const SubmitButton = styled.button`
font-size: 1.2rem;
display: block;
font-weight: bold;
letter-spacing: 0.1rem;
text-transform: uppercase;
text-decoration: none;
text-align: center;
color: gray;
background: white;
border: 1px solid gray;
border-radius: 4px;
outline: none;
cursor: pointer;
padding: 1rem 3.2rem;

&:focus {
  outline: none;
  background: #e3e3e3;
}
`

const TestComponent = ({
  result,
  description,
  errorMessage,
  mode,
  code,
  setCode,
  submitQuestion,
  tabKey,
}) => {
  return (
    <div>
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
          
          <Flex justifyContent="center" >
            <SubmitButton onClick={() => submitQuestion(tabKey, code)}>
              Submit
            </SubmitButton>
          </Flex>
        </div>
      </div>
      <AutorizeForm results={{tabKey, result}}/>
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
