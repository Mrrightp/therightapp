import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Select from 'react-select';
import to, { Toaster } from 'react-hot-toast';
import dynamic from 'next/dynamic';
import useAuth from '../../../hooks/useAuth';
import { AiFillSetting } from 'react-icons/ai';
import draftToHtml from 'draftjs-to-html';
import axios from 'axios';
import { toast, ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Router from 'next/router';
import { RiScreenshot2Fill } from 'react-icons/ri';
const ContentInputComponent = dynamic(import('./contentInput'), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});
const createOption = (label: string, id: number) => ({
  value: id,
  label: label,
});
export default function NewTopic({ topic }: any) {
  const [topicContent, setTopicContent]: any = useState({});
  const [selectedCategory, setSelectedCategory]: any = useState({
    value: null,
    label: 'Select A Sutable Category',
  });
  const [titleInput, setTitleInput] = useState('');
  const [coverImage, setCoverImage]: any = useState('');
  const [catOptions, setCatOptions] = useState([{}]);
  const [screenshoots, setScreenShoots]: any = useState('');
  const { auth }: any = useAuth();
  console.log(auth.role);

  useEffect(() => {
    if (topic.id) {
      if (auth.id !== topic.authorId) {
        Router.back();
      }

      setTitleInput(topic.title);
      setSelectedCategory({
        value: topic.Category.id,
        label: topic.Category.title,
      });
    }

    axios
      .get('api/categories/admin')
      .then((res) => {
        const defaultOptions = res.data.map((x: any) =>
          createOption(x.title, x.id)
        );
        setCatOptions(defaultOptions);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const handleScreenshoots = (e: any) => {
    let filesArray: any = Array.from(e.target.files);
    filesArray = filesArray.map((file: any) => file);
    setScreenShoots(filesArray);
  };
  const handleTitleInput = (e: any) => {
    setTitleInput(e.target.value);
  };
  const handletopicContentChange = (editorState: any) => {
    setTopicContent(editorState);
    window.localStorage.setItem(
      'uf_saved_content',
      JSON.stringify(editorState)
    );
  };

  const onCategoryChange = (selectedCategory: any) => {
    setSelectedCategory(selectedCategory);
    window.localStorage.setItem(
      'uf_saved_cat',
      JSON.stringify(selectedCategory)
    );
  };
  const handleSubmit = async () => {
    const ToastId = toast.loading(
      'Publishing ....., pls do not cloase this page, uploading may take some time',
      {
        className: 'font-bold text-sm ',
        position: 'top-right',
        transition: Slide,
      }
    );
    const payload = {
      title: titleInput,
      topicContent: draftToHtml(topicContent),
      userId: auth.id,
      coverImageUrl: coverImage,
      categoryId: selectedCategory.value,
      topicId: topic.id,
    };
    try {
      const sendTopic = await axios.post(
        `/api/topics/${topic.id ? 'update' : 'create'}`,
        payload
      );
      console.log(sendTopic);

      if (!sendTopic.data.success) {
        toast.update(ToastId, {
          render: sendTopic.data.message,
          type: !sendTopic.data.success ? 'error' : 'success',
          isLoading: false,
          closeButton: true,
          position: 'top-right',
          autoClose: 4000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          transition: Slide,
        });
      } else {
        const topicId = sendTopic.data.body.id;
        const topicSlug = sendTopic.data.body.slug;
        for (var x = 0; x < screenshoots.length; x++) {
          try {
            let { data } = await axios.post('/api/uploads', {
              name: screenshoots[x].name,
              type: screenshoots[x].type,
              userId: auth.id,
              folder: 'topic',
              topicId: topicId,
            });
            if (data.success) {
              const url = data.url;
              const screenshootUrl = data.Url;
              let upload = await axios.put(url, screenshoots[x], {
                headers: {
                  'Content-type': screenshoots[x].type,
                  'Access-Control-Allow-Origin': '*',
                },
              });

              if (upload.status == 200) {
                const screenshootsSize = `${(
                  screenshoots[x].size /
                  1024 /
                  1024
                ).toFixed(2)}MB`;
                const screenshootData = {
                  UploadUrl: screenshootUrl,
                  topicId: topicId,
                  size: screenshootsSize,
                  name: screenshoots[x].name,
                };

                let saveToDb: any = await axios.post(
                  '/api/topics/saveimagetodb',
                  screenshootData
                );
              }
            }
          } catch (error) {
            console.log(error);
          }
        }
        if (sendTopic.data.success) {
          toast.update(ToastId, {
            render: sendTopic.data.message,
            type: !sendTopic.data.success ? 'error' : 'success',
            isLoading: false,
            closeButton: true,
            position: 'top-right',
            autoClose: 4000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            transition: Slide,
          });
          Router.push(`/topic/${topicSlug}`);
        }
      }
    } catch (error: any) {
      toast.update(ToastId, {
        render: error.message,
        type: 'error',
        isLoading: false,
        closeButton: true,
        position: 'top-right',
        autoClose: 4000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Slide,
      });
    }
  };

  const handleCoverUpload = async (event: any) => {
    event.preventDefault();
    const ToastId = toast.loading(
      'Publishing Material....., pls do not cloase this page, uploading may take some time',
      {
        className: 'font-bold text-sm ',
        position: 'top-right',
        transition: Slide,
      }
    );
    const image = event.target.files[0];

    if (image) {
      const sendCoverImage = await axios.post('/api/uploads/coverimage', {
        name: image.name,
        type: image.type,
      });
      try {
        if (sendCoverImage.data.url) {
          const url = sendCoverImage.data.url;
          const coverImageUrl = sendCoverImage.data.imgUrl;
          let upload = await axios.put(url, image, {
            headers: {
              'Content-type': coverImage.type,
              'Access-Control-Allow-Origin': '*',
            },
          });
          setCoverImage(coverImageUrl);
          toast.update(ToastId, {
            render: 'cover Uploaded successfuly',
            type: 'success',
            isLoading: false,
            closeButton: true,
            position: 'top-right',
            autoClose: 4000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            transition: Slide,
          });
        }
      } catch (error) {
        console.log(error);
        toast.update(ToastId, {
          render: 'Something went wrong, contact an admin for help',
          type: 'error',
          isLoading: false,
          closeButton: true,
          position: 'top-right',
          autoClose: 4000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          transition: Slide,
        });
      }
    }
  };
  const handleCoverDelete = async () => {
    const deleteCover = await axios;
    setCoverImage('');
  };

  return (
    <div className='md:bg-[#efefef] pb-[200px] md:h-screen'>
      <ToastContainer
        className={' w-[20px]'}
        transition={Slide}
        style={{
          width: '300px',
          height: '150px',
          top: '60px',
          left: '15px',
          marginLeft: '20px',
        }}
      />
      <Toaster position='bottom-center' reverseOrder={false} />
      <div className='md:ml-[80px] rounded-lg bg-white md:mt-[40px] md:overflow-scroll p-[10px] md:w-full w-screen md:max-h-[450px] md:max-w-[600px] flex flex-col space-y-3 '>
        {coverImage ? (
          <div>
            <Image
              src={`${
                coverImage
                  ? `${process.env.NEXT_PUBLIC_FILE_API_URL}/user/coverimage/${coverImage}`
                  : ''
              }`}
              width='300px'
              height='150px'
              className='object-cover  absolute rounded-md'
              alt=''
            />
          </div>
        ) : null}
        {!coverImage ? (
          <div className='border-2 text-center w-fit relative p-1 rounded-md font-bold border-[#c5c5c5]'>
            <input
              type='file'
              className='absolute opacity-0 top-0'
              name=''
              id=''
              onChange={handleCoverUpload}
              accept='image/*'
            />
            <span>Add a cover image</span>
          </div>
        ) : (
          <div
            onClick={handleCoverDelete}
            className='border-2 border-[#860303] text-center w-fit relative p-1 rounded-md '
          >
            <span>Remove cover image</span>
          </div>
        )}
        <input
          type={'text'}
          placeholder='Your Topic Title Here'
          className='outline-none'
          value={titleInput}
          onChange={handleTitleInput}
        ></input>
        <Select
          options={catOptions}
          onChange={onCategoryChange}
          placeholder='Select A Sutable Category'
          value={selectedCategory}
          className='z-10'
        />
        <div className='w-full max-w-full'>
          <ContentInputComponent
            topicContent={topic.content}
            handletopicContentChange={handletopicContentChange}
          />
        </div>
        <div className='relative flex border w-fit p-3 font-bold space-x-1 items-center text-xl'>
          <input
            className='absolute opacity-0 top-0 left-0 w-full'
            type='file'
            name=''
            accept='image/*'
            multiple
            onChange={handleScreenshoots}
          />
          <span className='text-sm'>Add screenshots</span>
          <RiScreenshot2Fill />
        </div>
        {screenshoots ? (
          <div className='flex flex-wrap  items-center space-x-2'>
            {screenshoots.map((screenshoot: any) => {
              return (
                <div key={screenshoot}>
                  <Image
                    src={URL.createObjectURL(screenshoot)}
                    alt=''
                    width={120}
                    height={100}
                    className='object-cover'
                  />
                </div>
              );
            })}
          </div>
        ) : null}
      </div>

      <div className='flex text-ssssssssssssxl bottom-0 fixed z-10 space-x-5 items-center   w-full bg-[#0d0331] text-[#fff] h-12 px-2 '>
        <span
          onClick={() => {
            if (auth.role === 'STUDENT' || !auth.id) {
              to(
                "Until we have lunch fully You'll need to be an admin to create a topic!",
                {
                  icon: '🥲',
                  style: {
                    borderRadius: '10px',
                    background: '#0f0f0f',
                    color: '#fff',
                  },
                }
              );
            } else {
              handleSubmit();
            }
          }}
          className='border rounded px-3 font-extrabold bg-white text-[#0d0331] px-1sssssssss '
        >
          Publish
        </span>

        <span>Save</span>
        <AiFillSetting className='text-xl' />
      </div>
    </div>
  );
}
