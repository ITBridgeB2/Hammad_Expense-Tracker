import axios from "axios";

const URL = 'http://localhost:2510/expenses';

const setExpense = (amount, category, date) => {
    return axios.post(URL, { amount, category, date });
  };

  const getExpenses = () => {
    return axios.get(URL);
  };

  const deleteExpense = (id) => {
    return axios.delete(`${URL}/${id}`);
  };

  const updateExpense = (expense) => {
    return axios.put(`${URL}/${expense.id}`, expense);
  };

export default{
    setExpense,
    getExpenses,
    deleteExpense,
    updateExpense
}