export interface IVideo {
    id?: string;
    name?: string;
    episode?: number;
    url?: string;
    courseID?: number;
}

export class Video implements IVideo {
    constructor(public id?: string, public name?: string, public episode?: number, public url?: string, public courseID?: number) {}
}
