import { Button } from 'antd';
import React from 'react';
import { useEffect } from 'react';
import { BsSunFill, BsFillMoonFill } from 'react-icons/bs';

const ThemeToogle = () => {
  const [toggle, setToggle] = React.useState(
    sessionStorage.getItem('theme') === 'dark' ? true : false
  );
  useEffect(() => {
    const root = window.document.documentElement;
    const currentTheme = sessionStorage.getItem('theme');
    if (currentTheme === 'dark') {
      root.classList.add('tw-dark');
    }
  }, []);
  return (
    <>
      <Button
        type='link'
        className='tw-rounded-full tw-border tw-border-gray-200 tw-p-0 tw-px-[5px] tw-shadow-sm tw-transition-colors hover:tw-border-gray-500 hover:tw-bg-transparent'
        onClick={() => {
          const root = window.document.documentElement;

          setToggle(!toggle);
          if (toggle) {
            sessionStorage.setItem('theme', 'light');
            root.classList.remove('tw-dark');
          } else {
            sessionStorage.setItem('theme', 'dark');
            root.classList.add('tw-dark');
          }
        }}
      >
        {toggle ? (
          <BsFillMoonFill className=' tw-h-5 tw-w-5 tw-text-gray-600' />
        ) : (
          <BsSunFill className=' tw-h-5 tw-w-5 tw-text-orange-600' />
        )}
      </Button>
    </>
  );
};

export default ThemeToogle;
