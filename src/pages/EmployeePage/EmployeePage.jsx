import React from 'react';
import EmployeeTable from '../../components/Table/Table';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getEmployees } from '../../store/selectors/selectors';
import './EmployeePage.css';

const EmployeePage = () => {
  const employees = useSelector(getEmployees);

  const columnDefs = [
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
          <EmployeeTable columnDefs={columnDefs} rowData={employees} />
        </div>
        <Link to='/' className='EmployeePageBack'>Home</Link>
      </div>
    </div>
  );
}

export default EmployeePage;