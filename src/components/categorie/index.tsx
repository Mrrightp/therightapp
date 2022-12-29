import React from 'react';
import NotFound from '../404';
import TopicCard from '../topicCard';

type Props = {
  category: any;
};

export default function CategorieComponent({ category }: Props) {
  return (
    <div className='pb-[250px]'>
      <div className='bg-[#000] text-[#fff] py-4 text-center'>
        {category.title}
      </div>
      {category.topics ? (
        <div>
          {category.topics.map((topic: any) => (
            <TopicCard topic={topic} key={topic.id} />
          ))}
        </div>
      ) : (
        <NotFound />
      )}
    </div>
  );
}
