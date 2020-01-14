package com.asanka.tutor.domain;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;
import javax.validation.constraints.*;

import java.io.Serializable;

/**
 * A Chapter.
 */
@Document(collection = "chapter")
public class Chapter implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @NotNull
    @Field("name")
    private String name;

    @NotNull
    @Field("chapter_number")
    private Integer chapterNumber;

    @NotNull
    @Field("description")
    private String description;

    @NotNull
    @Field("course_id")
    private String courseID;

    @NotNull
    @Field("course_name")
    private String courseName;
    @NotNull
    @Field("is_paid_chapter")
    private Boolean isPaidChapter;

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

    public Chapter name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getChapterNumber() {
        return chapterNumber;
    }

    public Chapter chapterNumber(Integer chapterNumber) {
        this.chapterNumber = chapterNumber;
        return this;
    }

    public void setChapterNumber(Integer chapterNumber) {
        this.chapterNumber = chapterNumber;
    }

    public String getDescription() {
        return description;
    }

    public Chapter description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCourseID() {
        return courseID;
    }

    public Chapter courseID(String courseID) {
        this.courseID = courseID;
        return this;
    }

    public void setCourseID(String courseID) {
        this.courseID = courseID;
    }

    public String getCourseName() {
        return courseName;
    }
    public Chapter courseName(String courseName) {
        this.courseName = courseName;
        return this;
    }
    public void setCourseName(String courseName) {
        this.courseName = courseName;
    }
    public Boolean isIsPaidChapter() {
        return isPaidChapter;
    }

    public Chapter isPaidChapter(Boolean isPaidChapter) {
        this.isPaidChapter = isPaidChapter;
        return this;
    }

    public void setIsPaidChapter(Boolean isPaidChapter) {
        this.isPaidChapter = isPaidChapter;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Chapter)) {
            return false;
        }
        return id != null && id.equals(((Chapter) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Chapter{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", chapterNumber=" + getChapterNumber() +
            ", description='" + getDescription() + "'" +
            ", courseID='" + getCourseID() + "'" +
            ", isPaidChapter='" + isIsPaidChapter() + "'" +
            "}";
    }
}
