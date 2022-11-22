import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


const QuillEditor = (props
  ,
) => {
  const [value, setValue] = useState('');

  const modules = {
    toolbar: [
      [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote', 'link', 'image'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' },]
    ]
  }

  const formats = [
    'header',
    'font',
    'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote', 'link', 'image',
    'list', 'bullet',
  ]

  const handleChange = (value) => {
    setValue(value);
    props?.setFieldsValue(value ? value : '')
  }
  useEffect(() => {
    setValue(props?.value)
  }, [props?.initialValue])

  return <ReactQuill
    theme="snow" modules={modules}
    placeholder={props?.placeholder}
    formats={formats} value={value} onChange={handleChange}
    style={{
      height: props?.height ? props?.height : '150px',
      marginBottom: '50px'
    }}

  />;

}

export default QuillEditor