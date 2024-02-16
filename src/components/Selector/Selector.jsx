import React from 'react';
import './Selector.css';

const SelectField = ({ options, name, value, onChange }) => (
  <select name={name} id={name} value={value} onChange={onChange}>
    {options.map((option) => (
      <option key={option + value} value={option}>
        {option}
      </option>
    ))}
  </select>
);

export default SelectField;
