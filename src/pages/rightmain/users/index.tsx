import React from 'react';
import AdminBottom from '../../../components/admin/adminBottom';
import AdminUserCard from '../../../components/admin/adminUserCard';
import AdminHearder from '../../../components/admin/header';
import prisma from '../../../utils/prisma';
type Props = {
  usersData: any;
};

export default function index({ usersData }: Props) {
  return (
    <>
      <div className='w-full'>
        <div className='text-center items-center justify-center flex text-xl font-semibold bg-black text-white h-[60px]'>
          User Page
        </div>
        <div className='space-y-1'>
          {usersData.map((userData: any) => (
            <AdminUserCard key={userData.id} userData={userData} />
          ))}
        </div>
      </div>
      <AdminBottom />
    </>
  );
}
export async function getServerSideProps(context: any) {
  const result = await prisma.user.findMany({});

  const data = JSON.parse(JSON.stringify(result));

  return {
    props: { usersData: data },
  };
}
