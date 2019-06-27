package com.asanka.tutor.service.mapper;

import com.asanka.tutor.domain.*;
import com.asanka.tutor.service.dto.ChapterDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Chapter} and its DTO {@link ChapterDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface ChapterMapper extends EntityMapper<ChapterDTO, Chapter> {



    default Chapter fromId(String id) {
        if (id == null) {
            return null;
        }
        Chapter chapter = new Chapter();
        chapter.setId(id);
        return chapter;
    }
}
