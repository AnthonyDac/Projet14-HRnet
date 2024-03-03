import React from 'react';
import './Selector.css';

const Selector = ({ options, name, value, onChange }) => (
  <select name={name} id={name} value={value} onChange={onChange}>
    {options.map((option, index) => (
      <option key={index} value={option.abbreviation}>
        {option.name}
      </option>
    ))}
  </select>
);

export default Selector;