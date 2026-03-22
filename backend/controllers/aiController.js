exports.askAi = async (req, res) => {
    try {
        const { question, currentPhase } = req.body;
        const lowerQ = question.toLowerCase();

        // Mocked AI Logic based on Keyword Matching and Phase Context
        let answer = "I'm still learning! But based on what you've logged, if this is a new or severe symptom, it's always best to consult a doctor.";

        if (lowerQ.includes("headache") || lowerQ.includes("migraine")) {
            if (currentPhase === "Ovulatory Phase" || currentPhase === "Luteal Phase") {
                answer = "Headaches are very common during your " + currentPhase + " due to fluctuating estrogen levels. Make sure you are drinking plenty of water and getting enough sleep. If it persists for more than 48 hours, consider speaking with a doctor.";
            } else {
                answer = "Hormonal shifts can cause headaches, but if you're not in your luteal or ovulatory phase, ensure you aren't dehydrated or stressed. Rest in a dark, quiet room if possible.";
            }
        } else if (lowerQ.includes("cramp") || lowerQ.includes("pain")) {
            if (currentPhase === "Menstrual Phase") {
                answer = "Cramping during the Menstrual Phase is caused by prostaglandins helping your uterus shed its lining. It's totally normal! Try a heating pad, gentle yoga, or ibuprofen.";
            } else {
                answer = "Mild pain outside your period could be 'mittelschmerz' (ovulation pain) if you are mid-cycle. However, severe pain should always be checked by a professional.";
            }
        } else if (lowerQ.includes("tired") || lowerQ.includes("exhausted") || lowerQ.includes("fatigue")) {
            if (currentPhase === "Luteal Phase" || currentPhase === "Menstrual Phase") {
                answer = "It is completely normal to feel exhausted right now. Progesterone peaks during the Luteal phase, which has a natural sedative effect. Listen to your body and rest!";
            } else {
                answer = "You are in a phase where energy is typically higher. If you are feeling unusually exhausted, make sure you are eating enough iron and getting quality sleep!";
            }
        } else if (lowerQ.includes("normal")) {
            answer = "Every body is different! What you're experiencing could very well be normal for your cycle. Try tracking this symptom for a few months to see if a pattern emerges.";
        }

        // Simulate AI typing delay
        setTimeout(() => {
            res.json({ answer });
        }, 1500);

    } catch (error) {
        res.status(500).json({ error: "AI Server error" });
    }
};
