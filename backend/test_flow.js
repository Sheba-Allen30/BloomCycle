async function testFlow() {
    try {
        console.log("Registering test user...");
        const regRes = await fetch("http://localhost:5000/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: "Test User",
                email: "test_flow@gmail.com",
                password: "Password123"
            })
        });
        console.log("Reg Status:", regRes.status);
        console.log("Reg Output:", await regRes.json());

        console.log("\nLogging in test user...");
        const loginRes = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: "test_flow@gmail.com",
                password: "Password123"
            })
        });

        console.log("Login Status:", loginRes.status);
        console.log("Login Output:", await loginRes.json());
    } catch (err) {
        console.log("Error:", err.message);
    }
}

testFlow();
