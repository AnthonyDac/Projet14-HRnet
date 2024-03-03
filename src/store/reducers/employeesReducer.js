const initialState = {
    employees: undefined,
};

const employeesReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_EMPLOYEES":
            return {
                ...state,
                employees: action.payload,
            };
        case "RESET_EMPLOYEES":
            return {
                ...state,
                employees: undefined,
            };
        default:
            return state;
    }
};

export default employeesReducer;