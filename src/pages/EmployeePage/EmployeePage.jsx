import React, { Component } from 'react';
import EmployeeTable from '../../components/Table/Table';
import { Link } from 'react-router-dom';
import './EmployeePage.css';

class EmployeePage extends Component {
  employees = JSON.parse(localStorage.getItem('employees')) || [];

  columnDefs = [
    { headerName: 'First Name', field: 'firstName' },
    { headerName: 'Last Name', field: 'lastName' },
    { headerName: 'Start Date', field: 'startDate' },
    { headerName: 'Department', field: 'department' },
    { headerName: 'Date Of Birth', field: 'dob' },
    { headerName: 'Street', field: 'street' },
    { headerName: 'City', field: 'city' },
    { headerName: 'State', field: 'state' },
    { headerName: 'Zip Code', field: 'zip' },
  ];

  render() {
    return (
      <div className='EmployeePageContainer'>
        <div className="EmployeePageTitle">
          <h1>Current Employees</h1>
        </div>
        <div className="EmployeePageContent">
          <div className='EmployeeSearchContainer'>
            <div className='EmployeeSearch'>
              <label>
                Search:
                <input type="search" name="search" />
              </label>
            </div>
          </div>
          <div className="grid-container">
            <EmployeeTable columnDefs={this.columnDefs} rowData={this.employees} />
          </div>
          <Link to='/' className='EmployeePageBack'>Home</Link>
        </div>
      </div>
    );
  }
}

export default EmployeePage;