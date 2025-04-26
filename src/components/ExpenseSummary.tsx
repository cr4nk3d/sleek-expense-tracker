import { useEffect, useState } from "react";
import {
  endOfMonth,
  format,
  isSameMonth,
  isWithinInterval,
  startOfMonth,
} from "date-fns";
import { Expense, DateRange } from "@/types/expense";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { IndianRupee } from "lucide-react";

interface ExpenseSummaryProps {
  expenses: Expense[];
  dateRange: DateRange;
}

export function ExpenseSummary({ expenses, dateRange }: ExpenseSummaryProps) {
  const [filteredExpenses, setFilteredExpenses] = useState<Expense[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [categoryTotals, setCategoryTotals] = useState<Record<string, number>>(
    {}
  );

  useEffect(() => {
    let filtered: Expense[];

    if (dateRange.from && dateRange.to) {
      filtered = expenses.filter((expense) => {
        const expenseDate = new Date(expense.date);
        return isWithinInterval(expenseDate, {
          start: dateRange.from as Date,
          end: dateRange.to as Date,
        });
      });
    } else if (dateRange.from) {
      filtered = expenses.filter((expense) => {
        const expenseDate = new Date(expense.date);
        return isWithinInterval(expenseDate, {
          start: dateRange.from as Date,
          end: dateRange.from as Date,
        });
      });
    } else {
      const today = new Date();
      filtered = expenses.filter((expense) => {
        return isSameMonth(new Date(expense.date), today);
      });
    }

    setFilteredExpenses(filtered);

    const total = filtered.reduce((sum, expense) => sum + expense.amount, 0);
    setTotalAmount(total);

    const catTotals = filtered.reduce((acc, expense) => {
      const { category, amount } = expense;

      if (!acc[category]) {
        acc[category] = 0;
      }

      acc[category] += amount;
      return acc;
    }, {} as Record<string, number>);

    setCategoryTotals(catTotals);
  }, [expenses, dateRange]);

  const getDateRangeText = () => {
    if (dateRange.from && dateRange.to) {
      return `${format(dateRange.from, "MMM d")} - ${format(
        dateRange.to,
        "MMM d, yyyy"
      )}`;
    } else if (dateRange.from) {
      return format(dateRange.from, "MMMM d, yyyy");
    } else {
      const today = new Date();
      return format(today, "MMMM yyyy");
    }
  };

  const getCategoryBreakdown = () => {
    return Object.entries(categoryTotals)
      .sort((a, b) => b[1] - a[1])
      .map(([category, amount]) => ({
        category,
        amount,
        percentage: (amount / totalAmount) * 100,
      }));
  };

  return (
    <Card className="bg-uber-charcoal border-gray-800">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span className="text-lg font-medium">Summary</span>
          <span className="text-sm">{getDateRangeText()}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center mb-6">
          <span className="block text-4xl font-bold flex items-center justify-center gap-2">
            <IndianRupee size={32} className="text-gray-400" />
            {totalAmount.toFixed(2)}
          </span>
          <span className="text-sm text-gray-400">
            {filteredExpenses.length} expense
            {filteredExpenses.length !== 1 ? "s" : ""}
          </span>
        </div>

        <Separator className="my-4 bg-gray-800" />

        <div className="space-y-2">
          <h4 className="text-sm font-medium mb-2">Category Breakdown</h4>

          {getCategoryBreakdown().map(({ category, amount, percentage }) => (
            <div key={category} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>{category}</span>
                <span className="flex items-center gap-1">
                  <IndianRupee size={12} className="text-gray-400" />
                  {amount.toFixed(2)}
                </span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-primary h-1.5 rounded-full"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          ))}

          {Object.keys(categoryTotals).length === 0 && (
            <p className="text-center text-sm text-gray-400 py-4">
              No expenses in this time period
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
