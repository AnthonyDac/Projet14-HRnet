import React from 'react';
import './EmployeePage.css';
import { Link } from 'react-router-dom';

class EmployeePage extends React.Component {
  employees = JSON.parse(localStorage.getItem('employees')) || [];

  render() {

    return (
      <div className='EmployeePageContainer'>
        <div className="EmployeePageTitle">
          <h1>Current Employees</h1>
        </div>
        <div className="EmployeePageContent">
          <div className='EmployeeSearchContainer'>
            <div className='EmployeeSort'>
              Show <select name="show" id="show">
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select> entries
            </div>
            <div className='EmployeeSearch'>
              <label>
                Search:
                <input type="search" name="search" />
              </label>
            </div>
          </div>
          <table className='EmployeeListTable'>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Start Date</th>
                <th>Department</th>
                <th>Date Of Birth</th>
                <th>Street</th>
                <th>City</th>
                <th>State</th>
                <th>Zip Code</th>
              </tr>
            </thead>
            <tbody>
              {(this.employees ? this.employees.map((employee) => (
                <tr key={employee.firstName + employee.dob}>
                  <td>{employee.firstName}</td>
                  <td>{employee.lastName}</td>
                  <td>{employee.startDate}</td>
                  <td>{employee.department}</td>
                  <td>{employee.dob}</td>
                  <td>{employee.street}</td>
                  <td>{employee.city}</td>
                  <td>{employee.state}</td>
                  <td>{employee.zip}</td>
                </tr>
              )) : null)
              }
            </tbody>
          </table>
          <div className='EmployeePageNav'>
            <p>Showing 1 to 10 of 100 entries</p>
            <div className='EmployeePageNavButtons'>
              <button>Previous</button>
              <button>1</button>
              <button>2</button>
              <button>3</button>
              <button>Next</button>
            </div>
          </div>
          <Link to='/' className='EmployeePageBack'>Home</Link>
        </div>
      </div>
    );
  }
}

export default EmployeePage;
