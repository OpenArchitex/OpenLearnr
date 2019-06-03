export interface IComment {
    id?: string;
    videoID?: string;
    commentBody?: string;
    likesCount?: number;
    dislikesCount?: number;
}

export class Comment implements IComment {
    constructor(
        public id?: string,
        public videoID?: string,
        public commentBody?: string,
        public likesCount?: number,
        public dislikesCount?: number
    ) {}
}
