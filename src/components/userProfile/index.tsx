import React, { useState } from 'react';
import Image from 'next/image';
import { BsPen } from 'react-icons/bs';
import TopicCard from '../topicCard';
import Link from 'next/link';
import MaterialCard from '../materials/materialCard';
import EditProfile from './editProfile';
import useAuth from '../../../hooks/useAuth';

type Props = {
  userInfo: any;
};

const UserProfile = ({ userInfo }: Props) => {
  const [tabState, setTabState] = useState(1);
  const [isEditPrpfile, setIsEditProfile] = useState(false);
  const [isFollowing, SetIsFollowing] = useState(false);
  const { auth }: any = useAuth();

  const toggleFollow = () => {
    isFollowing ? SetIsFollowing(false) : SetIsFollowing(true);
  };

  const toggleTab = (index: number) => {
    setTabState(index);
  };

  const toggleEditProfile = () => {
    isEditPrpfile ? setIsEditProfile(false) : setIsEditProfile(true);
  };
  return (
    <>
      {isEditPrpfile ? (
        <EditProfile
          userInfo={userInfo}
          toggleEditProfile={toggleEditProfile}
        />
      ) : null}
      <div className={`${isEditPrpfile ? 'hidden' : null} cursor-default`}>
        <div className='  flex justify-center h-[300px] '>
          <div className='items-center w-screen  md:w-full h-[220px] relative bg-[#010122]  flex flex-col justify-center'>
            {userInfo.coverImgUrl ? (
              <>
                <Image
                  src={`${process.env.NEXT_PUBLIC_FILE_API_URL}/user/coverimage/${userInfo.coverImgUrl}`}
                  alt='profile'
                  className='w-full  h-[200px] object-cover top-0 rounded-md m-2'
                  layout='fill'
                />
              </>
            ) : (
              <span className='left top-11 absolute text-4xl font-bold  text-yellow-50'>
                Unilorin Forum
              </span>
            )}
          </div>
          <div className='flex  absolute w-fit left-0  md:left-auto  pl-[20px] top-[100px]   h-fit z-10 '>
            <div className=' relative w-[200px] bg-black h-[200px]  border rounded-full'>
              {userInfo.profileImgUrl ? (
                <Image
                  src={`${process.env.NEXT_PUBLIC_FILE_API_URL}/user/profileimage/${userInfo.profileImgUrl}`}
                  width={200}
                  height={200}
                  alt='profile'
                  className='rounded-full object-cover'
                />
              ) : (
                <Image
                  src={`/ufprofileimg.png`}
                  width={200}
                  height={200}
                  alt='profile'
                  className='rounded-full object-cover'
                />
              )}
            </div>
          </div>
        </div>
        <div className='flex  px-3 mt-1 flex-col '>
          <div className='flex  items-center py-1 justify-between'>
            <span className='  text-3xl'>{userInfo.username}</span>
            {auth.id === userInfo.id ? (
              <span className='font-bold border-2 px-2 py-1'>
                <span onClick={toggleEditProfile}>Edit Profile</span>
              </span>
            ) : (
              <span className='font-bold rounded-full border-2 px-4 py-1'>
                <span onClick={toggleFollow}>
                  {isFollowing ? 'Following' : 'Follow'}
                </span>
              </span>
            )}
          </div>
          <div className='flex text-xl font-bold mt-5 space-x-10'>
            <span>{userInfo.following.length} following</span>
            <span>{userInfo.followedBy.length} followers </span>
          </div>
          <div className='flex border-t-2 py-1 border-[#000] mt-2 flex-col'>
            <span>
              <b>Department:</b>{' '}
              {userInfo.department ? userInfo.department : 'Not set'}
            </span>
            <span>
              <b>Faculty:</b> {userInfo.faculty ? userInfo.faculty : 'Not set'}
            </span>
            <span>
              <b>level:</b> {userInfo.level ? userInfo.level : 'Not set'}
            </span>
            <span className='flex flex-col border p-1'>
              <b>Bio</b> {userInfo.bio ? userInfo.bio : 'Not set'}
            </span>
          </div>
        </div>
        <div className='pb-[250px] '>
          <div className='flex font-bold mt-2 border-b  border-[#000] justify-around text-sm'>
            <div
              onClick={() => toggleTab(1)}
              className={`${
                tabState == 1 ? 'border-b-2' : null
              } z-[2px] pb-2 border-[#bc0303]  px-1`}
            >
              Topics
            </div>
            <div
              onClick={() => toggleTab(2)}
              className={`${
                tabState == 2 ? 'border-b-2' : null
              } z-[2px] pb-2 border-[#bc0303]  px-1`}
            >
              Materials
            </div>
            {/* <div
              onClick={() => toggleTab(3)}
              className={`${
                tabState == 3 ? 'border-b-2' : null
              } z-[2px] pb-2 border-[#bc0303]  px-1`}
            >
              Votings
            </div> */}
            <div
              onClick={() => toggleTab(4)}
              className={`${
                tabState == 4 ? 'border-b-2' : null
              } z-[2px] pb-2 border-[#bc0303]  px-1`}
            >
              Saved Topic
            </div>
            <div
              onClick={() => toggleTab(5)}
              className={`${
                tabState == 5 ? 'border-b-2' : null
              } z-[2px] pb-2 border-[#bc0303]  px-1`}
            >
              Saved Materials
            </div>
          </div>
          <div className=''>
            <div className={`${tabState == 1 ? 'block' : 'hidden'}`}>
              {userInfo.topics.length ? (
                <>
                  {userInfo.topics.map((topic: any) => (
                    <TopicCard key={topic.id} topic={topic} />
                  ))}
                </>
              ) : (
                <span className='flex justify-center mt-1 min-h-[150px] text-white bg-[#090233] items-center'>
                  No Topics
                </span>
              )}
            </div>
            <div className={`${tabState == 2 ? 'block' : 'hidden'}`}>
              {userInfo.materials.length ? (
                <>
                  {/* <MaterialCard />
                  <MaterialCard />
                  <MaterialCard /> */}
                </>
              ) : (
                <span className='flex justify-center mt-1 min-h-[150px] text-white bg-[#090233] items-center'>
                  No Materials
                </span>
              )}
            </div>
            <div className={`${tabState == 3 ? 'block' : 'hidden'}`}>
              {userInfo.SavedTopics.length ? (
                <div></div>
              ) : (
                <span className='flex justify-center mt-1 min-h-[150px] text-white bg-[#090233] items-center'>
                  No Votings
                </span>
              )}
            </div>
            <div className={`${tabState == 4 ? 'block' : 'hidden'}`}>
              {userInfo.SavedTopics.length ? (
                <div></div>
              ) : (
                <span className='flex justify-center mt-1 min-h-[150px] text-white bg-[#090233] items-center'>
                  You have No saved Topic
                </span>
              )}
            </div>
            <div className={`${tabState == 5 ? 'block' : 'hidden '} `}>
              {userInfo.SavedMaterials.length ? (
                <div></div>
              ) : (
                <span className='flex justify-center mt-1 min-h-[150px] text-white bg-[#090233] items-center'>
                  You have No saved materials
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
