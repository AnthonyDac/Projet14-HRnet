import React, { useState } from 'react';
import './HomePage.css';
import { Link } from 'react-router-dom';

class HomePage extends React.Component {
  constructor() {
    super();
    this.state = {
      states: ['Unknown'],
      departments: ['Unknown'],
      selectedDate: '',
      showingModal: false,
    };
  }

  componentDidMount() {
    fetch('/src/data/states.json')
      .then((response) => response.json())
      .then((data) => {
        this.setState({ states: data });
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
      employeeData[key] = value;
    });

    // Stocker les données dans le localStorage
    const actualLocalStorage = JSON.parse(localStorage.getItem('employees'));
    if (actualLocalStorage) {
      actualLocalStorage.push(employeeData);
      localStorage.setItem('employees', JSON.stringify(actualLocalStorage));
    } else {
      localStorage.setItem('employees', JSON.stringify([employeeData]));
    }

    // Afficher la fenêtre modale
    this.setState({ showingModal: true });
    setTimeout(() => {
      this.setState({ showingModal: false });
    }, 3000);
  };

  render() {

    return (
      <>
        {(this.state.showingModal) ? (
          <div className="modal">
            <div className="modal-content">
              <p>Employee Created!</p>
              <span className="close" onClick={() => this.setState({ showingModal: false })}>
                &times;
              </span>
            </div>
          </div>
        ) : null}
        <div className='HomePageContainer'>
          <div className="HomePageTitle">
            <h1>HRnet</h1>
          </div>
          <div className="HomePageContent">
            <Link to="/employee">View Current Employees</Link>
            <h2>Create Employee</h2>
            <div className='createEmployee'>
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
                  <input type="date" name="dob" value={this.state.selectedDate}
                    onChange={(e) => this.setState({ selectedDate: e.target.value })}
                    max={this.getCurrentDate()} />
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
                    <select name='state' id="state">
                      {this.state.states.map((state) => (
                        <option key={state.abbreviation} value={state.abbreviation}>
                          {state.name}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label>
                    Zip Code
                    <input type="number" name="zip" min="1" />
                  </label>
                </fieldset>
                <label>
                  Department
                  <select name='department' id="department">
                    {this.state.departments.map((department) => (
                      <option key={department.name} value={department.name}>
                        {department.name}
                      </option>
                    ))}
                  </select>
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
