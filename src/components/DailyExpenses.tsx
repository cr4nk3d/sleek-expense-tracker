
import { useEffect, useState } from "react";
import { format, isToday, isYesterday } from "date-fns";
import { Expense } from "@/types/expense";
import { Separator } from "@/components/ui/separator";

interface DailyExpensesProps {
  expenses: Expense[];
}

export function DailyExpenses({ expenses }: DailyExpensesProps) {
  const [dailyExpenses, setDailyExpenses] = useState<Record<string, Expense[]>>({});
  
  // Group expenses by day
  useEffect(() => {
    const groupedByDay = expenses.reduce((acc, expense) => {
      const dateKey = format(new Date(expense.date), "yyyy-MM-dd");
      
      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      
      acc[dateKey].push(expense);
      return acc;
    }, {} as Record<string, Expense[]>);
    
    setDailyExpenses(groupedByDay);
  }, [expenses]);

  // Get the date keys sorted by most recent first
  const sortedDates = Object.keys(dailyExpenses).sort((a, b) => {
    return new Date(b).getTime() - new Date(a).getTime();
  });
  
  // Format date label
  const formatDateLabel = (dateStr: string) => {
    const date = new Date(dateStr);
    
    if (isToday(date)) {
      return "Today";
    } else if (isYesterday(date)) {
      return "Yesterday";
    } else {
      return format(date, "EEEE, MMMM d");
    }
  };

  // Calculate total for a day
  const calculateDailyTotal = (expenses: Expense[]) => {
    return expenses.reduce((sum, exp) => sum + exp.amount, 0).toFixed(2);
  };

  if (sortedDates.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-400">No expenses recorded yet. Start adding some!</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {sortedDates.map((dateKey) => {
        const dayExpenses = dailyExpenses[dateKey];
        
        return (
          <div key={dateKey} className="glass rounded-xl overflow-hidden">
            <div className="flex justify-between items-center p-4 bg-black/50">
              <h3 className="text-lg font-medium">{formatDateLabel(dateKey)}</h3>
              <div className="flex flex-col items-end">
                <span className="text-sm text-gray-400">{dayExpenses.length} items</span>
                <span className="text-lg font-semibold text-white">
                  ${calculateDailyTotal(dayExpenses)}
                </span>
              </div>
            </div>
            
            <div>
              {dayExpenses.map((expense, idx) => (
                <div key={expense.id}>
                  {idx > 0 && <Separator className="bg-gray-800" />}
                  <div className="flex items-center justify-between p-4">
                    <div className="flex flex-col">
                      <span className="font-medium">{expense.description}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs px-2 py-0.5 bg-muted rounded-full text-gray-300">
                          {expense.category}
                        </span>
                        <span className="text-xs text-gray-400">
                          {format(new Date(expense.date), "h:mm a")}
                        </span>
                      </div>
                    </div>
                    <span className="font-semibold">${expense.amount.toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
