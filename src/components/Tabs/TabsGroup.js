import React, { Component, Children } from 'react';
import TabHeaderItem from './TabHeaderItem';
import './tabs.css';

class TabsGroup extends Component {
  state = {
    selected: null
  };

  componentDidMount() {
    Children.toArray(this.props.children).forEach((child, idx) => {
      if (child.props.selected) {
        this.setState(prevState => ({
          ...prevState,
          ...{ selected: child.props.tabKey }
        }));
      }
    });
  }

  setSelected(id) {
    this.setState(prevState => ({ ...prevState, ...{ selected: id } }));
  }

  renderTabsHeaders(children) {
    return Children.map(children, child => {
      return (
        <TabHeaderItem
          key={child.props.tabKey}
          onItemClick={item => this.setSelected(item)}
          name={child.props.tabName}
          tabId={child.props.tabKey}
          selected={this.state.selected === child.props.tabKey}
          result={child.props.result}
        />
      );
    });
  }

  renderSelectedChildren(id, children) {
    return Children.toArray(children).find(child => child.props.tabKey === id);
  }

  render() {
    const { children } = this.props;
    return (
      <div>
        <div className="tabsHeader">{this.renderTabsHeaders(children)}</div>
        <div>
          {this.state.selected
            ? this.renderSelectedChildren(this.state.selected, children)
            : undefined}
        </div>
      </div>
    );
  }
}

export default TabsGroup;
