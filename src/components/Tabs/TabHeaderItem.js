import React from 'react';

const calculateClassName = (selected, result) => {
  const selectedClass =
    'tabsHeader--item ' + (selected ? 'tabsHeader--item__selected' : '');
  const resultClass = result !== 'notAnswered'
    ? result === 'success'
      ? 'tabsHeader--item__success'
      : 'tabsHeader--item__failed'
    : '';

  return `${selectedClass} ${resultClass}`;
};

const TabHeaderItem = ({
  name,
  onItemClick,
  selected,
  tabId,
  result = 'notAnswered'
}) => {
  return (
    <div
      onClick={() => onItemClick(tabId)}
      className={calculateClassName(selected, result)}
    >
      {name}
    </div>
  );
};

export default TabHeaderItem;
