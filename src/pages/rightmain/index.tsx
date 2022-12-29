import React from 'react';
import AdminBottom from '../../components/admin/adminBottom';
import AdminHearder from '../../components/admin/header';

type Props = {};

export default function AdminPage({}: Props) {
  return (
    <>
      <AdminHearder />
      <AdminBottom />
    </>
  );
}
