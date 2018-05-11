import React from 'react';
import TestComponent from '../test';

const TestComponentSwitcher = props => {
  if (props.mode.editor && props.mode.lang === 'javascript')
    return <TestComponent {...props} />;
};

export default TestComponentSwitcher;
