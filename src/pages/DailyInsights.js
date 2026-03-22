import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css"; // Reuse dashboard styling for cards

export default function DailyInsights() {
    const navigate = useNavigate();
    const [cycleDay, setCycleDay] = useState(1);
    const [userName, setUserName] = useState("Beautiful");

    const [groceryChecks, setGroceryChecks] = useState({});
    const [aiQuestion, setAiQuestion] = useState("");
    const [chatHistory, setChatHistory] = useState([]);
    const [isAiTyping, setIsAiTyping] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        fetchPrediction();
        const storedName = localStorage.getItem("userName") || sessionStorage.getItem("userName");
        if (storedName) {
            setUserName(storedName);
        }
    }, []);

    const fetchPrediction = async () => {
        try {
            const token = localStorage.getItem("token") || sessionStorage.getItem("token");
            if (!token) {
                navigate("/login");
                return;
            }

            const res = await axios.get(
                "http://localhost:5000/api/prediction",
                { headers: { Authorization: `Bearer ${token}` } }
            );

            // Calculate current day in cycle
            if (res.data.nextPeriod) {
                const today = new Date();
                const next = new Date(res.data.nextPeriod);
                today.setHours(0, 0, 0, 0);
                next.setHours(0, 0, 0, 0);

                const diff = Math.ceil((next - today) / (1000 * 60 * 60 * 24));
                let calculatedCycleDay = res.data.averageCycle - diff;
                if (calculatedCycleDay < 1) calculatedCycleDay = 1;
                setCycleDay(calculatedCycleDay);
            }
        } catch (err) {
            console.error(err);
            if (err.response?.status === 401) {
                navigate("/login");
            }
        }
    };

    const getDietPlan = (day) => {
        if (day >= 1 && day <= 5) {
            return {
                phase: "Menstrual Phase",
                foods: "Iron-rich foods (spinach, lentils), warm soups, ginger tea.",
                avoid: "Caffeine, salty foods, cold drinks.",
                groceryList: ["Spinach", "Lentils", "Ginger Root", "Dark Chocolate", "Chamomile Tea", "Red Meat/Tofu"]
            };
        } else if (day >= 6 && day <= 14) {
            return {
                phase: "Follicular Phase",
                foods: "Light fresh foods, salads, lean proteins, fermented foods.",
                avoid: "Heavy carbs, processed foods.",
                groceryList: ["Mixed Greens", "Kombucha/Kimchi", "Chicken/Salmon", "Avocado", "Citrus Fruits", "Pumpkin Seeds"]
            };
        } else if (day >= 15 && day <= 18) {
            return {
                phase: "Ovulatory Phase",
                foods: "Antioxidant-rich berries, quinoa, leafy greens, nuts.",
                avoid: "Excessive dairy, refined sugars.",
                groceryList: ["Blueberries", "Quinoa", "Almonds", "Kale", "Bell Peppers", "Tomatoes"]
            };
        } else {
            return {
                phase: "Luteal Phase",
                foods: "Complex carbs (sweet potatoes), magnesium (dark chocolate), healthy fats.",
                avoid: "Alcohol, excessive caffeine.",
                groceryList: ["Sweet Potatoes", "Dark Chocolate (70%+)", "Walnuts", "Bananas", "Oats", "Turkey/Chickpeas"]
            };
        }
    };

    const getProductivityPlan = (day) => {
        if (day >= 1 && day <= 5) {
            return {
                title: "Rest & Reflect 🧘‍♀️",
                focus: "Low energy. Focus on routine tasks and self-care.",
                tasks: "Organize inbox, review goals, avoid major presentations."
            };
        } else if (day >= 6 && day <= 14) {
            return {
                title: "Brainstorm & Socialize 🚀",
                focus: "High estrogen brings creativity and social energy.",
                tasks: "Start new projects, schedule meetings, network, brainstorm."
            };
        } else if (day >= 15 && day <= 18) {
            return {
                title: "Communicate & Pitch 🗣️",
                focus: "Peak communication skills. Great for public speaking.",
                tasks: "Important presentations, negotiations, asking for raises."
            };
        } else {
            return {
                title: "Wrap Up & Deep Work 🔍",
                focus: "Progesterone promotes detail-oriented, solo work.",
                tasks: "Proofreading, data analysis, deep focus, wrapping up projects."
            };
        }
    };

    const getSoundscape = (day) => {
        if (day >= 1 && day <= 5) {
            return {
                title: "Deep Menstrual Rest",
                type: "Brown Noise & Binaural Beats",
                action: "Play 432Hz Healing Frequency"
            };
        } else if (day >= 6 && day <= 14) {
            return {
                title: "Follicular Focus",
                type: "Upbeat Lo-Fi & Instrumental Energy",
                action: "Play Lo-Fi Focus Beats"
            };
        } else if (day >= 15 && day <= 18) {
            return {
                title: "Ovulatory High Vibe",
                type: "Upbeat Pop & High Energy Dance",
                action: "Play High Energy Mix"
            };
        } else {
            return {
                title: "Luteal Wind Down",
                type: "Acoustic Chill & Nature Sounds",
                action: "Play Rain & Acoustic Chill"
            };
        }
    };

    const toggleGrocery = (item) => {
        setGroceryChecks(prev => ({
            ...prev,
            [item]: !prev[item]
        }));
    };

    const handlePlayAudio = () => {
        if (isPlaying) {
            window.speechSynthesis.cancel();
            setIsPlaying(false);
            return;
        }
        
        const soundscape = getSoundscape(cycleDay);
        const synth = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance(`Now playing ${soundscape.title}: ${soundscape.type}. Take a deep breath and clear your mind.`);
        
        utterance.onend = () => setIsPlaying(false);
        
        setIsPlaying(true);
        synth.speak(utterance);
    };

    const askAi = async (e) => {
        e.preventDefault();
        if (!aiQuestion.trim()) return;

        const userMessage = { role: "user", text: aiQuestion };
        setChatHistory(prev => [...prev, userMessage]);
        setAiQuestion("");
        setIsAiTyping(true);

        try {
            const currentPhase = getDietPlan(cycleDay).phase;
            const res = await axios.post("http://localhost:5000/api/ai/ask", {
                question: userMessage.text,
                currentPhase
            });

            setChatHistory(prev => [...prev, { role: "ai", text: res.data.answer }]);
        } catch (err) {
            console.error(err);
            setChatHistory(prev => [...prev, { role: "ai", text: "Oops, I'm having trouble connecting right now." }]);
        } finally {
            setIsAiTyping(false);
        }
    };

    return (
        <div className="dashboard-container" style={{ maxWidth: "800px" }}>
            <div className="dashboard-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1 className="welcome-text">Daily Insights 🌟</h1>
                    <p className="welcome-subtext">Advanced personalized features based on your cycle phase.</p>
                </div>
                <button onClick={() => navigate("/dashboard")} className="btn-secondary-small" style={{ fontSize: '0.9rem', padding: '10px 15px' }}>
                    &larr; Back to Dashboard
                </button>
            </div>

            <div className="dashboard-right" style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>

                {/* AUTOMATED GROCERY LIST */}
                <div className="grocery-card" style={{ background: "white", padding: "15px", borderRadius: "16px", boxShadow: "0 4px 15px rgba(0,0,0,0.03)", border: "1px solid #f1f5f9", animation: "slideUp 0.5s ease-out 0.1s both" }}>
                    <div style={{ display: "flex", alignItems: "center", marginBottom: "15px" }}>
                        <span style={{ fontSize: "1.5rem", marginRight: "10px" }}>🛒</span>
                        <h4 style={{ margin: 0, color: "var(--text-main)", fontSize: "1.1rem" }}>Auto-Generated Grocery List</h4>
                    </div>
                    <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginBottom: "15px" }}>
                        Foods optimized for your upcoming days in the <strong>{getDietPlan(cycleDay).phase}</strong>.
                    </p>
                    <div className="grocery-list">
                        {getDietPlan(cycleDay).groceryList.map((item, index) => (
                            <label key={index} style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px", cursor: "pointer" }}>
                                <input
                                    type="checkbox"
                                    checked={!!groceryChecks[item]}
                                    onChange={() => toggleGrocery(item)}
                                    style={{ width: "18px", height: "18px", accentColor: "var(--primary)" }}
                                />
                                <span style={{ color: groceryChecks[item] ? "#94a3b8" : "var(--text-main)", textDecoration: groceryChecks[item] ? "line-through" : "none", transition: "all 0.2s" }}>
                                    {item}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* CYCLE-SYNCED PRODUCTIVITY PLANNER */}
                <div className="productivity-card" style={{ background: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)", padding: "15px", borderRadius: "16px", boxShadow: "0 4px 15px rgba(0,0,0,0.03)", borderLeft: "4px solid #16a34a", animation: "slideUp 0.5s ease-out 0.2s both" }}>
                    <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                        <span style={{ fontSize: "1.5rem", marginRight: "10px" }}>💼</span>
                        <h4 style={{ margin: 0, color: "#166534", fontSize: "1.1rem" }}>Productivity Planner: {getProductivityPlan(cycleDay).title}</h4>
                    </div>
                    <p style={{ color: "#14532d", fontSize: "0.95rem", marginBottom: "8px" }}>
                        <strong>Focus:</strong> {getProductivityPlan(cycleDay).focus}
                    </p>
                    <p style={{ color: "#14532d", fontSize: "0.95rem", margin: 0 }}>
                        <strong>Actionable Tasks:</strong> {getProductivityPlan(cycleDay).tasks}
                    </p>
                </div>

                {/* DYNAMIC SOUNDSCAPES */}
                <div className="soundscape-card" style={{ background: "linear-gradient(135deg, #f3e8ff 0%, #fae8ff 100%)", padding: "15px", borderRadius: "16px", boxShadow: "0 4px 15px rgba(0,0,0,0.03)", borderLeft: "4px solid #c026d3", animation: "slideUp 0.5s ease-out 0.3s both" }}>
                    <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                        <span style={{ fontSize: "1.5rem", marginRight: "10px" }}>🎧</span>
                        <h4 style={{ margin: 0, color: "#86198f", fontSize: "1.1rem" }}>Audio: {getSoundscape(cycleDay).title}</h4>
                    </div>
                    <p style={{ color: "#701a75", fontSize: "0.95rem", margin: "0 0 12px 0" }}>
                        <strong>Vibe:</strong> {getSoundscape(cycleDay).type}
                    </p>
                    <button 
                        onClick={handlePlayAudio}
                        style={{ background: "#c026d3", color: "white", border: "none", padding: "8px 16px", borderRadius: "50px", fontWeight: "600", cursor: "pointer", fontSize: "0.9rem", width: "100%", transition: "all 0.2s" }} 
                        className="hover-lift"
                    >
                        {isPlaying ? "⏸ Pause Audio" : `▶ ${getSoundscape(cycleDay).action}`}
                    </button>
                </div>

                {/* AI CHAT ASSISTANT */}
                <div className="ai-chat-card" style={{ background: "white", padding: "15px", borderRadius: "16px", boxShadow: "0 10px 25px rgba(0,0,0,0.05)", border: "1px solid #e2e8f0", animation: "slideUp 0.5s ease-out 0.4s both", display: "flex", flexDirection: "column", height: "400px" }}>
                    <div style={{ display: "flex", alignItems: "center", marginBottom: "15px", borderBottom: "1px solid #f1f5f9", paddingBottom: "10px" }}>
                        <span style={{ fontSize: "1.5rem", marginRight: "10px" }}>🤖</span>
                        <h4 style={{ margin: 0, color: "var(--text-main)", fontSize: "1.1rem" }}>"Am I Normal?" AI Assistant</h4>
                    </div>

                    <div className="chat-window" style={{ flexGrow: 1, overflowY: "auto", paddingRight: "10px", display: "flex", flexDirection: "column", gap: "10px", marginBottom: "15px" }}>
                        <div style={{ background: "#f1f5f9", padding: "10px 14px", borderRadius: "14px 14px 14px 0", alignSelf: "flex-start", maxWidth: "85%", color: "#334155", fontSize: "0.9rem" }}>
                            Hi {userName}! I'm your private health assistant. You are currently in your <strong>{getDietPlan(cycleDay).phase}</strong>. What's on your mind?
                        </div>

                        {chatHistory.map((msg, i) => (
                            <div key={i} style={{
                                background: msg.role === "user" ? "#e11d48" : "#f1f5f9",
                                color: msg.role === "user" ? "white" : "#334155",
                                padding: "10px 14px",
                                borderRadius: msg.role === "user" ? "14px 14px 0 14px" : "14px 14px 14px 0",
                                alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
                                maxWidth: "85%",
                                fontSize: "0.9rem",
                                animation: "fadeIn 0.3s ease-out"
                            }}>
                                {msg.text}
                            </div>
                        ))}

                        {isAiTyping && (
                            <div style={{ background: "#f1f5f9", padding: "10px 14px", borderRadius: "14px 14px 14px 0", alignSelf: "flex-start", color: "#64748b", fontSize: "0.85rem", fontStyle: "italic" }}>
                                Assistant is typing...
                            </div>
                        )}
                    </div>

                    <form onSubmit={askAi} style={{ display: "flex", gap: "10px" }}>
                        <input
                            type="text"
                            value={aiQuestion}
                            onChange={(e) => setAiQuestion(e.target.value)}
                            placeholder="Ask about a symptom..."
                            style={{ flexGrow: 1, padding: "10px 15px", borderRadius: "50px", border: "1px solid #cbd5e1", outline: "none", fontSize: "0.9rem" }}
                        />
                        <button type="submit" disabled={isAiTyping || !aiQuestion.trim()} style={{ background: "#e11d48", color: "white", border: "none", width: "40px", height: "40px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", cursor: isAiTyping || !aiQuestion.trim() ? "not-allowed" : "pointer", opacity: isAiTyping || !aiQuestion.trim() ? 0.6 : 1 }} className="hover-lift">
                            ↑
                        </button>
                    </form>
                </div>

            </div>
        </div>
    );
}
