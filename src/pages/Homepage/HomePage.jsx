import React, { useState } from 'react';
import './HomePage.css';
import { Link } from 'react-router-dom';
import SelectField from '../../components/Selector/Selector';
import Modal from '../../components/Modal/Modal';
import DatePicker from '../../components/DatePicker/DatePicker';
import shortid from 'shortid';


class HomePage extends React.Component {
  constructor() {
    super();
    this.state = {
      states: ['Unknown'],
      departments: ['Unknown'],
      selectedDate: '',
      selectedState: 'Unknown',
      showingModal: false,
    };
  }

  closeModal = () => {
    this.setState({ showingModal: false });
  };

  // Fonction pour gérer les changements de valeur dans les champs <select>
  handleSelectChange = (name, value) => {
    if (name === 'state') {
      //Récupérer l'abbréviation de l'état
      const state = this.state.states.find((state) => state.name === value);
      this.setState({ selectedState: state.abbreviation });
      this.setState({ [name]: value })
    } else if (name === 'department') {
      this.setState({ [name]: value });
    }
  };

  componentDidMount() {
    fetch('/src/data/states.json')
      .then((response) => response.json())
      .then((data) => {
        this.setState({ states: data });
        this.setState({ selectedState: data[0].abbreviation });
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des données :', error);
      });

    fetch('/src/data/departments.json')
      .then((response) => response.json())
      .then((data) => {
        this.setState({ departments: data });
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des données :', error);
      });
  }

  // Fonction pour formater la date actuelle au format ISO (YYYY-MM-DD)
  getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Fonction pour gérer la soumission du formulaire
  handleSubmit = (event) => {
    event.preventDefault();

    // Récupérer les valeurs du formulaire
    const formData = new FormData(event.target);
    const employeeData = {};
    formData.forEach((value, key) => {
      console.log(value)
      employeeData[key] = value;
    });

    employeeData.state = this.state.selectedState;
    employeeData.id = shortid.generate();

    if (employeeData.firstName == '') return;
    if (employeeData.lastName == '') return;
    if (employeeData.dob == '') return;
    if (employeeData.startDate == '') return;
    if (employeeData.street == '') return;
    if (employeeData.city == '') return;
    if (employeeData.zip == '') return;

    /*for (let i = 0; i < 250; i++) {
      //Faire 250 copies de l'employé
      const employeeData = {};
      formData.forEach((value, key) => {
        employeeData[key] = value;
      });
      employeeData.state = this.state.selectedState;
      employeeData.id = shortid.generate();
      const actualLocalStorage = JSON.parse(localStorage.getItem('employees'));
      if (actualLocalStorage) {
        actualLocalStorage.push(employeeData);
        localStorage.setItem('employees', JSON.stringify(actualLocalStorage));
      } else {
        localStorage.setItem('employees', JSON.stringify([employeeData]));
      }
    }*/

    // Stocker les données dans le localStorage
    const actualLocalStorage = JSON.parse(localStorage.getItem('employees'));
    if (actualLocalStorage) {
      actualLocalStorage.push(employeeData);
      localStorage.setItem('employees', JSON.stringify(actualLocalStorage));
    } else {
      localStorage.setItem('employees', JSON.stringify([employeeData]));
    }

    this.setState({ showingModal: true });
  };

  render() {
    return (
      <>
        <Modal title="Employee Created!" commentary='👍 Your employee has been created successfully.'
          position='center' show={this.state.showingModal} autoCloseTime={5000} showLoadingBar={true} showCloseButton={false}
          backgroundColor="" onClose={this.closeModal} />
        <div className='HomePageContainer'>
          <div className="HomePageTitle">
            <h1>HRnet</h1>
          </div>
          <div className="HomePageContent">
            <Link to="/employee">View Current Employees</Link>
            <div className='createEmployee'>
              <h2>Create Employee</h2>
              <form id="create-employee" onSubmit={this.handleSubmit}>
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
                    value={this.state.selectedDate}
                    onChange={(e) => this.setState({ selectedDate: e.target.value })}
                    maxDate={this.getCurrentDate()}
                  />
                </label>
                <label>
                  Start Date
                  <DatePicker
                    fieldName="startDate"
                    value={this.state.startDate} format="DD-MM-YYYY"
                    onChange={(e) => this.setState({ startDate: e.target.value })}
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
                      options={this.state.states.map((state) => state.name)}
                      value={this.state.state}
                      onChange={(e) => this.handleSelectChange('state', e.target.value)}
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
                    options={this.state.departments.map((department) => department.name)}
                    value={this.state.department}
                    onChange={(e) => this.handleSelectChange('department', e.target.value)}
                  />
                </label>
                <input type="submit" value="Save" />
              </form>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default HomePage;
