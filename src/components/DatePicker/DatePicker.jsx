import React from 'react';
import './DatePicker.css';

class DatePicker extends React.Component {
    render() {
        const { fieldName, value, onChange, maxDate } = this.props;

        return (
            <input
                type="date"
                name={fieldName}
                value={value}
                onChange={onChange}
                max={maxDate}
            />
        );
    }
}

export default DatePicker;
