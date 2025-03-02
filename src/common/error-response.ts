export class ErrorResponse {
    constructor(description: string) {
        this.description = description;
    }
    code?: string
    description: string
}