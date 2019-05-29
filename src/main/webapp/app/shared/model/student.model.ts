import { Moment } from 'moment';

export interface IStudent {
    id?: string;
    lastWatchedVideoID?: number;
    lastWatchedVideoTime?: Moment;
}

export class Student implements IStudent {
    constructor(public id?: string, public lastWatchedVideoID?: number, public lastWatchedVideoTime?: Moment) {}
}
