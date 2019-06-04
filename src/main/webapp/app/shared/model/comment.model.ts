export interface IComment {
    id?: string;
    videoID?: string;
    commentBody?: string;
    likesCount?: number;
    dislikesCount?: number;
    createdBy?: string;
    createdDate?: Date;
    lastModifiedBy?: string;
    lastModifiedDate?: Date;
}

export class Comment implements IComment {
    constructor(
        public id?: string,
        public videoID?: string,
        public commentBody?: string,
        public likesCount?: number,
        public dislikesCount?: number,
        public createdBy?: string,
        public createdDate?: Date,
        public lastModifiedBy?: string,
        public lastModifiedDate?: Date
    ) {}
}
