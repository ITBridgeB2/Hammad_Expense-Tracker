import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import expensedetails from "./expensedetails";
import { DateTime } from "luxon";
import './styles.css';

const Expense = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleNavigate = () => {
    navigate("/add");
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const res = await expensedetails.getExpenses();
      setExpenses(res.data);
    } catch (error) {
      console.error("Failed to fetch expenses:", error);
    }
  };

  const handleDelete = async (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this expense?"
    );
    if (isConfirmed) {
      try {
        await expensedetails.deleteExpense(id);
        setSelectedExpense(null);
        fetchExpenses();
      } catch (error) {
        console.error("Delete failed:", error);
      }
    }
  };

  const handleEdit = () => {
    if (selectedExpense) {
      setAmount(selectedExpense.amount);
      setCategory(selectedExpense.category);
      setDate(DateTime.fromISO(selectedExpense.date).toISODate());
      setShowForm(true);
    }
  };

  const handleUpdate = async () => {
    try {
      const updatedExpense = {
        id: selectedExpense.id,
        amount,
        category,
        date,
      };
      await expensedetails.updateExpense(updatedExpense);
      alert("Expense updated successfully");
      setShowForm(false);
      setSelectedExpense(null);
      fetchExpenses();
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  return (
    <div className="container">
      <div className="header">
  <h2>Expense Tracker</h2>
  <button onClick={handleNavigate}>Add</button>
</div>

      <h3>MY Expenses</h3>
      <p>
        <strong>
          Total Amount: ₹
          {expenses.reduce(
            (total, exp) => total + parseFloat(exp.amount),0)}
        </strong>
      </p>
      <ul>
        {expenses.map((exp, index) => (
          <li
            key={exp.id}
            onClick={() => setSelectedExpense(exp)}
            style={{ cursor: "pointer" }}
          >
            {index + 1}. ₹{exp.amount} - {exp.category} -{" "}
            {DateTime.fromISO(exp.date).toISODate()}
          </li>
        ))}
      </ul>

      {selectedExpense && (
        <div style={{ border: "1px solid gray", padding: "10px", marginTop: "20px" }}>
          <h4>Expense Details</h4>
          <p>
            <strong>Amount:</strong> ₹{selectedExpense.amount}
          </p>
          <p>
            <strong>Category:</strong> {selectedExpense.category}
          </p>
          <p>
            <strong>Date:</strong> {DateTime.fromISO(selectedExpense.date).toISODate()}
          </p>
          <button onClick={handleEdit}>Edit</button>
          <button onClick={() => handleDelete(selectedExpense.id)}>Delete</button>
        </div>
      )}

      {showForm && (
        <div style={{ border: "1px solid gray", padding: "10px", marginTop: "20px" }}>
          <h4>Edit Expense</h4>
          <input
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Amount"
          />
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Category"
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <button onClick={handleUpdate}>Update Expense</button>
          <button onClick={() => setShowForm(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default Expense;
