import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TopicCard from '../topicCard';
import MaterialCard from '../materials/materialCard';

export default function Explore() {
  const [topicTrends, setTopicTrends] = useState([]);
  const [materialsTrends, setMaterialsTrends] = useState([]);

  useEffect(() => {
    const getTopicTrends = async () => {
      const { data } = await axios.get('/api/topics/toptreands');
      setTopicTrends(data.body);
    };
    getTopicTrends();
    const getMaterialTrends = async () => {
      const { data } = await axios.get('/api/materials/toptreands');
      setMaterialsTrends(data.body);
    };
    getMaterialTrends();
  }, []);

  return (
    <div className='pb-[200px]'>
      <div>
        <h2 className=' border-b text-[#fff] bg-[#0a0133] text-2xl font-extrabold px-4'>
          Top Trends
        </h2>
        {topicTrends.map((topic: any) => {
          return <TopicCard topic={topic} key={topic.id} />;
        })}
      </div>
      <div>
        <h2 className=' border-b text-[#fff] bg-[#0a0133] text-2xl font-extrabold px-4'>
          Top Materials
        </h2>
        {materialsTrends.map((material: any) => {
          return <MaterialCard materialData={material} key={material.id} />;
        })}
      </div>
    </div>
  );
}
