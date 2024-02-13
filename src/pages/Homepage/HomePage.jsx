import React from 'react';
import './HomePage.css';
import { Link } from 'react-router-dom';

class HomePage extends React.Component {
  componentDidMount() {

  }

  render() {

    return (
      <div className='HomePageContainer'>
        <div className="HomePageTitle">
          <h1>HRnet</h1>
        </div>
        <div className="HomePageContent">
          <Link to="/employee">View Current Employees</Link>
          <h2>Create Employee</h2>
          <div className='createEmployee'>
            <form id="create-employee">
              <label>
                First Name
                <input type="text" name="firstName" />
              </label>
              <label>
                Last Name
                <input type="text" name="lastName" />
              </label>
              <label>
                Date of Birth
                <input type="date" name="dob" />
              </label>
              <label>
                Start Date
                <input type="date" name="startDate" />
              </label>
              <fieldset>
                <legend>Address</legend>
                <label>
                  Street
                  <input type="text" name="street" />
                </label>
                <label>
                  City
                  <input type="text" name="city" />
                </label>
                <label>
                  State
                  <input type="text" name="state" />
                </label>
                <label>
                  Zip Code
                  <input type="number" name="zip" />
                </label>
              </fieldset>
              <label>
                Department
                <select name='department' id="department">
                  <option value="Sales">Sales</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Human Resources">Human Resources</option>
                  <option value="Legal">Legal</option>
                </select>
              </label>
              <input type="submit" value="Save" />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;
