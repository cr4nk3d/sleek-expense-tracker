
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Expense } from "@/types/expense";
import { v4 as uuidv4 } from "uuid";
import { Plus } from "lucide-react";

const expenseCategories = [
  "Food",
  "Transportation",
  "Entertainment",
  "Shopping",
  "Utilities",
  "Housing",
  "Healthcare",
  "Other",
];

interface ExpenseFormProps {
  onAddExpense: (expense: Expense) => void;
}

export function ExpenseForm({ onAddExpense }: ExpenseFormProps) {
  const [amount, setAmount] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [category, setCategory] = useState<string>("Other");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount || parseFloat(amount) <= 0) return;
    
    const newExpense: Expense = {
      id: uuidv4(),
      amount: parseFloat(amount),
      description: description.trim() || "Expense",
      category,
      date: new Date(),
    };
    
    onAddExpense(newExpense);
    
    // Reset form
    setAmount("");
    setDescription("");
    setCategory("Other");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 mb-6 glass rounded-xl">
      <h2 className="text-lg font-medium text-white">Add New Expense</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <label htmlFor="amount" className="text-sm text-gray-300">
            Amount
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
            <Input
              id="amount"
              type="number"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="pl-8 bg-black/50 border-gray-800"
              placeholder="0.00"
              required
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="category" className="text-sm text-gray-300">
            Category
          </label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="bg-black/50 border-gray-800">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent className="bg-uber-charcoal border-gray-800">
              {expenseCategories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="description" className="text-sm text-gray-300">
            Description
          </label>
          <Input
            id="description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="bg-black/50 border-gray-800"
            placeholder="What was this expense for?"
          />
        </div>
      </div>
      
      <Button 
        type="submit" 
        className="w-full bg-primary hover:bg-primary/90 flex gap-2 items-center"
      >
        <Plus size={16} />
        <span>Add Expense</span>
      </Button>
    </form>
  );
}
