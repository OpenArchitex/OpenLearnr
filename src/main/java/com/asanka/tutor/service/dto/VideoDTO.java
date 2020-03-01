package com.asanka.tutor.service.dto;
import com.asanka.tutor.domain.Resource;

import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.List;
import java.util.Objects;

/**
 * A DTO for the {@link com.asanka.tutor.domain.Video} entity.
 */
public class VideoDTO implements Serializable {

    private String id;

    @NotNull
    private String name;

    @NotNull
    private Integer episode;

    @NotNull
    private String description;

    @NotNull
    private String url;

    @NotNull
    private String courseID;

    @NotNull
    private String courseName;

    @NotNull
    private String chapterID;

    @NotNull
    private String chapterName;

    private List<Resource> resources;

    @NotNull
    private Boolean isSample;


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

    public Integer getEpisode() {
        return episode;
    }

    public void setEpisode(Integer episode) {
        this.episode = episode;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getCourseID() {
        return courseID;
    }

    public void setCourseID(String courseID) {
        this.courseID = courseID;
    }

    public String getChapterID() {
        return chapterID;
    }

    public void setChapterID(String chapterID) {
        this.chapterID = chapterID;
    }

    public Boolean isIsSample() {
        return isSample;
    }

    public void setIsSample(Boolean isSample) {
        this.isSample = isSample;
    }

    public List<Resource> getResources() {
        return resources;
    }

    public void setResources(List<Resource> resources) {
        this.resources = resources;
    }

    public String getCourseName() {
        return courseName;
    }

    public void setCourseName(String courseName) {
        this.courseName = courseName;
    }

    public String getChapterName() {
        return chapterName;
    }

    public void setChapterName(String chapterName) {
        this.chapterName = chapterName;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        VideoDTO videoDTO = (VideoDTO) o;
        if (videoDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), videoDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "VideoDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", episode=" + getEpisode() +
            ", description='" + getDescription() + "'" +
            ", url='" + getUrl() + "'" +
            ", courseID='" + getCourseID() + "'" +
            ", courseName='" + getCourseName() + "'" +
            ", chapterID='" + getChapterID() + "'" +
            ", chapterName='" + getChapterName() + "'" +
            ", isSample='" + isIsSample() + "'" +
            "}";
    }
}
