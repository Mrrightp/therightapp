import dynamic from 'next/dynamic';
import react, { useState } from 'react';

const ReactQuill = dynamic(import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';

export default function MyComponent() {
  const [value, setValue] = useState('');
  console.log(value);
  return <ReactQuill theme='snow' value={value} onChange={setValue} />;
}
