import { useState, useEffect } from "react";
import { Expense } from "./types/expense";
import { ExpenseForm } from "./components/ExpenseForm";
import { DailyExpenses } from "./components/DailyExpenses";
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

  // Load expenses from localStorage on mount
  useEffect(() => {
    const savedExpenses = localStorage.getItem("expenses");
    if (savedExpenses) {
      try {
        const parsed = JSON.parse(savedExpenses);
        const formattedExpenses = parsed.map((exp: any) => ({
          ...exp,
          date: new Date(exp.date),
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
    setExpenses((prev) => [newExpense, ...prev]);
  };

const handleDateRangeChange = (dates: [Date, Date]) => {
  const [start, end] = dates;
  setDateRange({ 
    from: start ? startOfDay(start) : null, 
    to: end ? endOfDay(end) : null 
  });
};

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto py-8 px-4 max-w-5xl">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Sleek Spend</h1>
          <p className="text-gray-400">Track your daily expenses with style</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            <ExpenseForm onAddExpense={handleAddExpense} />
            <DailyExpenses expenses={expenses} />
          </div>

          <div>
            <div className="mb-6">
              <h2 className="text-xl font-medium mb-2">Select Date Range</h2>
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
            <ExpenseSummary expenses={expenses} dateRange={dateRange} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
