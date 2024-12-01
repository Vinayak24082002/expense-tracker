import AddIcon from "./assets/add.svg";
import OptionsIcon from "./assets/options.svg";
import Add from "./components/Add.jsx";
import { useSelector, useDispatch } from "react-redux";
import { addBudget, addExpense } from "./features/expenseTracker";

function App() {
  const { expenses, budget } = useSelector((store) => store);
  const totalExpenses = expenses.reduce(
    (acc, expense) => (parseFloat(acc) + parseFloat(expense.amount)).toFixed(2),
    0
  );
  const dispatch = useDispatch();

  return (
    <div className="h-screen max-h-screen w-screen flex flex-col items-center bg-black">
      <h1 className="h-20 text-2xl md:text-4xl font-bold p-4 px-6 md:px-16 w-full flex justify-start items-center bg-black">
        Expense Tracker
      </h1>
      <div className="w-full max-w-5xl flex-1 flex flex-col gap-5 p-6 md:p-10">
        <div className="w-full flex flex-col lg:flex-row gap-6">
          <div className="grid gap-6 grid-cols-1 lg:grid-cols-2 flex-grow">
            <div className="flex flex-col text-xl p-4 md:p-6 border-4 rounded-xl bg-black">
              Total Expenses
              <span className="text-2xl md:text-3xl font-bold">${totalExpenses}</span>
            </div>
            <div className="flex flex-col text-xl p-4 md:p-6 border-4 rounded-xl bg-black">
              Total Budget
              <span className="text-2xl md:text-3xl font-bold">${budget}</span>
              <span className="text-sm italic font-normal mt-2">
                Remaining Balance: ${(budget - totalExpenses).toFixed(2)}
              </span>
            </div>
          </div>
          <button className="w-full lg:w-1/6 flex flex-col text-lg py-4 justify-center items-center bg-blue-500 text-black rounded-xl hover:bg-blue-600 transition">
            <Add
              handleAddExpense={(payload) => dispatch(addExpense(payload))}
              handleAddBudget={({ amount }) => dispatch(addBudget(amount))}
            />
          </button>
        </div>
        <span className="text-lg font-light italic mt-4">Expense History</span>
        <div className="flex-1 overflow-auto flex flex-col gap-4">
          {expenses.map((data) => (
            <ExpenseItem key={data.id} data={data} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;

export const ExpenseItem = ({ data: { id, amount, note, timestamp } }) => {
  return (
    <div
      id={id}
      className="flex gap-4 md:gap-6 py-4 px-6 rounded-lg border-4 bg-black shadow"
    >
      <span className="text-2xl md:text-3xl font-semibold flex items-center justify-center">
        ${amount}
      </span>
      <div className="flex-1 self-stretch flex flex-col">
        <span className="text-lg md:text-xl font-medium">{note}</span>
        <span className="text-sm italic font-normal mt-1">{timestamp}</span>
      </div>
      <div className="p-2 rounded-xl hover:shadow active:shadow-inner">
        <img src={OptionsIcon} className="h-6 md:h-8 aspect-square" />
      </div>
    </div>
  );
};
