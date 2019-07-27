export interface ICommentReply {
  commentID?: string;
  replyBody?: string;
  isAdminReply?: boolean;
  createdBy?: string;
  createdDate?: Date;
  likesCount?: number;
  dislikesCount?: number;
  approved?: boolean;
}
