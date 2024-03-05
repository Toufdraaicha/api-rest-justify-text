"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextJustifier = void 0;
class TextJustifier {
    static justify(text) {
        const words = text.split(/\s+/);
        let currentLine = '';
        let justifiedText = '';
        for (const word of words) {
            if ((currentLine + word).length > this.lineLength) {
                justifiedText += this.justifyLine(currentLine) + '\n';
                currentLine = '';
            }
            currentLine += word + ' ';
        }
        if (currentLine) {
            justifiedText += currentLine.trimEnd(); // Last line should not be justified
        }
        return justifiedText;
    }
    static justifyLine(line) {
        if (line.indexOf(' ') === -1)
            return line; // Single word line
        while (line.length < this.lineLength) {
            line = line.replace(/\s+/g, (spaces) => spaces + ' ');
        }
        return line.trimEnd();
    }
}
exports.TextJustifier = TextJustifier;
TextJustifier.lineLength = 80;
