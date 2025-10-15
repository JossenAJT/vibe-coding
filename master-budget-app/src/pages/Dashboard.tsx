
import React, { useState, useMemo, useEffect } from 'react';
import { Expense } from '../types';
import { fetchExpenses } from '../services/api';
import { businessUnits, personsInCharge } from '../data/mockData';


const Dashboard: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedBu, setSelectedBu] = useState<string>('All');
  const [selectedPic, setSelectedPic] = useState<string>('All');

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

  const filteredExpenses = useMemo(() => {
    return expenses
      .filter(e => selectedBu === 'All' || e.bu === selectedBu)
      .filter(e => selectedPic === 'All' || e.pic === selectedPic);
  }, [expenses, selectedBu, selectedPic]);

  const totalBudget = filteredExpenses.reduce((sum, e) => sum + e.budget, 0);
  const totalActual = filteredExpenses.reduce((sum, e) => sum + e.actual, 0);
  const variance = totalBudget - totalActual;
  const overBudgetCount = filteredExpenses.filter(e => e.actual > e.budget).length;

  if (loading) {
    return <div className="container mt-4 fade-in"><div className="spinner-border text-danger" role="status"><span className="visually-hidden">Loading...</span></div></div>;
  }

  if (error) {
    return <div className="container mt-4 fade-in"><div className="alert alert-danger">{error}</div></div>;
  }

  return (
    <div className="container mt-4 fade-in">
      <h2 className="mb-4" style={{ fontWeight: 700, letterSpacing: '0.04em', color: '#fff' }}>Dashboard</h2>

      <div className="row mb-4" style={{ gap: '1rem' }}>
        <div className="col-md-6">
          <label htmlFor="buFilter" className="form-label" style={{ color: '#e3e3e3', fontWeight: 500 }}>Filter by Business Unit</label>
          <select id="buFilter" className="form-select" value={selectedBu} onChange={e => setSelectedBu(e.target.value)}>
            <option value="All">All Business Units</option>
            {businessUnits.map(bu => <option key={bu} value={bu}>{bu}</option>)}
          </select>
        </div>
        <div className="col-md-6">
          <label htmlFor="picFilter" className="form-label" style={{ color: '#e3e3e3', fontWeight: 500 }}>Filter by Person In Charge</label>
          <select id="picFilter" className="form-select" value={selectedPic} onChange={e => setSelectedPic(e.target.value)}>
            <option value="All">All PICs</option>
            {personsInCharge.map(pic => <option key={pic} value={pic}>{pic}</option>)}
          </select>
        </div>
      </div>

      <div className="row" style={{ gap: '1rem' }}>
        <div className="col-md-4 mb-3">
          <div className="card text-center h-100 fade-in" style={{ background: 'linear-gradient(135deg, #232526 60%, #181a1b 100%)' }}>
            <div className="card-body">
              <h5 className="card-title" style={{ color: '#e3e3e3', fontWeight: 600 }}>Total Budget</h5>
              <p className="card-text fs-4" style={{ color: '#e50914', fontWeight: 700 }}>${totalBudget.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card text-center h-100 fade-in" style={{ background: 'linear-gradient(135deg, #232526 60%, #181a1b 100%)' }}>
            <div className="card-body">
              <h5 className="card-title" style={{ color: '#e3e3e3', fontWeight: 600 }}>Total Actual Spend</h5>
              <p className="card-text fs-4" style={{ color: '#fff', fontWeight: 700 }}>${totalActual.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className={`card text-center h-100 fade-in`} style={{ background: variance >= 0 ? 'linear-gradient(135deg, #1db954 60%, #232526 100%)' : 'linear-gradient(135deg, #e50914 60%, #232526 100%)', color: '#fff' }}>
            <div className="card-body">
              <h5 className="card-title" style={{ color: '#fff', fontWeight: 600 }}>Variance</h5>
              <p className="card-text fs-4" style={{ color: '#fff', fontWeight: 700 }}>${variance.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 fade-in">
        <div className="card" style={{ background: '#232526' }}>
          <div className="card-body">
            <h5 className="card-title" style={{ color: '#e3e3e3', fontWeight: 600 }}>Summary</h5>
            <p style={{ color: '#fff' }}><strong>Items Over Budget:</strong> {overBudgetCount}</p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
