import { ICommentReply } from 'app/shared/model/comment-reply.model';

export interface IComment {
  id?: string;
  videoID?: string;
  commentBody?: string;
  replies?: ICommentReply[];
  likesCount?: number;
  dislikesCount?: number;
  isApproved?: boolean;
  isAdminComment?: boolean;
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
    public replies?: ICommentReply[],
    public likesCount?: number,
    public dislikesCount?: number,
    public isApproved?: boolean,
    public isAdminComment?: boolean,
    public createdBy?: string,
    public createdDate?: Date,
    public lastModifiedBy?: string,
    public lastModifiedDate?: Date
  ) {
    this.isApproved = this.isApproved || false;
  }
}
