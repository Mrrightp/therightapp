import * as React from 'react';
import Header from '../headers/HomepageHeader';
import BottomNav from '../mobleBottom';
import MaterialCard from './materialCard';
export interface HomePageProps {
  materials: any;
}
import Select from 'react-select';

export default function Materials({ materials }: HomePageProps) {
  return (
    <>
      <div>
        <Header />
        <div className='h-16 items-center justify-center flex  bg-[#02024a] w-full'>
          <Select
            className='w-9/12  outline-none'
            placeholder='Select course code'
          />
        </div>
        <div className='pb-[88px]'>
          {materials.map((material: any) => (
            <MaterialCard key={material.id} materialData={material} />
          ))}
        </div>
      </div>
      <BottomNav />
    </>
  );
}
