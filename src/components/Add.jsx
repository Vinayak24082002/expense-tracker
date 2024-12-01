import { useState } from "react";
import AddIcon from "../assets/add.svg";

const Add = ({ handleAddExpense, handleAddBudget }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState("expense");
  const tabOptions = [
    { label: "Expense", value: "expense", submitHandler: handleAddExpense },
    { label: "Budget", value: "budget", submitHandler: handleAddBudget },
  ];
  const [amount, setAmount] = useState(null);
  const [note, setNote] = useState("");

  const resetDialog = () => {
    setAmount(null);
    setNote("");
    setCurrentTab("expense");
    setIsOpen(false);
  };

  return (
    <>
      <img
        src={AddIcon}
        className="cursor-pointer w-16 h-8 md:w-10 md:h-10"
        onClick={() => setIsOpen(!isOpen)}
        alt="Add"
      />
      {isOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div
            className="absolute inset-0 bg-transparent z-10"
            onClick={resetDialog}
          />
          <div className="relative flex flex-col gap-4 bg-black font-semibold py-6 px-5 md:py-8 md:px-10 border rounded-xl w-11/12 max-w-md md:max-w-lg z-20 shadow-lg">
            <div className="flex border-b pb-2 gap-2">
              {tabOptions.map(({ label, value }) => (
                <button
                  key={value}
                  className={`flex-1 py-2 px-4 border-b-2 ${
                    currentTab === value
                      ? "border-blue-500 text-blue-500 font-bold"
                      : "border-transparent text-gray-500"
                  }`}
                  onClick={() => setCurrentTab(value)}
                >
                  {label}
                </button>
              ))}
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!amount) return;
                tabOptions
                  .find((tab) => tab.value === currentTab)
                  .submitHandler({ amount, note });
                resetDialog();
              }}
              className="flex flex-col gap-4"
            >
              <Input
                type="number"
                name="amount"
                label={`Amount of ${currentTab}`}
                placeholder={`Enter Your ${currentTab}`}
                className="bg-gray-50 px-4 py-2 rounded-lg border border-gray-300"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                min={0}
                step={0.01}
              />
              {currentTab === "expense" && (
                <Input
                  type="textarea"
                  name="note"
                  label="Note (Optional)"
                  placeholder="Enter a note to remember this expense"
                  className="bg-gray-50 px-4 py-2 rounded-lg border border-gray-300"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
              )}
              <button
                type="submit"
                className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              >
                Add
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

const Input = ({
  type = "text",
  value = "",
  label = "",
  placeholder = "",
  className = "",
  onChange = () => {},
  required = false,
  ...rest
}) => (
  <label className="flex flex-col gap-2">
    {label && (
      <span className="text-sm md:text-base font-medium text-gray-700">
        {label}
      </span>
    )}
    {type === "textarea" ? (
      <textarea
        required={required}
        value={value}
        placeholder={placeholder}
        className={className}
        onChange={onChange}
        {...rest}
      />
    ) : (
      <input
        required={required}
        type={type}
        value={value}
        placeholder={placeholder}
        className={className}
        onChange={onChange}
        {...rest}
      />
    )}
  </label>
);

export default Add;
