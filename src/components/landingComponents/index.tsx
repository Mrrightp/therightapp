import React from 'react';
import Image from 'next/image';

type Props = {};

export default function LandingComponent({}: Props) {
  return (
    <div className=''>
      <Image src={'/landing.jpg'} layout='fill' className='absolute' alt='' />
    </div>
  );
}
