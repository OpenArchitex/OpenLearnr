export interface IStudent {
    id?: string;
    userID?: number;
    lastWatchedVideo?: string;
    lastWatchedVideoTime?: number;
}

export class Student implements IStudent {
    constructor(public id?: string, public userID?: number, public lastWatchedVideo?: string, public lastWatchedVideoTime?: number) {}
}
