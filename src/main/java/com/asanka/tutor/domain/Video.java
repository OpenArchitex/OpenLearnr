package com.asanka.tutor.domain;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;
import javax.validation.constraints.*;

import java.io.Serializable;

/**
 * A Video.
 */
@Document(collection = "video")
public class Video implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @NotNull
    @Field("name")
    private String name;

    @NotNull
    @Field("episode")
    private Integer episode;

    @NotNull
    @Field("description")
    private String description;

    @NotNull
    @Field("url")
    private String url;

    @NotNull
    @Field("course_id")
    private String courseID;

    @NotNull
    @Field("chapter_id")
    private String chapterID;

    @NotNull
    @Field("is_sample")
    private Boolean isSample;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Video name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getEpisode() {
        return episode;
    }

    public Video episode(Integer episode) {
        this.episode = episode;
        return this;
    }

    public void setEpisode(Integer episode) {
        this.episode = episode;
    }

    public String getDescription() {
        return description;
    }

    public Video description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getUrl() {
        return url;
    }

    public Video url(String url) {
        this.url = url;
        return this;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getCourseID() {
        return courseID;
    }

    public Video courseID(String courseID) {
        this.courseID = courseID;
        return this;
    }

    public void setCourseID(String courseID) {
        this.courseID = courseID;
    }

    public String getChapterID() {
        return chapterID;
    }

    public Video chapterID(String chapterID) {
        this.chapterID = chapterID;
        return this;
    }

    public void setChapterID(String chapterID) {
        this.chapterID = chapterID;
    }

    public Boolean isIsSample() {
        return isSample;
    }

    public Video isSample(Boolean isSample) {
        this.isSample = isSample;
        return this;
    }

    public void setIsSample(Boolean isSample) {
        this.isSample = isSample;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Video)) {
            return false;
        }
        return id != null && id.equals(((Video) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Video{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", episode=" + getEpisode() +
            ", description='" + getDescription() + "'" +
            ", url='" + getUrl() + "'" +
            ", courseID='" + getCourseID() + "'" +
            ", chapterID='" + getChapterID() + "'" +
            ", isSample='" + isIsSample() + "'" +
            "}";
    }
}
