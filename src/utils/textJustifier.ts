export class TextJustifier {
    private static readonly lineLength = 80;

    public static justify(text: string): string {
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
            justifiedText += currentLine.trimEnd();  // Last line should not be justified
        }

        return justifiedText;
    }

    private static justifyLine(line: string): string {
        if (line.indexOf(' ') === -1) return line;  // Single word line

        while (line.length < this.lineLength) {
            line = line.replace(/\s+/g, (spaces) => spaces + ' ');
        }

        return line.trimEnd();
    }
}