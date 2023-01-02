import React, { useState, useEffect, useCallback } from 'react';
import { AiOutlineComment } from 'react-icons/ai';
import { FaShare, FaSave } from 'react-icons/fa';
import { BsFillHeartFill } from 'react-icons/bs';
import { HiDotsVertical } from 'react-icons/hi';
import useAuth from '../../../hooks/useAuth';
// import Replys from '../replys';
import axios from 'axios';
import abbreviateNumber from '../../utils/abbreviateNumber';
import TopicOptions from './topicOptions';
type Props = {
  toggleReply: any;
  topic: any;
  topicLikes: any;
  topicSaved: any;
};

export default function TopicBottom({
  toggleReply,
  topic,
  topicLikes,
  topicSaved,
}: Props) {
  const [likeSate, setLikeSate] = useState(false);
  const [savedSate, setSavedSate] = useState(false);
  const [shareSate, setShareSate] = useState(false);

  const [savedCount, setSavedCount] = useState(topic.savedTopics.length);
  const [shareCount, setShareCount] = useState(topic.shareCount);
  const [likeId, setLikeId] = useState(null);
  const [savedId, setSavedId] = useState(null);
  const [optionState, setOptionState] = useState(false);
  const [likesCount, setLikesCount] = useState(topicLikes.length);
  const { auth }: any = useAuth();
  const LikedArray = topicLikes.filter((el: any) => {
    return el.likeUserId == auth.id && el.likedTopicId == topic.id;
  });
  const savedArray = topicSaved.filter((el: any) => {
    return el.SavedUserId == auth.id && el.SavedTopicId == topic.id;
  });

  useEffect(() => {
    if (LikedArray.length > 0) {
      setLikeSate(true);
      setLikeId(LikedArray[0].id);
    }
    if (savedArray.length > 0) {
      setSavedSate(true);
      setLikeId(savedArray[0].id);
    }
  }, []);
  const toggleOptions = () => {
    optionState ? setOptionState(false) : setOptionState(true);
  };

  const shareTopic = async () => {
    if (!shareSate) {
      setShareSate(true);

      const data = {
        shareCount: shareCount + 1,
        topicId: topic.id,
      };
      const addShare = await axios.post('/api/topics/share', data);
      setShareCount(shareCount + 1);
    }
  };
  const toggleLIke = async () => {
    if (likeSate) {
      if (auth.id) {
        const data = {
          likeId,
          userId: auth.id,
          topicId: topic.id,
        };
        const removeLike = await axios.post('/api/topics/unlike', data);
        if (removeLike) {
          setLikesCount(likesCount - 1);
          setLikeSate(false);
          setLikeId(null);
        }
      } else {
        alert('you need to be logged in to like a topic');
      }
    } else {
      if (auth.id) {
        const data = {
          topic_id: topic.id,
          userId: auth.id,
        };
        const newLike = await axios.post('/api/topics/like', data);

        if (newLike.data.success) {
          setLikeSate(true);
          setLikesCount(likesCount + 1);
          setLikeId(newLike.data.likeId);
        } else if (newLike.data.body.hasLiked) {
          setLikeSate(true);
          setLikeId(newLike.data.body.likeId);
        }
      } else {
        alert('you need to be logged in to like a topic');
      }
    }
  };
  const toggleSave = async () => {
    if (savedSate) {
      if (auth.id) {
        const data = {
          savedId,
          userId: auth.id,
          topicId: topic.id,
        };
        const removeSaved = await axios.post('/api/topics/unsave', data);
        if (removeSaved) {
          setSavedCount(savedCount - 1);
          setSavedSate(false);
          setSavedId(null);
        }
      } else {
        alert('you need to be logged in to save a topic');
      }
    } else {
      const data = {
        userId: auth.id,
        topicId: topic.id,
      };
      const saveTopic = await axios.post('/api/topics/save', data);
      setSavedSate(true);
      setSavedCount(savedCount + 1);
      setSavedId(saveTopic.data.body.id);
    }
  };

  return (
    <>
      <div className={`w-full ${auth.role == 'ADMIN' ? null : 'hidden'}`}>
        <div className='text-2xl w-full Topic-bottom fixed z-10  items-center flex justify-around '>
          <div className='flex space-x-[5px]'>
            <div className='flex  items-center '>
              <BsFillHeartFill
                onClick={toggleLIke}
                className={`${
                  likeSate ? 'text-[#e60a0a]' : 'text-[#fff]'
                } font-extrabold `}
              />
            </div>
            <span className='text-sm  ml-5'>
              {abbreviateNumber(likesCount)}
            </span>
          </div>
          <div
            onClick={toggleReply}
            className='flex  items-center space-x-[5px]'
          >
            <AiOutlineComment />
            <span className='text-sm'>20k</span>
          </div>

          <div onClick={toggleSave} className='flex items-center space-x-[5px]'>
            <FaSave className={` ${savedSate ? 'text-[#e60a0a]' : ''}`} />
            <span className='text-sm'>{abbreviateNumber(savedCount)} </span>
          </div>
          <div
            onClick={shareTopic}
            className='flex  items-center space-x-[5px]'
          >
            <FaShare className='text-[20px]' />
            <span className='text-sm'>{abbreviateNumber(shareCount)}</span>
          </div>
          <div
            onClick={toggleOptions}
            className='flex  items-center space-x-[5px]'
          >
            <HiDotsVertical />
          </div>
        </div>
      </div>
      {optionState ? (
        <TopicOptions toggleOptions={toggleOptions} topic={topic} />
      ) : null}
    </>
  );
}
