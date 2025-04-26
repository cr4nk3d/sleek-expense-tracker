<<<<<<< HEAD
=======

>>>>>>> 6e55239b186e8617ffeb830b0cbea5e6e9e49b2d
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Plus, IndianRupee } from "lucide-react";
import { Expense } from "@/types/expense";

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
<<<<<<< HEAD

    if (!amount || parseFloat(amount) <= 0) return;

=======
    
    if (!amount || parseFloat(amount) <= 0) return;
    
>>>>>>> 6e55239b186e8617ffeb830b0cbea5e6e9e49b2d
    const newExpense: Expense = {
      id: uuidv4(),
      amount: parseFloat(amount),
      description: description.trim() || "Expense",
      category,
      date: new Date(),
    };
<<<<<<< HEAD

    onAddExpense(newExpense);

=======
    
    onAddExpense(newExpense);
    
>>>>>>> 6e55239b186e8617ffeb830b0cbea5e6e9e49b2d
    // Reset form
    setAmount("");
    setDescription("");
    setCategory("Other");
  };

  return (
<<<<<<< HEAD
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 mb-6 glass rounded-xl"
    >
      <h2 className="text-lg font-medium text-white">Add New Expense</h2>

=======
    <form onSubmit={handleSubmit} className="space-y-4 p-4 mb-6 glass rounded-xl">
      <h2 className="text-lg font-medium text-white">Add New Expense</h2>
      
>>>>>>> 6e55239b186e8617ffeb830b0cbea5e6e9e49b2d
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <label htmlFor="amount" className="text-sm text-gray-300">
            Amount
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <IndianRupee size={16} />
            </span>
            <input
              id="amount"
              type="number"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full pl-8 py-2 bg-black/50 border border-gray-800 rounded-md text-white"
              placeholder="0.00"
              required
            />
          </div>
        </div>
<<<<<<< HEAD

=======
        
>>>>>>> 6e55239b186e8617ffeb830b0cbea5e6e9e49b2d
        <div className="space-y-2">
          <label htmlFor="category" className="text-sm text-gray-300">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 bg-black/50 border border-gray-800 rounded-md text-white"
          >
            {expenseCategories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
<<<<<<< HEAD

=======
        
>>>>>>> 6e55239b186e8617ffeb830b0cbea5e6e9e49b2d
        <div className="space-y-2">
          <label htmlFor="description" className="text-sm text-gray-300">
            Description
          </label>
          <input
            id="description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 bg-black/50 border border-gray-800 rounded-md text-white"
            placeholder="What was this expense for?"
          />
        </div>
      </div>
<<<<<<< HEAD

      <button
        type="submit"
=======
      
      <button 
        type="submit" 
>>>>>>> 6e55239b186e8617ffeb830b0cbea5e6e9e49b2d
        className="w-3/4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md flex items-center justify-center gap-2 mx-auto"
      >
        <Plus size={16} />
        <span>Add Expense</span>
      </button>
    </form>
  );
}
