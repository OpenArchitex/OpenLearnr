package com.asanka.tutor.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Student.
 */
@Document(collection = "student")
public class Student implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @NotNull
    @Field("user_id")
    private Integer userID;

    @NotNull
    @Field("last_watched_video")
    private String lastWatchedVideo;

    @NotNull
    @Field("last_watched_video_time")
    private Float lastWatchedVideoTime;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Integer getUserID() {
        return userID;
    }

    public Student userID(Integer userID) {
        this.userID = userID;
        return this;
    }

    public void setUserID(Integer userID) {
        this.userID = userID;
    }

    public String getLastWatchedVideo() {
        return lastWatchedVideo;
    }

    public Student lastWatchedVideo(String lastWatchedVideo) {
        this.lastWatchedVideo = lastWatchedVideo;
        return this;
    }

    public void setLastWatchedVideo(String lastWatchedVideo) {
        this.lastWatchedVideo = lastWatchedVideo;
    }

    public Float getLastWatchedVideoTime() {
        return lastWatchedVideoTime;
    }

    public Student lastWatchedVideoTime(Float lastWatchedVideoTime) {
        this.lastWatchedVideoTime = lastWatchedVideoTime;
        return this;
    }

    public void setLastWatchedVideoTime(Float lastWatchedVideoTime) {
        this.lastWatchedVideoTime = lastWatchedVideoTime;
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
        Student student = (Student) o;
        if (student.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), student.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Student{" +
            "id=" + getId() +
            ", userID=" + getUserID() +
            ", lastWatchedVideo='" + getLastWatchedVideo() + "'" +
            ", lastWatchedVideoTime=" + getLastWatchedVideoTime() +
            "}";
    }
}
