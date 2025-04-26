<<<<<<< HEAD
=======

>>>>>>> 6e55239b186e8617ffeb830b0cbea5e6e9e49b2d
import { useState, useEffect } from "react";
import { Expense } from "./types/expense";
import { ExpenseForm } from "./components/ExpenseForm";
import { DailyExpenses } from "./components/DailyExpenses";
<<<<<<< HEAD
import { ExpenseSummary } from "./components/ExpenseSummary";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { startOfDay, endOfDay } from "date-fns";

function App() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [dateRange, setDateRange] = useState<{
    from: Date | null;
    to: Date | null;
  }>({
    from: startOfDay(new Date()), // Default to today
    to: endOfDay(new Date()), // Default to today
  });
=======

function App() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
>>>>>>> 6e55239b186e8617ffeb830b0cbea5e6e9e49b2d

  // Load expenses from localStorage on mount
  useEffect(() => {
    const savedExpenses = localStorage.getItem("expenses");
    if (savedExpenses) {
      try {
        const parsed = JSON.parse(savedExpenses);
        const formattedExpenses = parsed.map((exp: any) => ({
          ...exp,
<<<<<<< HEAD
          date: new Date(exp.date),
=======
          date: new Date(exp.date)
>>>>>>> 6e55239b186e8617ffeb830b0cbea5e6e9e49b2d
        }));
        setExpenses(formattedExpenses);
      } catch (error) {
        console.error("Failed to parse expenses from localStorage", error);
      }
    }
  }, []);

  // Save expenses to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const handleAddExpense = (newExpense: Expense) => {
<<<<<<< HEAD
    setExpenses((prev) => [newExpense, ...prev]);
  };

  const handleDateRangeChange = (dates: [Date, Date]) => {
    setDateRange({ from: dates[0], to: dates[1] });
=======
    setExpenses(prev => [newExpense, ...prev]);
>>>>>>> 6e55239b186e8617ffeb830b0cbea5e6e9e49b2d
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto py-8 px-4 max-w-5xl">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Sleek Spend</h1>
          <p className="text-gray-400">Track your daily expenses with style</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mx-auto">
<<<<<<< HEAD
          <div className="md:col-span-2">
            <ExpenseForm onAddExpense={handleAddExpense} />
            <DailyExpenses expenses={expenses} />
          </div>
          {/* Date Range Selector */}
          <div className="mb-5 mx-auto">
            <h2 className="text-xl font-medium text-white mb-2">
              Select Date Range
            </h2>
            <DatePicker
              selected={dateRange.from}
              onChange={handleDateRangeChange}
              startDate={dateRange.from}
              endDate={dateRange.to}
              selectsRange
              inline
              dateFormat="MMMM d, yyyy"
            />
          </div>
          <div className="md:col-span-1">
            {/* Expense Summary with dynamic date range */}
            <ExpenseSummary expenses={expenses} dateRange={dateRange} />
          </div>
=======
          <div className="md:col-span-2 w-full">
            <ExpenseForm onAddExpense={handleAddExpense} />
            <DailyExpenses expenses={expenses} />
          </div>
>>>>>>> 6e55239b186e8617ffeb830b0cbea5e6e9e49b2d
        </div>
      </div>
    </div>
  );
}

export default App;
