export class TokenUsage {
    id: number;
    tokenId: number;
    wordCount: number;
    date: Date;

    constructor(id: number, tokenId: number, wordCount: number, date: Date) {
        this.id = id;
        this.tokenId = tokenId;
        this.wordCount = wordCount;
        this.date = date;
    }
}
