import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Reminders.css';

const Reminders = () => {
    const [reminders, setReminders] = useState([]);
    const [title, setTitle] = useState('');
    const [time, setTime] = useState('');
    const [activePhases, setActivePhases] = useState([]);

    const phases = ["Menstrual Phase", "Follicular Phase", "Ovulatory Phase", "Luteal Phase"];

    useEffect(() => {
        fetchReminders();
    }, []);

    const fetchReminders = async () => {
        try {
            const token = localStorage.getItem("token") || sessionStorage.getItem("token");
            const res = await axios.get("http://localhost:5000/api/reminders", {
                headers: { Authorization: `Bearer ${token}` }
            });
            setReminders(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handlePhaseToggle = (phase) => {
        setActivePhases(prev =>
            prev.includes(phase) ? prev.filter(p => p !== phase) : [...prev, phase]
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title || !time || activePhases.length === 0) return;

        try {
            const token = localStorage.getItem("token") || sessionStorage.getItem("token");
            await axios.post("http://localhost:5000/api/reminders", { title, time, activePhases }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchReminders();
            setTitle('');
            setTime('');
            setActivePhases([]);
        } catch (err) {
            console.error(err);
        }
    };

    const toggleReminder = async (id) => {
        try {
            const token = localStorage.getItem("token") || sessionStorage.getItem("token");
            await axios.put(`http://localhost:5000/api/reminders/${id}/toggle`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchReminders();
        } catch (err) {
            console.error(err);
        }
    };

    const deleteReminder = async (id) => {
        try {
            const token = localStorage.getItem("token") || sessionStorage.getItem("token");
            await axios.delete(`http://localhost:5000/api/reminders/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchReminders();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="reminders-container animate-fade-in">
            <div className="reminders-header animate-slide-up delay-100">
                <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px'}}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                        <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                    </svg>
                    <h1>Smart Reminders</h1>
                </div>
                <p>Set dynamic alerts that only activate during specific cycle phases.</p>
            </div>

            <div className="reminders-layout animate-slide-up delay-200">
                <div className="create-reminder-card card">
                    <h3>Add New Reminder</h3>
                    <form onSubmit={handleSubmit} className="reminder-form">
                        <div className="form-group">
                            <label>Supplement/Medication Name</label>
                            <input
                                type="text"
                                placeholder="e.g. Iron Pills, Magnesium"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Reminder Time</label>
                            <input
                                type="time"
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                            />
                        </div>
                        <div className="form-group phases-group">
                            <label>Active Phases</label>
                            <div className="phase-checkboxes">
                                {phases.map(phase => (
                                    <button
                                        type="button"
                                        key={phase}
                                        className={`phase-btn ${activePhases.includes(phase) ? 'active' : ''}`}
                                        onClick={() => handlePhaseToggle(phase)}
                                    >
                                        {phase}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <button type="submit" className="btn-primary" disabled={!title || !time || activePhases.length === 0}>Save Reminder</button>
                    </form>
                </div>

                <div className="reminder-list-card card">
                    <h3>Your Reminders</h3>
                    {reminders.length === 0 ? (
                        <div className="empty-reminders">
                            <p>No active reminders. Add one to start tracking!</p>
                        </div>
                    ) : (
                        <div className="reminders-list">
                            {reminders.map(reminder => (
                                <div key={reminder._id} className={`reminder-item ${!reminder.isActive ? 'disabled' : ''}`}>
                                    <div className="reminder-info">
                                        <h4>{reminder.title}</h4>
                                        <span className="time-badge">{reminder.time}</span>
                                        <div className="active-phases">
                                            {reminder.activePhases.map(phase => (
                                                <span key={phase} className="phase-pill">{phase.split(' ')[0]}</span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="reminder-actions">
                                        <label className="switch">
                                            <input type="checkbox" checked={reminder.isActive} onChange={() => toggleReminder(reminder._id)} />
                                            <span className="slider round"></span>
                                        </label>
                                        <button className="delete-btn" onClick={() => deleteReminder(reminder._id)} title="Delete Reminder">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M3 6h18"></path>
                                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Reminders;
