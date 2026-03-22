import React, { useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const NotificationChecker = () => {
    useEffect(() => {
        // Ask for permission when component mounts
        if ('Notification' in window && Notification.permission !== 'granted') {
            Notification.requestPermission();
        }

        const checkReminders = async () => {
            const token = localStorage.getItem("token") || sessionStorage.getItem("token");
            if (!token) return;

            try {
                const res = await axios.get("http://localhost:5000/api/reminders", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const reminders = res.data;
                if (!reminders || reminders.length === 0) return;

                const now = new Date();
                const currentHours = now.getHours().toString().padStart(2, '0');
                const currentMinutes = now.getMinutes().toString().padStart(2, '0');
                const currentTime = `${currentHours}:${currentMinutes}`;
                
                // Read last notified time from localStorage to avoid spamming within the same minute
                const lastNotified = localStorage.getItem("lastNotifiedTime");
                if (lastNotified === currentTime) return;

                reminders.forEach(reminder => {
                    if (reminder.isActive && reminder.time === currentTime) {
                        // Trigger Notification
                        triggerAlarm(reminder.title);
                        localStorage.setItem("lastNotifiedTime", currentTime);
                    }
                });
            } catch (err) {
                console.error("Failed to check reminders", err);
            }
        };

        const triggerAlarm = (title) => {
            // 1. In-app toast
            toast.info(`⏰ Reminder: Time for your ${title}!`, {
                position: "top-right",
                autoClose: 10000,
            });

            // 2. Browser Notification
            if ('Notification' in window && Notification.permission === 'granted') {
                new Notification("BloomCycle Reminder 🌸", {
                    body: `Time for your ${title}!`,
                    icon: "/favicon.ico"
                });
            }

            // 3. Audio Alarm
            try {
                const ctx = new (window.AudioContext || window.webkitAudioContext)();
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                
                osc.connect(gain);
                gain.connect(ctx.destination);
                
                osc.type = "sine";
                osc.frequency.setValueAtTime(880, ctx.currentTime); // A5 note
                gain.gain.setValueAtTime(0.1, ctx.currentTime);
                
                osc.start();
                
                // Beep pattern
                setTimeout(() => osc.stop(), 200);
                setTimeout(() => {
                    const osc2 = ctx.createOscillator();
                    osc2.connect(gain);
                    osc2.type = "sine";
                    osc2.frequency.setValueAtTime(1046.50, ctx.currentTime); // C6 note
                    osc2.start();
                    setTimeout(() => osc2.stop(), 400);
                }, 300);
            } catch (e) {
                console.log("Audio API not supported");
            }
        };

        // Check every 30 seconds
        const interval = setInterval(checkReminders, 30000);
        
        // Initial check
        checkReminders();

        return () => clearInterval(interval);
    }, []);

    return null; // This component doesn't render anything visible
};

export default NotificationChecker;
