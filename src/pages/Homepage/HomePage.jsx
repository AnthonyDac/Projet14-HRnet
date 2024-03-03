import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getEmployees } from '../../store/selectors/selectors';
import SelectField from '../../components/Selector/Selector';
import Modalia from 'modalia';
import DatePicker from '../../components/DatePicker/DatePicker';
import shortid from 'shortid';
import './HomePage.css';

const HomePage = () => {
  const [states, setStates] = useState(['Unknown']);
  const [departments, setDepartments] = useState(['Unknown']);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedState, setSelectedState] = useState('Unknown');
  const [showingModal, setShowingModal] = useState(false);
  const dispatch = useDispatch();
  let employeesRedux = useSelector(getEmployees);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const statesResponse = await fetch('/data/states.json');
        const statesData = await statesResponse.json();
        setStates(statesData);
        setSelectedState(statesData[0].abbreviation);

        const departmentsResponse = await fetch('/data/departments.json');
        const departmentsData = await departmentsResponse.json();
        setDepartments(departmentsData);
      } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
      }
    };

    fetchData();

    const modalCloseHandler = () => {
      setShowingModal(false);
    };

    window.addEventListener('modalClose', modalCloseHandler);

    return () => {
      window.removeEventListener('modalClose', modalCloseHandler);
    };
  }, []);

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleSelectChange = (name, value) => {
    if (name === 'state') {
      const state = states.find((state) => state.name === value);
      setSelectedState(state.abbreviation);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const employeeData = {};

    formData.forEach((value, key) => {
      employeeData[key] = value;
    });

    employeeData.state = selectedState;
    employeeData.id = shortid.generate();

    if (Object.values(employeeData).some((field) => field === '')) {
      return;
    }

    const updatedEmployees = employeesRedux.length > 0 ? [...employeesRedux, employeeData] : [employeeData];
    dispatch({ type: 'SET_EMPLOYEES', payload: updatedEmployees });

    setShowingModal(true);
  };

  return (
    <>
      <Modalia title="Employee Created!" commentary='👍 Your employee has been created successfully.' position='corner-top-right' backgroundColor="" titleColor="" commentaryColor="" show={showingModal} />
      <div className='HomePageContainer'>
        <div className="HomePageTitle">
          <h1>HRnet</h1>
        </div>
        <div className="HomePageContent">
          <Link to="/employee">View Current Employees</Link>
          <div className='createEmployee'>
            <h2>Create Employee</h2>
            <form id="create-employee" onSubmit={handleSubmit}>
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
                <DatePicker
                  fieldName="dob"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  maxDate={getCurrentDate()}
                />
              </label>
              <label>
                Start Date
                <DatePicker
                  fieldName="startDate"
                  value={selectedDate}
                  format="DD-MM-YYYY"
                  onChange={(e) => setSelectedDate(e.target.value)}
                />
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
                  <SelectField
                    name="state"
                    options={states.map((state) => state.name)}
                    value={selectedState}
                    onChange={(e) => handleSelectChange('state', e.target.value)}
                  />
                </label>
                <label>
                  Zip Code
                  <input type="number" name="zip" min="1" />
                </label>
              </fieldset>
              <label>
                Department
                <SelectField
                  name="department"
                  options={departments.map((department) => department.name)}
                  value={departments.department}
                  onChange={(e) => handleSelectChange('department', e.target.value)}
                />
              </label>
              <input type="submit" value="Save" />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
