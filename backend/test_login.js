async function testLogin() {
    try {
        console.log("Testing logic against running server...");
        const res = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: "smith@gmail.com",
                password: "Smith18**"
            })
        });

        const data = await res.json();
        if (res.ok) {
            console.log("Login Success!");
            console.log(data);
        } else {
            console.log("Login Failed:", data);
        }
    } catch (err) {
        console.log("Error:", err.message);
    }
}

testLogin();
