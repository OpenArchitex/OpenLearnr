package com.asanka.tutor.service.dto;

import com.asanka.tutor.domain.CommentReply;

import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.Instant;
import java.util.List;
import java.util.Objects;

/**
 * A DTO for the {@link com.asanka.tutor.domain.Comment} entity.
 */
public class CommentDTO implements Serializable {

    private String id;

    @NotNull
    private String videoID;

    @NotNull
    private String videoName;

    @NotNull
    private String commentBody;

    @NotNull
    private Boolean isApproved;

    private Boolean isAdminComment;

    private List<CommentReply> replies;

    private Integer likesCount;

    private Integer dislikesCount;

    private String createdBy;

    private Instant createdDate;

    private String lastModifiedBy;

    private Instant lastModifiedDate;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getVideoID() {
        return videoID;
    }

    public void setVideoID(String videoID) {
        this.videoID = videoID;
    }

    public String getCommentBody() {
        return commentBody;
    }

    public void setCommentBody(String commentBody) {
        this.commentBody = commentBody;
    }

    public Integer getLikesCount() {
        return likesCount;
    }

    public void setLikesCount(Integer likesCount) {
        this.likesCount = likesCount;
    }

    public Integer getDislikesCount() {
        return dislikesCount;
    }

    public void setDislikesCount(Integer dislikesCount) {
        this.dislikesCount = dislikesCount;
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

    public String getLastModifiedBy() {
        return lastModifiedBy;
    }

    public void setLastModifiedBy(String lastModifiedBy) {
        this.lastModifiedBy = lastModifiedBy;
    }

    public Instant getLastModifiedDate() {
        return lastModifiedDate;
    }

    public void setLastModifiedDate(Instant lastModifiedDate) {
        this.lastModifiedDate = lastModifiedDate;
    }

    public Boolean isIsApproved() {
        return isApproved;
    }

    public void setIsApproved(Boolean isApproved) {
        this.isApproved = isApproved;
    }

    public List<CommentReply> getReplies() {
        return replies;
    }

    public void setReplies(List<CommentReply> replies) {
        this.replies = replies;
    }

    public Boolean getIsAdminComment() {
        return isAdminComment;
    }

    public void setIsAdminComment(Boolean adminComment) {
        isAdminComment = adminComment;
    }

    public String getVideoName() {
        return videoName;
    }

    public void setVideoName(String videoName) {
        this.videoName = videoName;
    }


    // This constructor is only used for Jackson and should not be used for anything else.
    public CommentDTO () {
        // Empty constructor needed for Jackson.
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        CommentDTO commentDTO = (CommentDTO) o;
        if (commentDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), commentDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CommentDTO{" +
            "id=" + getId() +
            ", videoID='" + getVideoID() + "'" +
            ", videoName='" + getVideoName() + "'" +
            ", commentBody='" + getCommentBody() + "'" +
            ", likesCount=" + getLikesCount() +
            ", dislikesCount=" + getDislikesCount() +
            ", isApproved='" + isIsApproved() + "'" +
            "}";
    }
}
