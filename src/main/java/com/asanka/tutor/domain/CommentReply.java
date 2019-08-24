package com.asanka.tutor.domain;

import java.io.Serializable;
import java.time.Instant;

/**
 * A Comment Reply.
 */
public class CommentReply implements Serializable {
    private static final long serialVersionUID = 1L;

    private String id;
    private String commentID;
    private String replyBody;
    private boolean isAdminReply;
    private String createdBy;
    private boolean isApproved;
    private Instant createdDate = Instant.now();

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCommentID() {
        return commentID;
    }

    public void setCommentID(String commentID) {
        this.commentID = commentID;
    }

    public String getReplyBody() {
        return replyBody;
    }

    public void setReplyBody(String replyBody) {
        this.replyBody = replyBody;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public Instant getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(Instant createdDate) {
        this.createdDate = createdDate;
    }

    public boolean isApproved() {
        return isApproved;
    }

    public void setApproved(boolean approved) {
        isApproved = approved;
    }

    public boolean getIsAdminReply() {
        return isAdminReply;
    }

    public void setIsAdminReply(boolean isAdminReply) {
        this.isAdminReply = isAdminReply;
    }

    public CommentReply commentID(String commentID) {
        this.commentID = commentID;
        return this;
    }

    public CommentReply replyBody(String replyBody) {
        this.replyBody = replyBody;
        return this;
    }

    public CommentReply isAdminReply(boolean isAdminReply) {
        this.isAdminReply = isAdminReply;
        return this;
    }

    public CommentReply createdBy(String createdBy) {
        this.createdBy = createdBy;
        return this;
    }

    public CommentReply isApproved(boolean isApproved) {
        this.isApproved = isApproved;
        return this;
    }

    @Override
    public String toString() {
        return "CommentReply{" +
            "replyBody='" + replyBody + '\'' +
            ", createdBy='" + createdBy + '\'' +
            ", createdDate=" + createdDate +
            '}';
    }
}
