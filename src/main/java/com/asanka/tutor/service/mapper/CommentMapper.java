package com.asanka.tutor.service.mapper;

import com.asanka.tutor.domain.*;
import com.asanka.tutor.service.dto.CommentDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Comment} and its DTO {@link CommentDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface CommentMapper extends EntityMapper<CommentDTO, Comment> {

    default Comment fromId(String id) {
        if (id == null) {
            return null;
        }
        Comment comment = new Comment();
        comment.setId(id);
        return comment;
    }
}
