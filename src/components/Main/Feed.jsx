import React from 'react';
import styled, { css } from 'styled-components';
import * as styleVariables from '../../styles/globalVariables';
import {
  AiOutlineEllipsis,
  AiOutlineHeart,
  AiOutlineMessage,
} from 'react-icons/ai';
import { BiPaperPlane, BiBookmark } from 'react-icons/bi';
import { MdOutlineInsertEmoticon } from 'react-icons/md';
import { useRef } from 'react';
import { useCallback } from 'react';
import { uploadComment } from './Feed.module';
import { useState } from 'react';

const Feed = (props) => {
  const { feedData, forceUpdate } = props;
  const [isImageLoad, setIsImageLoad] = useState(false);
  const commentInputValue = useRef('');
  const commentInputRef = useRef(null);

  const commentInputButtonClickHandler = useCallback(() => {
    //input이 empty일 때, return
    if (commentInputValue.current === '') return;
    //새로 단 댓글 정보
    const comment = {
      userName: window.localStorage.getItem('currentUser'),
      timeStame: Date.now(),
      content: commentInputValue.current,
    };

    //prams info :  feedID, newComment, callbackFunction
    uploadComment(feedData.id, comment, () => {
      forceUpdate();
    }).then((result) => {
      if (result === 1) commentInputRef.current.value = '';
    });
  }, []);

  const inputChangeHandler = useCallback((e) => {
    commentInputValue.current = e.target.value;
  }, []);

  const inputKeyDownHandler = useCallback((e) => {
    if (e.key === 'Enter') {
      commentInputButtonClickHandler();
    }
  }, []);

  const feedHeader = (
    <FeedHeaderWrapper>
      <Writer>
        <WriterImage
          src={feedData.writerImgUrl}
          alt="writer_image"
        ></WriterImage>
        <WriterName>{feedData.writer}</WriterName>
      </Writer>
      <FeedMenu>
        <AiOutlineEllipsis />
      </FeedMenu>
    </FeedHeaderWrapper>
  );
  const feedImage = (
    <FeedImageWrapper>
      <FeedImage
        src={feedData.contentsImgUrl}
        alt="contents_image"
        onLoad={() => {
          setIsImageLoad(true);
        }}
      />
    </FeedImageWrapper>
  );
  const feedIconBar = (
    <FeedIconBarWrapper>
      <IconsContainer>
        <Icon>
          <AiOutlineHeart />
        </Icon>
        <Icon>
          <AiOutlineMessage />
        </Icon>
        <Icon>
          <BiPaperPlane />
        </Icon>
      </IconsContainer>
      <Icon>
        <BiBookmark />
      </Icon>
    </FeedIconBarWrapper>
  );

  const feedLikes = (
    <FeedLikesWrapper>
      <Likes>좋아요 {feedData.likes}개</Likes>
    </FeedLikesWrapper>
  );

  const feedFooter = (
    <FeedFooterWrapper>{feedData.contentsText}</FeedFooterWrapper>
  );

  const comments =
    feedData.comments.length != 0 ? (
      <CommentWrapper>
        {feedData.comments.map((comment, index) => (
          <Comment key={comment.userName + index}>
            <CommentUserName>{comment.userName}</CommentUserName>
            <CommentText>{comment.content}</CommentText>
          </Comment>
        ))}
      </CommentWrapper>
    ) : (
      <></>
    );

  const commentMaker = (
    <CommentMakerWrapper>
      <EmoticonMakeButton>
        <MdOutlineInsertEmoticon />
      </EmoticonMakeButton>
      <CommentInput
        ref={commentInputRef}
        spellCheck={false}
        placeholder="댓글달기..."
        onChange={inputChangeHandler}
        onKeyDown={inputKeyDownHandler}
      />
      <CommentMakeButton onClick={commentInputButtonClickHandler}>
        게시
      </CommentMakeButton>
    </CommentMakerWrapper>
  );

  return (
    <FeedContainer isImageLoad={isImageLoad}>
      {feedHeader}
      {feedImage}
      {feedIconBar}
      {feedLikes}
      {feedFooter}
      {comments}
      {commentMaker}
    </FeedContainer>
  );
};

export default Feed;

const FeedContainer = styled.div`
  width: 100%;
  border: 1px solid ${styleVariables.border_color};
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

  opacity: 0;
  visibility: hidden;
  ${(props) =>
    props.isImageLoad &&
    css`
      opacity: 1;
      visibility: visible;
    `};
`;

//////////////////////// header //////////////////////////

const FeedHeaderWrapper = styled.section`
  width: 100%;
  height: ${styleVariables.feed_header_height};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
`;

const Writer = styled.div`
  display: flex;
  gap: 10px;
`;
const WriterImage = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
`;
const WriterName = styled.div`
  display: flex;
  height: auto;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
  font-size: 14px;
`;

const FeedMenu = styled.div`
  font-size: 24px;
  height: 32px;
  width: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  cursor: pointer;
  &:hover {
    background-color: #e5e5e5;
  }
`;

//////////////////////// image //////////////////////////

const FeedImageWrapper = styled.section`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const FeedImage = styled.img`
  width: 400px;
  height: 400px;
  object-fit: scale-down;
  background-color: ${styleVariables.feed_img_bg_color};
`;

//////////////////////// iconbar //////////////////////////
const FeedIconBarWrapper = styled.section`
  width: 100%;
  height: 40px;
  padding: 0 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const IconsContainer = styled.div`
  display: flex;
  gap: 10px;
`;
const Icon = styled.div`
  width: 24px;
  height: 24px;
  font-size: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

//////////////////////// feedlikes //////////////////////////

const FeedLikesWrapper = styled.section`
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0 10px;
`;

const Likes = styled.h1`
  font-size: 14px;
  font-weight: 600;
`;

//////////////////////// fotter //////////////////////////

const FeedFooterWrapper = styled.section`
  width: 100%;
  padding: 0 10px;
  color: ${styleVariables.feed_contents_text_color};
  padding-bottom: 10px;
  line-height: 20px;
`;
//////////////////////// comment //////////////////////////

const CommentWrapper = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 10px;
`;

const Comment = styled.div`
  width: 100%;
  display: flex;
  gap: 6px;
  font-size: 14px;
  padding: 2px 0;
  line-height: 18px;
`;

const CommentUserName = styled.h1`
  font-weight: 600;
`;
const CommentText = styled.span`
  word-break: break-all;
`;

//////////////////////// comment maker //////////////////////////

const CommentMakerWrapper = styled.section`
  width: 100%;
  height: 40px;
  padding: 0 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
`;

const EmoticonMakeButton = styled.button`
  font-size: 24px;
  background-color: transparent;
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  padding: 0;
`;
const CommentInput = styled.input`
  flex: 1;
  padding: 0 4px;
  height: 36px;
`;
const CommentMakeButton = styled.button`
  color: blue;
  background-color: transparent;
  cursor: pointer;
`;
