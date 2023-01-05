import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Select from 'react-select';
import 'react-quill/dist/quill.snow.css';
import to, { Toaster } from 'react-hot-toast';
import dynamic from 'next/dynamic';
import useAuth from '../../../hooks/useAuth';
import { AiFillSetting } from 'react-icons/ai';
import axios from 'axios';
const ReactQuill = dynamic(import('react-quill'), { ssr: false });
import Router from 'next/router';
const createOption = (label: string, id: number) => ({
  value: id,
  label: label,
});

const modules = {
  toolbar: [
    [{ header: [2, 3, 4, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    ['link', 'image', 'video', 'll'],
    ['clean'],
  ],
};

const formats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'video',
  'll',
];
export default function NewTopic({ topic }: any) {
  const [topicContent, setTopicContent]: any = useState({});
  const [selectedCategory, setSelectedCategory]: any = useState({
    value: null,
    label: 'Select A Sutable Category',
  });
  const [titleInput, setTitleInput] = useState('');
  const [coverImage, setCoverImage]: any = useState('');
  const [catOptions, setCatOptions] = useState([{}]);
  const [editorInput, setEditorInput] = useState('');
  const [metaDiscription, setMetaDiscription] = useState('');
  const [twitterEmbedLink, setTwitterEmbedLink] = useState('');
  const { auth }: any = useAuth();

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
      setEditorInput(topic.content);
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
    const payload = {
      title: titleInput,
      topicContent: editorInput,
      userId: auth.id,
      coverImageUrl: coverImage,
      categoryId: selectedCategory.value,
      topicId: topic.id,
      twitterEmbedLink: twitterEmbedLink,
      metaDiscription: metaDiscription,
    };
    try {
      const sendTopic = await axios.post(
        `/api/topics/${topic.id ? 'update' : 'create'}`,
        payload
      );
      const toastId = to.loading((t) => (
        <div className='flex rounded-xl  text-[#002D72]'>
          <div className='flex flex-col text-center'>
            <span className='text-xl font-bold'>Publishing...</span>
            <span className='text-sm'>
              Please do not close this modal, uploading may take some time
            </span>
          </div>
        </div>
      ));

      if (sendTopic.data.success) {
        to.dismiss(toastId);
        to.success(sendTopic.data.message);
        Router.push(`/topic/${sendTopic.data.body.slug}`);
      } else {
        to.dismiss(toastId);
        console.log(sendTopic);
        to.error(sendTopic.data.message);
      }

      //
    } catch (error: any) {
      to.error(error.message);
    }
  };

  const handleCoverUpload = async (event: any) => {
    event.preventDefault();

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
          const toastId = to.loading((t) => (
            <div className='flex rounded-xl  text-[#002D72]'>
              <div className='flex flex-col text-center'>
                <span className='text-xl font-bold'>Uploading...</span>
                <span className='text-sm'>
                  Please do not close this page, uploading may take some time
                </span>
              </div>
            </div>
          ));
          let upload = await axios.put(url, image, {
            headers: {
              'Content-type': coverImage.type,
              'Access-Control-Allow-Origin': '*',
            },
          });
          setCoverImage(coverImageUrl);
          to.dismiss(toastId);
          to.success('Cover image Uploaded successfuly');
        }
      } catch (error) {
        console.log(error);
        to.error('Something went wrong, contact an admin for help');
      }
    }
  };
  const handleCoverDelete = async () => {
    const deleteCover = await axios;
    setCoverImage('');
  };

  return (
    <div className='md:bg-[#efefef] pb-[200px] md:h-screen'>
      <Toaster position='top-center' reverseOrder={false} />
      <div className='md:ml-[80px] rounded-lg bg-white md:mt-[40px] md:overflow-scroll p-[10px] md:w-full w-screen md:max-h-[450px] md:max-w-[600px] flex flex-col space-y-3 '>
        {coverImage ? (
          <div>
            <Image
              src={`${
                coverImage
                  ? `${process.env.NEXT_PUBLIC_FILE_API_URL}/topic/coverimage/${coverImage}`
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
          className='outline-none border p-1 rounded-md'
          value={titleInput}
          onChange={handleTitleInput}
          size={50}
        ></input>
        <Select
          options={catOptions}
          onChange={onCategoryChange}
          placeholder='Select A Sutable Category'
          value={selectedCategory}
          className='z-10'
        />
        <div className='w-full max-w-full'>
          <ReactQuill
            theme='snow'
            value={editorInput}
            onChange={setEditorInput}
            modules={modules}
            formats={formats}
          />
        </div>
        <input
          type={'text'}
          placeholder='your topic discription here'
          className='outline-none border rounded-md px-2'
          value={metaDiscription}
          onChange={(e) => {
            setMetaDiscription(e.target.value);
            console.log(metaDiscription);
          }}
        ></input>

        <div className='flex text-ssssssssssssxl bottom-0 fixed z-10 space-x-5 items-center   w-full bg-[#0d0331] text-[#fff] h-12 px-2 '>
          <span
            onClick={() => {
              if (auth.role === 'STUDENT' || !auth.id) {
                to('You need to be an admin to create a topic!', {
                  icon: '🥲',
                  style: {
                    borderRadius: '10px',
                    background: '#0f0f0f',
                    color: '#fff',
                  },
                });
              } else {
                handleSubmit();
              }
            }}
            className='border rounded px-3 font-extrabold bg-white text-[#0d0331] px-1sssssssss '
          >
            {!topic.id ? 'Publish' : 'Update'}
          </span>
          <span>Save</span>
          <AiFillSetting className='text-xl' />
        </div>
      </div>
    </div>
  );
}
