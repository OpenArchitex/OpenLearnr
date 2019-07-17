export interface ICommentReply {
  commentID?: string;
  replyBody?: string;
  createdBy?: string;
  createdDate?: Date;
  likesCount?: number;
  dislikesCount?: number;
  approved?: boolean;
}

export class CommentReply implements ICommentReply {
  constructor(
    commentID?: string,
    replyBody?: string,
    createdBy?: string,
    createdDate?: Date,
    likesCount?: number,
    dislikesCount?: number,
    approved?: boolean
  ) {}
}
