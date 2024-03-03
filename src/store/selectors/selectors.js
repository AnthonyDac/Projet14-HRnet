import { createSelector } from 'reselect';

// Sélecteur d'entrée
const getEmployeesState = (state) => state.employees;

// Sélecteur mémoïsé
export const getEmployees = createSelector(
    [getEmployeesState],
    (employeesState) => {
        // Retournez un nouvel objet ou tableau seulement si les données d'entrée ont changé
        return Array.isArray(employeesState.employees) ? employeesState.employees : [];
    }
);