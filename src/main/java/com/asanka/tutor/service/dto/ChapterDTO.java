package com.asanka.tutor.service.dto;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link com.asanka.tutor.domain.Chapter} entity.
 */
public class ChapterDTO implements Serializable {

    private String id;

    @NotNull
    private String name;

    @NotNull
    private Integer chapterNumber;

    @NotNull
    private String description;

    @NotNull
    private String courseID;

    @NotNull
    private String courseName;

    @NotNull
    private Boolean isPaidChapter;


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getChapterNumber() {
        return chapterNumber;
    }

    public void setChapterNumber(Integer chapterNumber) {
        this.chapterNumber = chapterNumber;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCourseID() {
        return courseID;
    }

    public void setCourseID(String courseID) {
        this.courseID = courseID;
    }

    public String getCourseName() {
        return courseName;
    }

    public void setCourseName(String courseName) {
        this.courseName = courseName;
    }

    public Boolean isIsPaidChapter() {
        return isPaidChapter;
    }

    public void setIsPaidChapter(Boolean isPaidChapter) {
        this.isPaidChapter = isPaidChapter;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        ChapterDTO chapterDTO = (ChapterDTO) o;
        if (chapterDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), chapterDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ChapterDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", chapterNumber=" + getChapterNumber() +
            ", description='" + getDescription() + "'" +
            ", courseID='" + getCourseID() + "'" +
            ", courseName='" + getCourseName() + "'" +
            ", isPaidChapter='" + isIsPaidChapter() + "'" +
            "}";
    }
}
