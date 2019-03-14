export class ToDo {
    body: string;
    done: boolean;
    userId: string;

    constructor(data: any) {
        this.body = data.body || '';
        this.done = data.done || '';
        this.userId = data.userId || '';
    }
}