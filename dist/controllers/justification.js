"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.justify = void 0;
const textJustifier_1 = require("../utils/textJustifier");
const justify = (req, res) => {
    const justifiedText = textJustifier_1.TextJustifier.justify(req.body);
    res.send(justifiedText);
};
exports.justify = justify;
