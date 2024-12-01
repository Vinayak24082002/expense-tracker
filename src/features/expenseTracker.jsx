// ~~~~~~~~~~~~~~~~~~~ HELPER FUNCTIONS ~~~~~~~~~~~~~~~~~~~

const generateId = () => Math.random().toString(36).substring(2, 9);

const generateTimestamp = () => new Date().toLocaleString();

// ~~~~~~~~~~~~~~~~~~~ INITIAL STATE ~~~~~~~~~~~~~~~~~~~

// expanses: [
//     {
//         id: 1,
//         amount: 100,
//         timestamp: "12/12/2021",
//         note: "This is a sample Note!"
//     }
// ]
export const initialState = {
  expenses: [],
  budget: 0.00,
};

// ~~~~~~~~~~~~~~~~~~~ ACTION TYPES ~~~~~~~~~~~~~~~~~~~

export const ADD_EXPENSE = "ADD_EXPENSE";
export const DELETE_EXPENSE = "DELETE_EXPENSE";
export const UPDATE_EXPENSE = "UPDATE_EXPENSE";
export const ADD_BUDGET = "ADD_BUDGET";
// export const DELETE_BUDGET = 'DELETE_BUDGET';

// ~~~~~~~~~~~~~~~~~~~ ACTION CREATORS ~~~~~~~~~~~~~~~~~~~

export function addExpense(expense) {
  return {
    type: ADD_EXPENSE,
    payload: expense,
  };
}
export function deleteExpense(expense) {
  return {
    type: DELETE_EXPENSE,
    payload: expense,
  };
}
export function updateExpense(expenseToUpdate, updatedExpense) {
  return {
    type: UPDATE_EXPENSE,
    // payload: expense
    payload: { expenseToUpdate, updatedExpense },
  };
}
export function addBudget(budget) {
  return {
    type: ADD_BUDGET,
    payload: budget,
  };
}

// ~~~~~~~~~~~~~~~~~~~ REDUCER FUNCTION ~~~~~~~~~~~~~~~~~~~

const expenseTrackerReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_EXPENSE: {
      const id = generateId();
      const amount = parseFloat(payload.amount).toFixed(2) ?? 0;
      const timestamp = generateTimestamp();
      const note = payload.note ?? "";
      return {
        ...state,
        expenses: [...state.expenses, { id, amount, timestamp, note }],
      };
    }
    case DELETE_EXPENSE:
      return {
        ...state,
        expenses: state.expenses.filter((expense) => expense.id !== payload.id),
      };
    case UPDATE_EXPENSE: {
      const { expenseToUpdate, updatedExpense } = payload;
      return {
        ...state,
        expenses: state.expenses.map((expense) =>
          expense.id === expenseToUpdate.id ? updatedExpense : expense
        ),
      };
    }
    case ADD_BUDGET: {
      return {
        ...state,
        budget: (state.budget + parseFloat(payload)).toFixed(2),
      };
    }
    default: {
      return state;
    }
  }
};

export default expenseTrackerReducer;