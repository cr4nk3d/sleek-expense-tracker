
import { useState, useEffect } from "react";
import { Expense, DateRange } from "@/types/expense";
import { ExpenseForm } from "@/components/ExpenseForm";
import { DailyExpenses } from "@/components/DailyExpenses";
import { DateFilter } from "@/components/DateFilter";
import { ExpenseSummary } from "@/components/ExpenseSummary";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [dateRange, setDateRange] = useState<DateRange>({ from: undefined, to: undefined });
  const { toast } = useToast();

  // Load expenses from localStorage on mount
  useEffect(() => {
    const savedExpenses = localStorage.getItem("expenses");
    if (savedExpenses) {
      try {
        // Parse the saved data and convert date strings back to Date objects
        const parsed = JSON.parse(savedExpenses);
        const formattedExpenses = parsed.map((exp: any) => ({
          ...exp,
          date: new Date(exp.date)
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

  // Add a new expense
  const handleAddExpense = (newExpense: Expense) => {
    setExpenses(prev => [newExpense, ...prev]);
    toast({
      title: "Expense added",
      description: `$${newExpense.amount.toFixed(2)} for ${newExpense.description}`,
    });
  };

  // Handle date range filter change
  const handleDateRangeChange = (range: DateRange) => {
    setDateRange(range);
  };

  // Reset date filter
  const handleResetFilter = () => {
    setDateRange({ from: undefined, to: undefined });
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto py-8 px-4 max-w-5xl">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Sleek Spend</h1>
          <p className="text-gray-400">Track your daily expenses with style</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mx-auto">
          <div className="md:col-span-2 w-full">
            <ExpenseForm onAddExpense={handleAddExpense} />
            
            <DateFilter 
              dateRange={dateRange}
              onDateRangeChange={handleDateRangeChange}
              onResetFilter={handleResetFilter}
            />
            
            <DailyExpenses expenses={expenses} />
          </div>
          
          <div className="w-full">
            <ExpenseSummary expenses={expenses} dateRange={dateRange} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
