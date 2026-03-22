import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import API from "../api/axios";
import "./Profile.css";

export default function Profile() {
    const [profile, setProfile] = useState({
        username: "",
        name: "",
        email: "",
        dob: "",
        height: "",
        weight: "",
        cycleLength: 28,
        periodDuration: 5,
    });
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [exporting, setExporting] = useState(false);

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            setLoading(true);
            const res = await API.get("/auth/profile");
            setProfile({
                username: res.data.username || "",
                name: res.data.name || "",
                email: res.data.email || "",
                dob: res.data.dob ? res.data.dob.split('T')[0] : "",
                height: res.data.height || "",
                weight: res.data.weight || "",
                cycleLength: res.data.cycleLength || 28,
                periodDuration: res.data.periodDuration || 5,
            });

            // Sync name to local storage so dashboard updates
            if (res.data.name) {
                localStorage.setItem("userName", res.data.name);
            }
        } catch (error) {
            console.error("Failed to load profile", error);
            toast.error("Failed to load profile data");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setSaving(true);
            const res = await API.put("/auth/profile", profile);
            toast.success("Profile updated successfully!");
            if (res.data.user?.name) {
                localStorage.setItem("userName", res.data.user.name);
            }
        } catch (error) {
            console.error("Failed to update profile", error);
            toast.error(error.response?.data?.message || "Failed to update profile");
        } finally {
            setSaving(false);
        }
    };

    const handleExportData = async () => {
        try {
            setExporting(true);
            const [periodsRes, symptomsRes] = await Promise.all([
                API.get("/period"),
                API.get("/symptoms")
            ]);

            const periods = periodsRes.data;
            const symptoms = symptomsRes.data;

            let csvContent = "data:text/csv;charset=utf-8,";
            csvContent += "Type,Date/Start,EndDate,Details\n";

            periods.forEach(p => {
                csvContent += `Period,${new Date(p.startDate).toLocaleDateString()},${new Date(p.endDate).toLocaleDateString()},Flow: ${p.flow} Notes: ${p.notes || "None"}\n`;
            });

            symptoms.forEach(s => {
                csvContent += `Symptom,${s.date},-,Symptoms: ${s.symptoms.join("; ")} Notes: ${s.notes || "None"}\n`;
            });

            const encodedUri = encodeURI(csvContent);
            const link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", "bloomcycle_health_report.csv");
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            toast.success("Data exported successfully!");
        } catch (error) {
            console.error("Export failed", error);
            toast.error("Failed to export data");
        } finally {
            setExporting(false);
        }
    };

    if (loading) return <div className="profile-container"><p>Loading profile...</p></div>;

    return (
        <div className="profile-container">
            <div className="profile-header">
                <h1 className="profile-title">Your Profile & Settings</h1>
                <p className="profile-subtitle">Manage your personal details and cycle preferences.</p>
            </div>

            <div className="profile-layout" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '25px' }}>
                <div className="profile-card">
                    <div className="profile-avatar-container">
                        <div className="profile-avatar">
                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                        </div>
                        <h2 style={{margin: '10px 0 0 0', color: 'var(--text-main)'}}>{profile.name || 'User'}</h2>
                        <p style={{margin: '0 0 20px 0', color: 'var(--text-muted)'}}>@{profile.username || 'username'}</p>
                    </div>

                    <form onSubmit={handleSubmit} className="profile-form">
                        <div className="form-group">
                            <label>Full Name</label>
                            <input
                                type="text"
                                name="name"
                                value={profile.name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Email Address</label>
                            <input
                                type="email"
                                name="email"
                                value={profile.email}
                                onChange={handleChange}
                                required
                                disabled
                            />
                            <small>Email address cannot be changed securely from here.</small>
                        </div>

                        <div className="form-group">
                            <label>Date of Birth</label>
                            <input
                                type="date"
                                name="dob"
                                value={profile.dob}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Height (cm)</label>
                                <input
                                    type="number"
                                    name="height"
                                    value={profile.height}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Weight (kg)</label>
                                <input
                                    type="number"
                                    name="weight"
                                    value={profile.weight}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="btn-primary profile-save-btn"
                            disabled={saving}
                            style={{ marginTop: '10px' }}
                        >
                            {saving ? "Saving..." : "Save Profile"}
                        </button>
                    </form>
                </div>

                <div className="profile-card" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <form onSubmit={handleSubmit} className="profile-form" style={{ gap: '15px' }}>
                        <h3 className="section-title" style={{ marginTop: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                            Cycle Preferences
                        </h3>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Average Cycle Length (Days)</label>
                                <input
                                    type="number"
                                    name="cycleLength"
                                    value={profile.cycleLength}
                                    onChange={handleChange}
                                    min="21"
                                    max="40"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Average Period Duration (Days)</label>
                                <input
                                    type="number"
                                    name="periodDuration"
                                    value={profile.periodDuration}
                                    onChange={handleChange}
                                    min="2"
                                    max="10"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="btn-primary profile-save-btn"
                            disabled={saving}
                            style={{ marginTop: '10px' }}
                        >
                            {saving ? "Saving..." : "Save Preferences"}
                        </button>
                    </form>

                    <div className="export-section" style={{ marginTop: '20px', paddingTop: "20px", borderTop: "1px solid #e2e8f0" }}>
                        <h3 className="section-title" style={{ borderBottom: "none", paddingBottom: "0", marginBottom: "5px", marginTop: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                            Export Data
                        </h3>
                        <p style={{ color: "var(--text-muted)", marginBottom: "15px", fontSize: "0.9rem" }}>Download your cycle history to share with a medical professional.</p>
                        <button
                            type="button"
                            className="btn-outline"
                            onClick={handleExportData}
                            disabled={exporting}
                            style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}
                        >
                            {exporting ? "Generating Report..." : "Download CSV Report"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
