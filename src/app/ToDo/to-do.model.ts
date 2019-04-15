import { and } from '@angular/router/src/utils/collection';

export class ToDo {
    body: string;
    done: boolean;
    userId: string;

    constructor(data: any) {
        this.body = data.body || '';
        this.done = data.done || '';
        this.userId = data.userId || '';
    }

    compareToDos(data: any): boolean {
        let valor = false;
        if (this.body === data.body && this.done === data.done && this.userId === data.userId) {
            valor = true;
        }
        return valor;
    }
}
