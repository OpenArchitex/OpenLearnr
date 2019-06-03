export interface IComment {
    id?: string;
    userID?: string;
    videoID?: string;
    commentBody?: string;
    likesCount?: number;
    dislikesCount?: number;
}

export class Comment implements IComment {
    constructor(
        public id?: string,
        public userID?: string,
        public videoID?: string,
        public commentBody?: string,
        public likesCount?: number,
        public dislikesCount?: number
    ) {}
}
