import React from 'react';
import { connect } from 'react-redux';
import {
  lifecycle,
  compose as rCompose,
  branch,
  renderNothing
} from 'recompose';
import TabsGroup from '../../components/Tabs/TabsGroup';
import TestsComponentSwitcher from '../../components/Test/TestsComponentSwitcher';

const mapStateToProps = state => ({
  tasks: state.test.tasks
});

const mapDispatchToProps = dispatch => ({
  fetchTasks: () =>
    dispatch({
      type: 'LOAD_TASKS'
    })
});

const withLifecycle = lifecycle({
  componentDidMount() {
    this.props.fetchTasks();
  }
});

const enhance = rCompose(
  connect(mapStateToProps, mapDispatchToProps),
  withLifecycle,
  branch(({ tasks }) => tasks.length === 0, renderNothing)
);

const TestContainer = ({ tasks }) => {
  return (
    <div>
      <TabsGroup>
        {tasks.map((task, id) => {
          return (
            <TestsComponentSwitcher
              key={task.tabKey}
              {...task}
              selected={id === 0}
            />
          );
        })}
      </TabsGroup>
    </div>
  );
};

export default enhance(TestContainer);
