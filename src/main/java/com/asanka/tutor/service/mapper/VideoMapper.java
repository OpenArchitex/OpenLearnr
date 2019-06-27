package com.asanka.tutor.service.mapper;

import com.asanka.tutor.domain.*;
import com.asanka.tutor.service.dto.VideoDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Video} and its DTO {@link VideoDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface VideoMapper extends EntityMapper<VideoDTO, Video> {



    default Video fromId(String id) {
        if (id == null) {
            return null;
        }
        Video video = new Video();
        video.setId(id);
        return video;
    }
}
