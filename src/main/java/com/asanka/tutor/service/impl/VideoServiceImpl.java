package com.asanka.tutor.service.impl;

import com.asanka.tutor.domain.Authority;
import com.asanka.tutor.domain.Chapter;
import com.asanka.tutor.domain.User;
import com.asanka.tutor.repository.UserRepository;
import com.asanka.tutor.security.AuthoritiesConstants;
import com.asanka.tutor.security.UserNotActivatedException;
import com.asanka.tutor.security.UserNotLoggedInException;
import com.asanka.tutor.service.UserService;
import com.asanka.tutor.service.VideoService;
import com.asanka.tutor.domain.Video;
import com.asanka.tutor.repository.VideoRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;

/**
 * Service Implementation for managing Video.
 */
@Service
public class VideoServiceImpl implements VideoService {

    private final Logger log = LoggerFactory.getLogger(VideoServiceImpl.class);

    private final VideoRepository videoRepository;

    private final UserRepository userRepository;

    private final UserService userService;

    public VideoServiceImpl(VideoRepository videoRepository, UserRepository userRepository, UserService userService) {
        this.videoRepository = videoRepository;
        this.userRepository = userRepository;
        this.userService = userService;
    }

    /**
     * Save a video.
     *
     * @param video the entity to save
     * @return the persisted entity
     */
    @Override
    public Video save(Video video) {
        log.debug("Request to save Video : {}", video);        return videoRepository.save(video);
    }

    /**
     * Get all the videos.
     *
     * @return the list of entities
     */
    @Override
    public List<Video> findAll() {
        log.debug("Request to get all Videos");
        return videoRepository.findAll();
    }

    /**
     * Get all the videos for a collection of chapters.
     *
     * @return the list of entities
     */
    @Override
    public List<Video> findAllVideosForChapters(String[] chapterIDs) {
        log.debug("Request to get all Videos for the chapters");
        List<Video> videos = videoRepository.findVideosByChapterIDIn(chapterIDs);
        Optional<User> user = userService.getUserWithAuthorities();
        if (!user.isPresent()) {
            log.error("User is not logged in!!");
            throw new UserNotLoggedInException("User is not logged in!");
        }
        Authority authority = new Authority();
        authority.setName(AuthoritiesConstants.ADMIN);
        if (!user.get().getAuthorities().contains(authority)) {
            Set<String> chapters = user.get().getChapters();
            for (Video video : videos) {
                if (!chapters.contains(video.getChapterID()) && !video.isIsSample())
                    video.setUrl(null);
            }
        }
        return videos;
    }

    /**
     * Get one video by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    public Optional<Video> findOne(String id) {
        log.debug("Request to get Video : {}", id);
        return videoRepository.findById(id);
    }

    /**
     * Delete the video by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(String id) {
        log.debug("Request to delete Video : {}", id);
        videoRepository.deleteById(id);
    }
}
