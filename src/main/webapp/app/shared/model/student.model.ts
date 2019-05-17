export interface IStudent {
    id?: string;
    userId?: number;
    lastWatchedVideo?: string;
    lastWatchedVideoTime?: number;
}

export class Student implements IStudent {
    constructor(public id?: string, public userId?: number, public lastWatchedVideo?: string, public lastWatchedVideoTime?: number) {}
}
