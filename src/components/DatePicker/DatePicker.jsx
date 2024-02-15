import React from 'react';

class CustomDatePicker extends React.Component {
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

export default CustomDatePicker;
