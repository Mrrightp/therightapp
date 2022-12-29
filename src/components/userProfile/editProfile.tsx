import React, { useState, useEffect } from 'react';
import { BiArrowBack, BiImageAdd, BiUpload } from 'react-icons/bi';
import Image from 'next/image';
import axios from 'axios';
import Router from 'next/router';

import { toast, ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { date, object } from 'zod';
import useAuth from '../../../hooks/useAuth';

type Props = {
  toggleEditProfile: any;
  userInfo: any;
};

export default function EditProfile({ toggleEditProfile, userInfo }: Props) {
  const [bio, setBio] = useState('');
  const [userSlug, setUserSlug] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [newWhatsapp, setNewWhatsapp] = useState('');
  const [currentPassword, setCurrentpassword] = useState('');
  const [newPassword, setNewpassword] = useState('');
  const [confirmnewPassword, setConfirmNewpassword] = useState('');
  const [profileImage, setProfileImage]: any = useState('');
  const [coverImage, setCoverImage]: any = useState('');
  const { auth, setAuth }: any = useAuth();
  const HamdleProfileImage = (e: any) => {
    setProfileImage(e.target.files[0]);
  };
  const saveProfileImage = async () => {
    const id = toast.loading('Uploading.', {
      className: 'font-bold text-sm ',
      position: 'top-right',
      autoClose: 5000,
      transition: Slide,
    });
    try {
      let { data } = await axios.post('/api/uploads/profileimage', {
        name: profileImage.name,
        type: profileImage.type,
        userId: userInfo.id,
      });
      if (data.success) {
        const url = data.url;
        const imgUrl = data.imgUrl;
        let upload = await axios.put(url, profileImage, {
          headers: {
            'Content-type': profileImage.type,
            'Access-Control-Allow-Origin': '*',
          },
        });

        if (upload) {
          const profileImageData = {
            userId: userInfo.id,
            imgUrl: imgUrl,
          };
          let savedToDb = await axios.post(
            '/api/profile/profileimage',
            profileImageData
          );
          if (savedToDb.data.success) {
            userInfo.profileImgUrl = imgUrl;
            setProfileImage(false);
            toast.update(id, {
              render: 'updated sucessfully 😊😁',
              type: 'success',
              isLoading: false,
              closeButton: true,
              position: 'top-right',
              autoClose: 5000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              transition: Slide,
            });
          } else {
            toast.update(id, {
              render: 'something went wrong 😢🤦‍♀️🤷‍♀️',
              type: 'error',
              isLoading: false,
              closeButton: true,
              position: 'top-right',
              autoClose: 5000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              transition: Slide,
            });
          }
        } else {
          toast.update(id, {
            render: 'something went wrong 😢🤦‍♀️🤷‍♀️',
            type: 'error',
            isLoading: false,
            closeButton: true,
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            transition: Slide,
          });
        }
      } else {
        toast.update(id, {
          render: 'something went wrong 😢🤦‍♀️🤷‍♀️',
          type: 'error',
          isLoading: false,
          closeButton: true,
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          transition: Slide,
        });
      }
    } catch (error: any) {
      toast.update(id, {
        render: error.message,
        type: 'error',
        isLoading: false,
        closeButton: true,
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Slide,
      });
    }
  };
  const hamdleCoverImage = (e: any) => {
    setCoverImage(e.target.files[0]);
  };
  const coverImageUpload = async () => {
    const id = toast.loading('Uploading.', {
      className: 'font-bold text-sm ',
      position: 'top-right',
      autoClose: 5000,
      transition: Slide,
    });

    try {
      let { data } = await axios.post('/api/uploads/coverimage', {
        name: coverImage.name,
        type: coverImage.type,
        userId: userInfo.id,
      });
      if (data.success) {
        const url = data.url;
        const imgUrl = data.imgUrl;
        let upload = await axios.put(url, coverImage, {
          headers: {
            'Content-type': coverImage.type,
            'Access-Control-Allow-Origin': '*',
          },
        });

        if (upload) {
          const coverImageData = {
            userId: userInfo.id,
            imgUrl: imgUrl,
          };
          let savedToDb = await axios.post(
            '/api/profile/coverimage',
            coverImageData
          );
          if (savedToDb.data.success) {
            userInfo.coverImgUrl = imgUrl;
            setCoverImage(false);
            toast.update(id, {
              render: 'updated sucessfully 😊😁',
              type: 'success',
              isLoading: false,
              closeButton: true,
              position: 'top-right',
              autoClose: 5000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              transition: Slide,
            });
          } else {
            toast.update(id, {
              render: 'something went wrong 😢🤦‍♀️🤷‍♀️',
              type: 'error',
              isLoading: false,
              closeButton: true,
              position: 'top-right',
              autoClose: 5000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              transition: Slide,
            });
          }
        } else {
          toast.update(id, {
            render: 'something went wrong 😢🤦‍♀️🤷‍♀️',
            type: 'error',
            isLoading: false,
            closeButton: true,
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            transition: Slide,
          });
        }
      } else {
        toast.update(id, {
          render: 'something went wrong 😢🤦‍♀️🤷‍♀️',
          type: 'error',
          isLoading: false,
          closeButton: true,
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          transition: Slide,
        });
      }
    } catch (error: any) {
      toast.update(id, {
        render: error.message,
        type: 'error',
        isLoading: false,
        closeButton: true,
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Slide,
      });
    }
  };

  const savePassword = async () => {
    const id = toast.loading('Submiting...', {
      className: 'font-bold text-sm ',
      position: 'top-right',
      autoClose: 5000,
      transition: Slide,
    });
    const passwordData = {
      userId: userInfo.id,
      currentPassword: currentPassword,
      newPassword: newPassword,
      confirmnewPassword: confirmnewPassword,
    };
    if (!currentPassword || !newPassword || !confirmnewPassword) {
      toast.update(id, {
        render: 'Why are you saving empty stuff?😒',
        type: 'error',
        isLoading: false,
        closeButton: true,
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Slide,
      });
    } else {
      try {
        const res = await axios.post(
          '/api/profile/updatepassword',
          passwordData
        );

        toast.update(id, {
          render: res.data.message,
          type: `${res.data.success ? 'success' : 'error'}`,
          isLoading: false,
          closeButton: true,
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          transition: Slide,
        });
        setNewpassword('');
        setConfirmNewpassword('');
        setCurrentpassword('');
      } catch (error) {
        console.log(error);
      }
    }
  };
  const saveSlug = async () => {
    const id = toast.loading('updating...', {
      className: 'font-bold text-sm ',
      position: 'top-right',
      autoClose: 5000,
      transition: Slide,
    });
    function isUserNameValid(username: string) {
      /* 
    Usernames can only have: 
    - Lowercase Letters (a-z) 
    - Numbers (0-9)
    - Dots (.)
    - Underscores (_)
  */
      const res = /^[a-z0-9_\.]+$/.exec(username);
      const valid = !!res;
      return valid;
    }

    const userString = isUserNameValid(userSlug);
    if (userString) {
      const slugData = {
        userId: userInfo.id,
        slug: userSlug,
      };

      const res = await axios.post('/api/profile/slug', slugData);

      if (res.data.success) {
        setAuth(userInfo);
        // Router.push(`/user/${userSlug}`);
      }
      toast.update(id, {
        render: res.data.message,
        type: `${res.data.success ? 'success' : 'error'}`,
        isLoading: false,
        closeButton: true,
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Slide,
      });
    } else {
      toast.update(id, {
        render:
          'Usernames can only have Lowercase Letters (a-z), Numbers (0-9), Dots (.),Underscores (_)',
        type: 'error',
        isLoading: false,
        closeButton: true,
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Slide,
      });
    }
  };
  const saveUsername = async () => {
    const usernameData = {
      userId: userInfo.id,
      username: newUsername,
    };
    try {
      const id = toast.loading('Submiting...', {
        className: 'font-bold text-sm ',
        position: 'top-right',
        autoClose: 5000,
        transition: Slide,
      });
      const res = await axios.post('/api/profile/username', usernameData);

      toast.update(id, {
        render: res.data.message,
        type: `${res.data.success ? 'success' : 'error'}`,
        isLoading: false,
        closeButton: true,
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Slide,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const saveWhatsapp = async () => {
    const whatsappData = {
      userId: userInfo.id,
      whatsapp: newWhatsapp,
    };
    try {
      const id = toast.loading('Submiting...', {
        className: 'font-bold text-sm ',
        position: 'top-right',
        autoClose: 5000,
        transition: Slide,
      });
      const res = await axios.post('/api/profile/whatsapp', whatsappData);

      toast.update(id, {
        render: res.data.message,
        type: `${res.data.success ? 'success' : 'error'}`,
        isLoading: false,
        closeButton: true,
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Slide,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const saveBIo = async () => {
    const Biodata = {
      userId: userInfo.id,
      bio: bio,
    };
    try {
      const id = toast.loading('Submiting...', {
        className: 'font-bold text-sm ',
        position: 'top-right',
        autoClose: 5000,
        transition: Slide,
      });
      const res = await axios.post('/api/profile/bio', Biodata);
      toast.update(id, {
        render: res.data.message,
        type: `${res.data.success ? 'success' : 'error'}`,
        isLoading: false,
        closeButton: true,
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Slide,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className='pb-[140px]'>
      <ToastContainer
        transition={Slide}
        style={{
          width: '300px',
          height: '150px',
          top: '60px',
          left: '15px',
          marginLeft: '20px',
        }}
      />
      <div className='flex text-lg cursor-default h-16 items-center text-[#fff] bg-[#09012c] justify-between px-4'>
        <BiArrowBack className='text-xl' onClick={toggleEditProfile} />
        <span>Edit profile</span>
      </div>
      <div className='flex cursor-default flex-col px-4 pb-10 space-y-5'>
        <div className='mt-3 text-xl p-2 space-y-2 border px-2'>
          <div className='flex justify-between'>
            <span className='text-sm font-bold'>Profile Picture</span>
            <div className='space-x-3  text-sm items-center flex'>
              <div className='relative'>
                <div className='border px-2 space-x-1 text-md items-center flex'>
                  <input
                    type='file'
                    className='absolute w-full opacity-0'
                    src=''
                    alt=''
                    name='profileimg'
                    onChange={HamdleProfileImage}
                  />
                  <BiUpload />
                  <span> Upload</span>
                </div>
              </div>

              <span
                onClick={saveProfileImage}
                className='border border-[#090266]  text-sm px-1'
              >
                Save
              </span>
            </div>
          </div>
          <div
            className='flex justify-center
          '
          >
            {profileImage ? (
              <Image
                src={URL.createObjectURL(profileImage)}
                width={200}
                height={200}
                alt='profile Image'
                className='object-cover'
              />
            ) : (
              <>
                {userInfo.profileImgUrl ? (
                  <Image
                    className='object-cover'
                    width={200}
                    height={200}
                    alt='profile Image'
                    src={`${process.env.NEXT_PUBLIC_FILE_API_URL}/user/profileimage/${userInfo.profileImgUrl}`}
                  />
                ) : (
                  <span className='text-sm font-bold text-center'>
                    Profile Image is not set
                  </span>
                )}
              </>
            )}
          </div>
        </div>
        <div className=' flex flex-col text-xl p-2 space-y-2 border px-2'>
          <div className='flex mb-4  justify-between'>
            <span className='text-sm font-bold'>Cover Photo</span>
            <div className='space-x-3  text-sm items-center flex'>
              <div className='relative'>
                <div className='border px-2 space-x-1 text-md items-center flex'>
                  <input
                    type='file'
                    className='absolute w-full opacity-0'
                    src=''
                    alt=''
                    name='profileimg'
                    onChange={hamdleCoverImage}
                  />
                  <BiUpload />
                  <span> Upload</span>
                </div>
              </div>

              <span
                onClick={coverImageUpload}
                className='border border-[#090266]  text-sm px-1'
              >
                Save
              </span>
            </div>
          </div>
          {coverImage ? (
            <Image
              src={URL.createObjectURL(coverImage)}
              width={400}
              height={200}
              className=' object-cover mt-5'
              alt='profile Image'
            />
          ) : (
            <>
              {userInfo.coverImgUrl ? (
                <Image
                  src={`${process.env.NEXT_PUBLIC_FILE_API_URL}/user/coverimage/${userInfo.coverImgUrl}`}
                  width={400}
                  height={200}
                  className=' object-cover mt-5'
                  alt='profile Image'
                />
              ) : (
                <span className='text-sm font-bold text-center'>
                  cover is not set
                </span>
              )}
            </>
          )}
        </div>
        <div className=' flex flex-col text-xl p-2 space-y-2 border px-2'>
          <div className='flex  justify-between'>
            <span className='text-sm font-bold'>Bio</span>
            <span
              onClick={saveBIo}
              className='border border-[#090266]  text-sm px-1'
            >
              Save
            </span>
          </div>
          <textarea
            onChange={(e) => {
              userInfo.bio = e.target.value;
              setBio(e.target.value);
            }}
            value={`${userInfo.bio}`}
            className='text-sm p-1 h-10 outline-none'
            name=''
            id=''
          ></textarea>
        </div>
        <div className=' flex flex-col text-xl p-2 space-y-2 border px-2'>
          <div className='flex  justify-between'>
            <span className='text-sm font-bold'>Whatsapp</span>
            <span
              onClick={saveWhatsapp}
              className='border border-[#090266] text-sm px-1'
            >
              Save
            </span>
          </div>
          <input
            value={`${userInfo.whatsApp}`}
            onChange={(e) => {
              userInfo.whatsApp = e.target.value;
              setNewWhatsapp(e.target.value);
            }}
            type='number'
            name=''
            id=''
          />
        </div>
        <div className=' flex flex-col text-xl p-2 space-y-2 border px-2'>
          <div className='flex  justify-between'>
            <span className='text-sm font-bold'>User Id</span>
            <span
              onClick={saveSlug}
              className='border border-[#090266]  text-sm px-1'
            >
              Save
            </span>
          </div>
          <div className='flex flex-col space-y-2 border p-1'>
            <input
              className='border border-[#090266] p-1'
              type='text'
              value={userInfo.slug}
              onChange={(e) => {
                userInfo.slug = e.target.value;
                setUserSlug(e.target.value);
              }}
            />
          </div>
        </div>
        <div className=' flex flex-col text-xl p-2 space-y-2 border px-2'>
          <div className='flex  justify-between'>
            <span className='text-sm font-bold'>username</span>
            <span
              onClick={saveUsername}
              className='border border-[#090266]  text-sm px-1'
            >
              Save
            </span>
          </div>
          <div className='flex flex-col space-y-2 border p-1'>
            <input
              className='border border-[#090266] p-1'
              type='text'
              value={userInfo.username}
              onChange={(e) => {
                userInfo.username = e.target.value;
                setNewUsername(e.target.value);
              }}
            />
          </div>
        </div>
        <div className=' flex flex-col text-xl p-2 space-y-2 border px-2'>
          <div className='flex  justify-between'>
            <span className='text-sm font-bold'>Update password</span>
            <span
              onClick={savePassword}
              className='border border-[#090266]  text-sm px-1'
            >
              Save
            </span>
          </div>
          <div className='flex flex-col space-y-2 border p-1'>
            <input
              className='border border-[#090266] p-1'
              type='password'
              placeholder='current password'
              onChange={(e) => {
                setCurrentpassword(e.target.value);
              }}
            />
            <input
              className='border border-[#090266] p-1'
              type='password'
              placeholder='New password'
              onChange={(e) => {
                setNewpassword(e.target.value);
              }}
            />
            <input
              className='border border-[#090266] p-1'
              type='password'
              placeholder='confirm password'
              onChange={(e) => {
                setConfirmNewpassword(e.target.value);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
