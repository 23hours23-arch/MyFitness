import React, { useState, useEffect } from 'react';

export default function FitnessTracker() {
  const [goals, setGoals] = useState([]);
  const [showAddGoal, setShowAddGoal] = useState(false);
  const [newGoal, setNewGoal] = useState({ name: '', target: '', unit: '' });
  const [dailyProgress, setDailyProgress] = useState({});
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedGoals = localStorage.getItem('fitnessGoals');
    const savedProgress = localStorage.getItem('fitnessProgress');
    if (savedGoals) setGoals(JSON.parse(savedGoals));
    if (savedProgress) setDailyProgress(JSON.parse(savedProgress));
  }, []);

  // Save goals to localStorage
  useEffect(() => {
    localStorage.setItem('fitnessGoals', JSON.stringify(goals));
  }, [goals]);

  // Save progress to localStorage
  useEffect(() => {
    localStorage.setItem('fitnessProgress', JSON.stringify(dailyProgress));
  }, [dailyProgress]);

  const addGoal = () => {
    if (!newGoal.name.trim() || !newGoal.target) {
      alert('Please fill in all fields');
      return;
    }
    const goal = {
      id: Date.now(),
      name: newGoal.name,
      target: parseFloat(newGoal.target),
      unit: newGoal.unit || '',
      createdAt: new Date().toISOString(),
    };
    setGoals([...goals, goal]);
    setNewGoal({ name: '', target: '', unit: '' });
    setShowAddGoal(false);
  };

  const deleteGoal = (id) => {
    setGoals(goals.filter(g => g.id !== id));
  };

  const updateProgress = (goalId, value) => {
    const key = `${selectedDate}_${goalId}`;
    const numValue = value === '' ? undefined : parseFloat(value);
    setDailyProgress(prev => {
      const updated = { ...prev };
      if (numValue === undefined) {
        delete updated[key];
      } else {
        updated[key] = numValue;
      }
      return updated;
    });
  };

  const getProgress = (goalId) => {
    const key = `${selectedDate}_${goalId}`;
    return dailyProgress[key] || 0;
  };

  const getProgressPercent = (goalId) => {
    const progress = getProgress(goalId);
    const goal = goals.find(g => g.id === goalId);
    if (!goal) return 0;
    return Math.min(100, (progress / goal.target) * 100);
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <style>{`
        * {
          box-sizing: border-box;
        }
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          background: #f5f5f5;
          margin: 0;
        }
        .header {
          margin-bottom: 30px;
        }
        .header h1 {
          margin: 0 0 8px 0;
          font-size: 28px;
          font-weight: 600;
          color: #1a1a1a;
        }
        .header p {
          margin: 0;
          color: #666;
          font-size: 14px;
        }
        .date-selector {
          display: flex;
          gap: 10px;
          align-items: center;
          margin-bottom: 20px;
          padding: 12px;
          background: white;
          border-radius: 8px;
          border: 1px solid #e0e0e0;
        }
        .date-selector label {
          font-size: 14px;
          font-weight: 500;
          color: #333;
          min-width: 40px;
        }
        .date-selector input {
          flex: 1;
          padding: 8px 12px;
          border: 1px solid #ddd;
          border-radius: 6px;
          font-size: 14px;
        }
        .goals-container {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 20px;
        }
        .goal-card {
          background: white;
          border: 1px solid #e0e0e0;
          border-radius: 12px;
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .goal-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }
        .goal-title {
          font-size: 16px;
          font-weight: 600;
          color: #1a1a1a;
          margin: 0;
        }
        .goal-unit {
          font-size: 12px;
          color: #999;
        }
        .delete-btn {
          background: none;
          border: none;
          color: #d32f2f;
          cursor: pointer;
          font-size: 18px;
          padding: 0;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 4px;
          transition: background 0.2s;
        }
        .delete-btn:hover {
          background: #ffebee;
        }
        .progress-section {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .progress-bar {
          height: 8px;
          background: #e0e0e0;
          border-radius: 4px;
          overflow: hidden;
        }
        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #4CAF50, #45a049);
          border-radius: 4px;
          transition: width 0.3s ease;
        }
        .progress-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 13px;
        }
        .progress-label {
          color: #666;
        }
        .progress-percent {
          font-weight: 600;
          color: #4CAF50;
        }
        .input-section {
          display: flex;
          gap: 8px;
          align-items: flex-end;
        }
        .input-section input {
          flex: 1;
          padding: 8px 12px;
          border: 1px solid #ddd;
          border-radius: 6px;
          font-size: 14px;
          min-width: 0;
        }
        .input-section button {
          padding: 8px 16px;
          background: #4CAF50;
          color: white;
          border: none;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.2s;
          white-space: nowrap;
        }
        .input-section button:hover {
          background: #45a049;
        }
        .input-section button:active {
          transform: scale(0.98);
        }
        .add-goal-section {
          background: white;
          border: 1px solid #e0e0e0;
          border-radius: 12px;
          padding: 16px;
          margin-bottom: 20px;
        }
        .add-goal-btn {
          width: 100%;
          padding: 12px;
          background: #f0f0f0;
          border: 2px dashed #ddd;
          border-radius: 8px;
          color: #666;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }
        .add-goal-btn:hover {
          background: #e8e8e8;
          border-color: #ccc;
        }
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-bottom: 12px;
        }
        .form-group label {
          font-size: 13px;
          font-weight: 500;
          color: #333;
        }
        .form-group input {
          padding: 10px 12px;
          border: 1px solid #ddd;
          border-radius: 6px;
          font-size: 14px;
        }
        .form-actions {
          display: flex;
          gap: 8px;
          justify-content: flex-end;
        }
        .form-actions button {
          padding: 10px 16px;
          border: none;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }
        .form-actions .save-btn {
          background: #4CAF50;
          color: white;
        }
        .form-actions .save-btn:hover {
          background: #45a049;
        }
        .form-actions .cancel-btn {
          background: #f0f0f0;
          color: #333;
        }
        .form-actions .cancel-btn:hover {
          background: #e0e0e0;
        }
        .empty-state {
          text-align: center;
          padding: 40px 20px;
          color: #999;
        }
        .empty-state p {
          font-size: 14px;
          margin: 0;
        }
      `}</style>

      <div className="header">
        <h1>Fitness Tracker</h1>
        <p>Track your daily fitness goals</p>
      </div>

      <div className="date-selector">
        <label>Date:</label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div>

      {/* Add Goal Section */}
      <div className="add-goal-section">
        {!showAddGoal ? (
          <button className="add-goal-btn" onClick={() => setShowAddGoal(true)}>
            + Add new goal
          </button>
        ) : (
          <>
            <div className="form-group">
              <label>Goal name</label>
              <input
                type="text"
                placeholder="e.g., Push-ups, Running distance"
                value={newGoal.name}
                onChange={(e) => setNewGoal({ ...newGoal, name: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Target amount</label>
              <input
                type="number"
                placeholder="e.g., 30"
                value={newGoal.target}
                onChange={(e) => setNewGoal({ ...newGoal, target: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Unit (optional)</label>
              <input
                type="text"
                placeholder="e.g., reps, km, minutes"
                value={newGoal.unit}
                onChange={(e) => setNewGoal({ ...newGoal, unit: e.target.value })}
              />
            </div>
            <div className="form-actions">
              <button className="cancel-btn" onClick={() => setShowAddGoal(false)}>
                Cancel
              </button>
              <button className="save-btn" onClick={addGoal}>
                Add goal
              </button>
            </div>
          </>
        )}
      </div>

      {/* Goals List */}
      {goals.length === 0 ? (
        <div className="empty-state">
          <p>No goals yet. Add one to get started!</p>
        </div>
      ) : (
        <div className="goals-container">
          {goals.map((goal) => (
            <div key={goal.id} className="goal-card">
              <div className="goal-header">
                <div>
                  <h3 className="goal-title">{goal.name}</h3>
                  <span className="goal-unit">Target: {goal.target} {goal.unit}</span>
                </div>
                <button
                  className="delete-btn"
                  onClick={() => deleteGoal(goal.id)}
                  title="Delete goal"
                >
                  ✕
                </button>
              </div>

              <div className="progress-section">
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${getProgressPercent(goal.id)}%` }}
                  />
                </div>
                <div className="progress-info">
                  <span className="progress-label">
                    {getProgress(goal.id)} / {goal.target} {goal.unit}
                  </span>
                  <span className="progress-percent">
                    {Math.round(getProgressPercent(goal.id))}%
                  </span>
                </div>
              </div>

              <div className="input-section">
                <input
                  type="number"
                  placeholder="Enter today's progress"
                  value={getProgress(goal.id) || ''}
                  onChange={(e) => updateProgress(goal.id, e.target.value)}
                  step="0.1"
                />
                <button
                  onClick={() => {
                    const current = getProgress(goal.id);
                    if (current < goal.target) {
                      updateProgress(goal.id, current + 1);
                    }
                  }}
                >
                  +1
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
