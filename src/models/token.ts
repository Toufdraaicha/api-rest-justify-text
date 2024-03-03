

export class Token{
    id: number;
    email: string;
    token: string;
    generatedAt: Date;

    constructor(id: number, email: string, token: string, generatedAt: Date) {
        this.id = id;
        this.email = email;
        this.token = token;
        this.generatedAt = generatedAt;
    }
}