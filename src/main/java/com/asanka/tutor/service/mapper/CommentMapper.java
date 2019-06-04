package com.asanka.tutor.service.mapper;

import com.asanka.tutor.domain.*;
import com.asanka.tutor.service.dto.CommentDTO;

import org.mapstruct.*;

import java.util.List;

/**
 * Mapper for the entity Comment and its DTO CommentDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface CommentMapper extends EntityMapper<CommentDTO, Comment> {
    @Override
    default CommentDTO toDto(Comment entity) {
        return new CommentDTO(entity);
    }
}
