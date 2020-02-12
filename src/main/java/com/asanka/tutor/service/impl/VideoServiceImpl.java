package com.asanka.tutor.service.impl;

import com.asanka.tutor.domain.Authority;
import com.asanka.tutor.domain.User;
import com.asanka.tutor.domain.Video;
import com.asanka.tutor.repository.VideoRepository;
import com.asanka.tutor.security.AuthoritiesConstants;
import com.asanka.tutor.service.UserService;
import com.asanka.tutor.service.VideoService;
import com.asanka.tutor.service.dto.VideoDTO;
import com.asanka.tutor.service.mapper.VideoMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link Video}.
 */
@Service
public class VideoServiceImpl implements VideoService {

    private final Logger log = LoggerFactory.getLogger(VideoServiceImpl.class);

    private final VideoRepository videoRepository;

    private final UserService userService;

    private final VideoMapper videoMapper;

    public VideoServiceImpl(VideoRepository videoRepository, VideoMapper videoMapper, UserService userService) {
        this.videoRepository = videoRepository;
        this.videoMapper = videoMapper;
        this.userService = userService;
    }

    /**
     * Save a video.
     *
     * @param videoDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public VideoDTO save(VideoDTO videoDTO) {
        log.debug("Request to save Video : {}", videoDTO);
        Video video = videoMapper.toEntity(videoDTO);
        video = videoRepository.save(video);
        return videoMapper.toDto(video);
    }

    /**
     * Get all the videos.
     *
     * @return the list of entities.
     */
    @Override
    public List<VideoDTO> findAll() {
        log.debug("Request to get all Videos");
        return videoRepository.findAll().stream()
            .map(videoMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get all the videos for a collection of chapters.
     *
     * @return the list of entities
     */
    @Override
    public List<VideoDTO> findAllVideosForChapters(String[] chapterIDs) {
        log.debug("Request to get all Videos for the chapters");
        List<Video> videos = videoRepository.findVideosByChapterIDIn(chapterIDs);
        Optional<User> user = userService.getUserWithAuthorities();
        Authority adminAuthority = new Authority();
        adminAuthority.setName(AuthoritiesConstants.ADMIN);
        if (!user.isPresent()) {
            setVideoUrlIfNotSample(videos);
        } else if (!user.get().getAuthorities().contains(adminAuthority)) {
            Set<String> chapters = user.get().getChapters();
            if (chapters == null) {
                setVideoUrlIfNotSample(videos);
            } else {
                setVideoUrlIfNotSampleAndChapterDoesNotContaint(videos, chapters);
            }
        }
        return videos.stream().map(videoMapper::toDto).collect(Collectors.toList());
    }

	private void setVideoUrlIfNotSample(List<Video> videos) {
		for (Video video: videos) {
		    if (!video.isIsSample())
		        video.setUrl(null);
		}
	}

	private void setVideoUrlIfNotSampleAndChapterDoesNotContaint(List<Video> videos, Set<String> chapters) {
		for (Video video : videos) {
		    if (!chapters.contains(video.getChapterID()) && !video.isIsSample())
		        video.setUrl(null);
		}
	}

    /**
     * Get one video by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    public Optional<VideoDTO> findOne(String id) {
        log.debug("Request to get Video : {}", id);
        return videoRepository.findById(id)
            .map(videoMapper::toDto);
    }

    /**
     * Delete the video by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(String id) {
        log.debug("Request to delete Video : {}", id);
        videoRepository.deleteById(id);
    }
}
