import React, { useState } from "react";
import expensedetails from "./expensedetails";
import { useNavigate } from "react-router-dom";

const AddExpense = () => {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");
    const navigate = useNavigate();
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await expensedetails.setExpense(amount, category, date);
      setMessage(res.data.message);

     
      setAmount("");
      setCategory("");
      setDate("");
      navigate("/");
    } catch (error) {
      console.error("Submission failed:", error);
      setMessage("Failed to submit expense.");
    }
  };

  const handleNavigate = () => {
    navigate("/");
  };


  return (
    <div className="container">
      <h2>Add New Expense</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Amount"
          value={amount}
          type="text"
          onChange={(e) => setAmount(e.target.value)}
        />
        <input
          placeholder="Category"
          value={category}
          type="text"
          onChange={(e) => setCategory(e.target.value)}
        />
        <input
          placeholder="Date"
          value={date}
          type="date"
          onChange={(e) => setDate(e.target.value)}
        />
        <button type="submit">Add Expense</button>
        <button onClick={handleNavigate}>Back</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddExpense;
