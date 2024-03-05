export function countWords(text: string): number {
    // Remove extra whitespaces and split the text into words
    const words: string[] = text.trim().split(/\s+/);
    // Count the number of words
    return words.length;
}