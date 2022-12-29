import React, { useState, useEffect } from 'react';
import { FiSettings } from 'react-icons/fi';
import { GrNotification } from 'react-icons/gr';
import useAuth from '../../../hooks/useAuth';
import Link from 'next/link';
import { IoMdArrowRoundBack } from 'react-icons/io';
import router from 'next/router';
import TopicCard from '../topicCard';
import Image from 'next/image';
import Explore from '../explore';
import ExploreCard from '../topicCard/exploreCard';
import axios from 'axios';
import MaterialCard from '../materials/materialCard';

export interface HomePageHeaderProps {
  topics: any;
  materials: any;
}

export default function ExploreHeader({
  topics,
  materials,
}: HomePageHeaderProps) {
  const { auth }: any = useAuth();
  const [openSearch, setIsopenSearch] = useState(false);
  const [searchString, setSearchString] = useState('');
  const [searchTopicArray, setSearchTopicArray]: any = useState([]);
  const [searchMaterialArray, setSearchMaterialArray]: any = useState([]);
  const [lifeTopicArray, setLifeTopicArray]: any = useState([]);
  const [searched, setSearched] = useState(false);
  const [toggleStateTab, setToggleStateTab] = useState(1);
  const HandleSeachChange = (e: any) => {
    const searchInput = e.target.value;
    setSearched(false);
    setIsopenSearch(true);
    setSearchString(searchInput);

    const topic = topics.filter((topic: any) =>
      topic.title.toLowerCase().includes(searchString)
    );
    const material = materials.filter((topic: any) =>
      topic.title.toLowerCase().includes(searchString)
    );
    setLifeTopicArray(topic);
  };

  const handleKeyDown = async (e: any) => {
    if (e.key === 'Enter') {
      setIsopenSearch(false);
      setSearched(true);
      const data = {
        searchString,
      };
      try {
        const topic = topics.filter((topic: any) =>
          topic.title.toLowerCase().includes(searchString)
        );
        const material = materials.filter((topic: any) =>
          topic.title.toLowerCase().includes(searchString)
        );
        setSearchMaterialArray(material);
        setSearchTopicArray(topic);
      } catch (error) {
      }
    }
  };
  useEffect(() => {
    if (searchString.length > 0) {
      axios.get('/api/topics');
    }
  }, [searchString]);
  const toggleTab = (index: number) => {
    setToggleStateTab(index);
  };
  const handleSeach = () => {};
  return (
    <>
      <div className='home-page-header z-40 border-b-2 text-[#002D72] font- px-4 items-center  flex justify-between'>
        <div className='heade-logo font-extrabold text-xl'>
          {!openSearch ? (
            <>
              {auth.profileImgUrl ? (
                <Link href={'/'}>
                  <Image
                    src={`${process.env.NEXT_PUBLIC_FILE_API_URL}/user/profileimage/${auth.profileImgUrl}`}
                    width={30}
                    height={30}
                    alt=''
                  />
                </Link>
              ) : (
                <Link href={'/'}>
                  <Image
                    src={'/ufprofileimg.png'}
                    width={30}
                    height={30}
                    alt=''
                  />
                </Link>
              )}
            </>
          ) : (
            <IoMdArrowRoundBack
              onClick={() => {
                setSearchString('');
                setIsopenSearch(false);
              }}
            />
          )}
        </div>
        <div className='w-3/4'>
          <input
            className='border px-3 p-2 py-1 outline-none rounded-full w-full'
            type='search'
            name=''
            id=''
            onChange={HandleSeachChange}
            value={searchString}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div className='flex  space-x-4 '>
          {auth.id ? (
            <>
              <span className=''>
                <FiSettings className='text-2xl' />
              </span>
            </>
          ) : (
            <div className='items-center space-x-2'>
              <span className='font-bold'>
                <Link href={'/login'}>
                  <a>login</a>
                </Link>
              </span>
            </div>
          )}
        </div>
      </div>
      {openSearch ? (
        <div className='space-y-4 px-2 z-10 bg-[#fff]'>
          {lifeTopicArray.map((topic: any) => (
            <ExploreCard key={topic.id} topic={topic} />
          ))}
        </div>
      ) : null}
      {searched ? (
        <>
          <div className='w-screen z-20 bg-[#fff]'>
            <div className='flex  justify-around border-b py-1'>
              <div
                onClick={() => toggleTab(1)}
                className={`${
                  toggleStateTab == 1 ? 'border-b-4' : null
                }  border-[#12012c] px-1`}
              >
                Topics
              </div>
              {/* <div
                onClick={() => toggleTab(2)}
                className={`${
                  toggleStateTab == 2 ? 'border-b-4' : null
                }  border-[#12012c] px-1`}
              >
                Latest
              </div>
              <div
                onClick={() => toggleTab(3)}
                className={`${
                  toggleStateTab == 3 ? 'border-b-4' : null
                }  border-[#12012c] px-1`}
              >
                Topics
              </div> */}
              <div
                onClick={() => toggleTab(4)}
                className={`${
                  toggleStateTab == 4 ? 'border-b-4' : null
                }  border-[#12012c] px-1`}
              >
                Materials
              </div>
              {/* <div
                onClick={() => toggleTab(5)}
                className={`${
                  toggleStateTab == 5 ? 'border-b-4' : null
                }  border-[#12012c] px-1`}
              >
                Users
              </div> */}
            </div>
            <div>
              <div className={`${toggleStateTab == 1 ? 'block' : 'hidden'}`}>
                {searchTopicArray.map((topic: any) => (
                  <TopicCard topic={topic} key={topic.id} />
                ))}
              </div>

              <div className={`${toggleStateTab == 4 ? 'block' : 'hidden'}`}>
                {searchMaterialArray.map((material: any) => (
                  <MaterialCard materialData={material} key={material.id} />
                ))}
              </div>
            </div>
          </div>
        </>
      ) : null}
      {openSearch || searched ? '' : <Explore />}
    </>
  );
}
