"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("./routes/auth"));
const justificationRoutes_1 = __importDefault(require("./routes/justificationRoutes"));
const port = process.env.PORT;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.use(express_1.default.text());
app.use('/api', auth_1.default); // Authentication routes
app.use('/api', justificationRoutes_1.default);
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
