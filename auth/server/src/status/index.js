import express from "express";
import moment from "moment";

const ServerStatus = express.Router();

// Configuration
const APP_VERSION = process.env.APP_VERSION || "3.0.0";
const SERVER_START_TIME = moment();
const LAST_UPDATE = moment().format("DD-MM-YYYY hh:mm A");

// Status Route
ServerStatus.get("/", (req, res) => {
    const currentTime = moment();
    const formattedTime = currentTime.format("DD-MM-YYYY hh:mm A");
    const serverUptime = moment.duration(currentTime.diff(SERVER_START_TIME)).humanize();

    let greeting;
    const hour = currentTime.hour();
    if (hour < 12) {
        greeting = "Good Morning ☀️";
    } else if (hour < 18) {
        greeting = "Good Afternoon 🌤️";
    } else {
        greeting = "Good Evening 🌙";
    }

    res.send(`
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Server Status Dashboard</title>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');

                * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Poppins', sans-serif; }
                body {
                    background: linear-gradient(120deg, #004D40, #00796B);
                    color: #fff;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    text-align: center;
                    overflow: hidden;
                }
                .container {
                    background: rgba(255, 255, 255, 0.1);
                    padding: 30px;
                    border-radius: 15px;
                    backdrop-filter: blur(15px);
                    box-shadow: 0px 0px 20px rgba(0, 121, 107, 0.3);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    text-align: center;
                    max-width: 500px;
                    width: 90%;
                }
                .title {
                    font-size: 2rem;
                    font-weight: 600;
                    text-shadow: 0px 0px 10px rgba(255, 255, 255, 0.5);
                }
                .greeting {
                    font-size: 1.5rem;
                    margin: 10px 0;
                }
                .status-info {
                    margin-top: 20px;
                    text-align: left;
                    font-size: 1.2rem;
                    line-height: 2;
                }
                .status-value {
                    font-weight: bold;
                    color: #FFD54F;
                }
                .status-indicator {
                    display: inline-block;
                    width: 12px;
                    height: 12px;
                    border-radius: 50%;
                    background: #66BB6A;
                    margin-left: 10px;
                }
                .footer {
                    margin-top: 15px;
                    font-size: 0.9rem;
                    opacity: 0.8;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="title">🚀 Server Dashboard</div>
                <div class="greeting">${greeting}</div>
                <div class="status-info">
                    📌 Version: <span class="status-value">${APP_VERSION}</span><br>
                    ⏳ Uptime: <span class="status-value">${serverUptime}</span><br>
                    🟢 Status: <span class="status-value">Online</span> <span class="status-indicator"></span><br>
                    🕒 Last Updated: <span class="status-value">${LAST_UPDATE}</span>
                </div>
            </div>
            <div class="footer">Built with ❤️ by Your Company</div>
            <script>
                gsap.from(".container", { duration: 1, scale: 0.8, opacity: 0, ease: "elastic.out(1, 0.5)" });
                gsap.from(".title", { duration: 1, y: -20, opacity: 0, delay: 0.5, ease: "power2.out" });
                gsap.from(".greeting", { duration: 1, y: -20, opacity: 0, delay: 0.7, ease: "power2.out" });
                gsap.from(".status-info", { duration: 1, opacity: 0, delay: 1, ease: "power2.out" });
            </script>
        </body>
        </html>
    `);
});

export default ServerStatus;
