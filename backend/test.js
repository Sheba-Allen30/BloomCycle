const axios = require('axios');

async function testRegister() {
    try {
        const res = await axios.post('http://localhost:5000/api/auth/register', {
            name: "TestUser",
            email: `test${Date.now()}@example.com`,
            password: "password123"
        });
        console.log("Success:", res.data);
    } catch (err) {
        console.log("Error status:", err.response?.status);
        console.log("Error data:", err.response?.data);
        console.log("Error message:", err.message);
    }
}
testRegister();
