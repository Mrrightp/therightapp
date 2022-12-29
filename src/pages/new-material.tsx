import React from 'react';
import UploadHeader from '../components/headers/uploadHeader';
import NewMaterial from '../components/newMaterial';
import NewMateriaalSideBar from '../components/sidebar/newMateriaalSideBar';

type Props = {};

export default function NewMaterialPage({}: Props) {
  return (
    <>
      <UploadHeader pageName='Material Uploads' />
      <div className='flex justify-between'>
        <NewMaterial />
        <NewMateriaalSideBar />
      </div>
    </>
  );
}
NewMaterialPage.getLayout = function pageLayout(page: any) {
  return <>{page}</>;
};
