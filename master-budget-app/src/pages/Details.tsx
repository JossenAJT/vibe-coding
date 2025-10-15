
import React, { useState, useEffect } from 'react';
import { Expense } from '../types';
import { fetchExpenses } from '../services/api';

const getStatus = (expense: Expense) => {
  const overspend = expense.actual - expense.budget;
  if (overspend > 0) {
    return <span className="badge bg-danger">Exceeded</span>;
  }
  if (expense.actual / expense.budget > 0.9) {
    return <span className="badge bg-warning text-dark">Near to Exceed</span>;
  }
  return <span className="badge bg-success">OK</span>;
};

const Details: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getExpenses = async () => {
      try {
        const data = await fetchExpenses();
        setExpenses(data);
      } catch (err) {
        setError('Failed to fetch expenses.');
      } finally {
        setLoading(false);
      }
    };

    getExpenses();
  }, []);

  if (loading) {
    return <div className="container mt-4 fade-in"><div className="spinner-border text-danger" role="status"><span className="visually-hidden">Loading...</span></div></div>;
  }

  if (error) {
    return <div className="container mt-4 fade-in"><div className="alert alert-danger">{error}</div></div>;
  }

  return (
    <div className="container mt-4 fade-in">
      <h2 className="mb-4" style={{ fontWeight: 700, letterSpacing: '0.04em', color: '#fff' }}>Detailed Budget</h2>
      <div className="table-responsive">
        <table className="table table-hover" style={{ background: '#232526', borderRadius: 12, overflow: 'hidden' }}>
          <thead style={{ background: 'linear-gradient(90deg, #181a1b 60%, #232526 100%)', color: '#fff' }}>
            <tr>
              <th style={{ fontWeight: 600, letterSpacing: '0.03em' }}>Expense Name</th>
              <th style={{ fontWeight: 600, letterSpacing: '0.03em' }}>Business Unit</th>
              <th style={{ fontWeight: 600, letterSpacing: '0.03em' }}>Person In Charge</th>
              <th className="text-end" style={{ fontWeight: 600, letterSpacing: '0.03em' }}>Budget</th>
              <th className="text-end" style={{ fontWeight: 600, letterSpacing: '0.03em' }}>Actual</th>
              <th className="text-end" style={{ fontWeight: 600, letterSpacing: '0.03em' }}>Variance</th>
              <th className="text-center" style={{ fontWeight: 600, letterSpacing: '0.03em' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map(expense => {
              const variance = expense.budget - expense.actual;
              return (
                <tr key={expense.id} style={{ borderBottom: '1px solid #333' }}>
                  <td style={{ color: '#e3e3e3', fontWeight: 500 }}>{expense.name}</td>
                  <td style={{ color: '#e3e3e3' }}>{expense.bu}</td>
                  <td style={{ color: '#e3e3e3' }}>{expense.pic}</td>
                  <td className="text-end" style={{ color: '#e50914', fontWeight: 600 }}>${expense.budget.toLocaleString()}</td>
                  <td className="text-end" style={{ color: '#fff', fontWeight: 600 }}>${expense.actual.toLocaleString()}</td>
                  <td className={`text-end ${variance < 0 ? 'text-danger' : 'text-success'}`} style={{ fontWeight: 600 }}>
                    ${variance.toLocaleString()}
                  </td>
                  <td className="text-center">{getStatus(expense)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Details;
