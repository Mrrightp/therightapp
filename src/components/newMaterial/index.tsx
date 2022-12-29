import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { toast, ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  AiFillFilePdf,
  AiOutlineCloudUpload,
  AiFillDelete,
} from 'react-icons/ai';
import CreatableSelect from 'react-select/creatable';
import { GrDocumentUpload } from 'react-icons/gr';
import { HiOutlineBookOpen } from 'react-icons/hi';
import { MdUpload } from 'react-icons/md';
import useAuth from '../../../hooks/useAuth';

import Router from 'next/router';
type Props = {
  filesInput?: any;
};
interface Option {
  readonly label: string;
  readonly value: string;
}
const createOption = (label: string, id: number) => ({
  value: id,
  label: label,
});

export default function NewMaterial({}: Props) {
  const { auth }: any = useAuth();
  const [titleInput, setTitleInput] = useState('');
  const [courseCode, setCourseCode]: any = useState([
    { value: null, label: 'select the Course code' },
  ]);
  const [discriptionInput, setDiscriptionInput] = useState('');
  const [files, setFiles] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions]: any = useState();

  const uploads: any = [];
  const handleTitleInput = (e: any) => {
    const title = e.target.value;
    setTitleInput(title);
  };
  const handleDiscriptionInput = (e: any) => {
    const discription = e.target.value;
    setDiscriptionInput(discription);
  };
  const handleCreate = async (inputValue: string) => {
    setIsLoading(true);
    const pattern = /^[A-Z]{3}\s\d{3}$/;
    const matches = pattern.test(inputValue);
    if (matches) {
      const payload: any = {
        name: inputValue,
      };
      const { data } = await axios.post('/api/coursecode/create', payload);
      if (data.success) {
        setIsLoading(false);
        const newOption: any = {
          value: data.message.id,
          label: data.message.name,
        };

        setCourseCode(newOption);
      }
    } else {
      setIsLoading(false);
      toast.error('Pls enter a valid course Code. example - MAT 112');
    }
  };

  useEffect(() => {
    const allCourseCode = async () => {
      const { data } = await axios('/api/coursecode/getall');
      const defaultOptions = data.message.map((x: any) =>
        createOption(x.name, x.id)
      );
      setOptions(defaultOptions);
    };
    allCourseCode();
  }, []);

  const handleOnChange = (files: any) => {
    let filesArray: any = Array.from(files.target.files);
    filesArray = filesArray.map((file: any) => file);
    setFiles(filesArray);
  };

  const handleFileUpload = async (e: any) => {
    e.preventDefault();
    const ToastId = toast.loading(
      'Publishing Material....., pls do not cloase this page, uploading may take some time',
      {
        className: 'font-bold text-sm ',
        position: 'top-right',
        transition: Slide,
      }
    );

    if (files.length == 0) {
      toast.update(ToastId, {
        render: 'pls upload a file',
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
    } else {
      try {
        const payload: any = {
          title: titleInput,
          description: discriptionInput,
          userId: auth.id,
          courseCode: courseCode.value,
        };

        const { data } = await axios.post('/api/materials/create', payload);
        const materialId = data.body.id;
        const materialSlug = data.body.slug;
        if (!data.success) {
          toast.update(ToastId, {
            render: data.message,
            type: `${data.success ? 'success' : 'error'}`,
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
          for (var x = 0; x < files.length; x++) {
            try {
              const send = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/api/images/cover-upload`,
                files[x]
              );
              // let { data } = await axios.post('/api/uploads/material', {
              //   name: files[x].name,
              //   type: files[x].type,
              //   userId: auth.id,
              //   level: 100,
              //   materialId: materialId,
              // });
              // if (data.success) {
              //   const url = data.url;
              //   const materialUrl = data.materialUrl;
              //   let upload = await axios.put(url, files[x], {
              //     headers: {
              //       'Content-type': files[x].type,
              //       'Access-Control-Allow-Origin': '*',
              //     },
              //   });

              //   if (upload.status == 200) {
              //     const fileSize = `${(files[x].size / 1024 / 1024).toFixed(
              //       2
              //     )}MB`;
              //     const materialData = {
              //       UploadUrl: materialUrl,
              //       materialId: materialId,
              //       size: fileSize,
              //       name: files[x].name,
              //     };

              //     let saveToDb: any = await axios.post(
              //       '/api/materials/savetodb',
              //       materialData
              //     );
              //     console.log('saveToDb', saveToDb);
              //     uploads.push(saveToDb.data.id);
              //     console.log('arr', uploads);
              //   }
              // }
            } catch (error: any) {
              const materialData = {
                materialId: materialId,
              };

              const { data } = await axios.post(
                '/api/materials/delete',
                materialData
              );
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
          }
          toast.update(ToastId, {
            render: 'material(s) published successfully',
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
          Router.push(`/material/${materialSlug}`);
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
    }
  };

  return (
    <>
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
      <div className='w-full px-2'>
        <div className='space-y-4'>
          <div className='flex flex-col border-b'>
            <span>
              <b>Title</b>
            </span>
            <input
              onChange={handleTitleInput}
              className='outline-none text-xl'
              type='text'
              name=''
              id=''
            />
          </div>
          <div className='flex flex-col border-b'>
            <span>
              <b>Description</b>
            </span>
            <textarea
              placeholder='your description here...'
              onChange={handleDiscriptionInput}
              className='outline-none text-xl max-h-fit overflow-auto min-h-[180px] overscroll-y-contain'
            />
          </div>
          <div className='flex border-[#000] z-50 mb-2 pb-2 flex-col  border-b'>
            <span>
              <b>Course Code</b>
            </span>
            <CreatableSelect
              isClearable
              isDisabled={isLoading}
              isLoading={isLoading}
              onChange={(newValue) => {
                setCourseCode(newValue);
              }}
              onCreateOption={handleCreate}
              options={options}
              value={courseCode}
              className='z-10'
            />
          </div>
        </div>
        <div className='mt-2 bg-[#0c0244] border-t rounded-lg py-4'>
          <div className='space-y-4 items-center flex flex-col justify-center '>
            <div className='flex relative flex-col items-center py-5 w-3/4 bg-[#ffffff] justify-center'>
              <AiFillFilePdf className='text-[60px]' />
              <div className='flex  text-2xl space-x-1 items-center '>
                <AiOutlineCloudUpload />
                <span>Add a Material</span>
              </div>
              <div className='text-center'>
                Only .pdf, .doc, .docx, .txt, .pptx are allowed
              </div>
              <input
                className='absolute h-full opacity-0'
                onChange={handleOnChange}
                type='file'
                name=''
                id=''
                multiple
                accept='.pdf,.doc, .docx, .pptx'
              />
            </div>
          </div>
          <div className='my-5 flex flex-col items-center justify-center space-y-3'>
            {files ? (
              <>
                {files.map((file: any) => (
                  <div
                    key={files.indexOf(file)}
                    className='flex px-2 w-11/12 space-x-3  rounded-md bg-[#f4f3f3] py-2 mx-2 items-center'
                  >
                    <GrDocumentUpload className='text-3xl' />
                    <div className='flex w-full flex-col'>
                      <span className='text-xs'>{file.name}</span>
                    </div>
                    <div className='flex text-xs justify-between '>
                      <span className='text-xs'>
                        {(file.size / 1024 / 1024).toFixed(2)}MB
                      </span>
                    </div>
                    <AiFillDelete
                      onClick={() => {
                        const list = [...files];
                        const index = list.indexOf(file);
                        if (index == 0) {
                          list.splice(0, 1);
                        } else {
                          list.splice(index, index);
                        }

                        setFiles(list);
                      }}
                    />
                  </div>
                ))}
              </>
            ) : (
              ''
            )}
          </div>
        </div>

        <div className='flex space-y-4 flex-col  mt-10 items-center justify-center'>
          <span className='flex w-[133px] h-[44px] bg-[#CED5E0] p-1 rounded-full items-center cursor-default justify-center'>
            <HiOutlineBookOpen />
            <p>Preview</p>
          </span>
          <span className='flex mb-5 cursor-default w-[133px] h-[44px] text-[#ffffff] bg-[#002D72] p-3  rounded-full items-center justify-center '>
            <MdUpload />
            <p onClick={handleFileUpload}>Publish</p>
          </span>
        </div>
      </div>
    </>
  );
}
