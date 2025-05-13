import cors from 'cors';
import express from 'express';
import mysql from 'mysql2';


const expenseapp = express();
expenseapp.use(cors());
expenseapp.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'expense_tracker'
});

db.connect(err => {
  if (err) {
    console.error('Database connection failed:', err);
    process.exit(1);
  }
  console.log('Connected to MySQL database.');
});


expenseapp.post('/expenses' , async (req , res) =>{
    let{amount , category , date} = req.body

    if (!amount || !category || !date) {
        return res.status(400).json({ message: 'All fields are required' });
      }
    
      db.query(
        'INSERT INTO expenses (amount, category, date) VALUES (?, ?, ?)',
        [amount, category, date],
        (err, result) => {
          if (err) {
            console.error('Insert failed:', err);
            return res.status(500).json({ message: 'Failed to add expense' });
          }
          res.status(201).json({ message: 'Expense added successfully', id: result.insertId });
        }
      );
    });


    expenseapp.get("/expenses", (req, res) => {
        db.query("SELECT * FROM expenses ORDER BY date DESC", (err, results) => {
          if (err) {
            console.error("Fetch error:", err);
            return res.status(500).json({ message: "Failed to fetch expenses" });
          }
          res.status(200).json(results);
        });
      });
      

      expenseapp.put('/expenses/:id', (req, res) => {
        const { id } = req.params;
        const { amount, category, date } = req.body;
      
        if (!amount || !category || !date) {
          return res.status(400).json({ message: 'All fields are required' });
        }
      
        db.query(
          'UPDATE expenses SET amount = ?, category = ?, date = ? WHERE id = ?',
          [amount, category, date, id],
          (err, result) => {
            if (err) {
              console.error('Update failed:', err);
              return res.status(500).json({ message: 'Failed to update expense' });
            }
            res.status(200).json({ message: 'Expense updated successfully' });
          }
        );
      });
      
 
      expenseapp.delete("/expenses/:id", (req, res) => {
        const { id } = req.params;
        db.query("DELETE FROM expenses WHERE id = ?", [id], (err, result) => {
          if (err) {
            console.error("Delete error:", err);
            return res.status(500).json({ message: "Failed to delete expense" });
          }
          res.status(200).json({ message: "Expense deleted successfully" });
        });
      });
      

expenseapp.listen(2510, () => {
    console.log('Server is running on port 2510');
  });