package com.asanka.tutor.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Comment.
 */
@Document(collection = "comment")
public class Comment implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @NotNull
    @Field("user_id")
    private String userID;

    @NotNull
    @Field("video_id")
    private String videoID;

    @NotNull
    @Field("comment_body")
    private String commentBody;

    @Field("likes_count")
    private Integer likesCount;

    @Field("dislikes_count")
    private Integer dislikesCount;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserID() {
        return userID;
    }

    public Comment userID(String userID) {
        this.userID = userID;
        return this;
    }

    public void setUserID(String userID) {
        this.userID = userID;
    }

    public String getVideoID() {
        return videoID;
    }

    public Comment videoID(String videoID) {
        this.videoID = videoID;
        return this;
    }

    public void setVideoID(String videoID) {
        this.videoID = videoID;
    }

    public String getCommentBody() {
        return commentBody;
    }

    public Comment commentBody(String commentBody) {
        this.commentBody = commentBody;
        return this;
    }

    public void setCommentBody(String commentBody) {
        this.commentBody = commentBody;
    }

    public Integer getLikesCount() {
        return likesCount;
    }

    public Comment likesCount(Integer likesCount) {
        this.likesCount = likesCount;
        return this;
    }

    public void setLikesCount(Integer likesCount) {
        this.likesCount = likesCount;
    }

    public Integer getDislikesCount() {
        return dislikesCount;
    }

    public Comment dislikesCount(Integer dislikesCount) {
        this.dislikesCount = dislikesCount;
        return this;
    }

    public void setDislikesCount(Integer dislikesCount) {
        this.dislikesCount = dislikesCount;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Comment comment = (Comment) o;
        if (comment.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), comment.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Comment{" +
            "id=" + getId() +
            ", userID='" + getUserID() + "'" +
            ", videoID='" + getVideoID() + "'" +
            ", commentBody='" + getCommentBody() + "'" +
            ", likesCount=" + getLikesCount() +
            ", dislikesCount=" + getDislikesCount() +
            "}";
    }
}
