import { Button } from 'antd';
import React from 'react';
import { BsSunFill, BsFillMoonFill } from 'react-icons/bs';

const ThemeToogle = () => {
  const [toggle, setToggle] = React.useState(false);
  return (
    <>
      <Button
        type='link'
        className='tw-rounded-full tw-p-0 tw-px-[5px] tw-shadow-sm tw-border tw-border-gray-200 hover:tw-bg-transparent hover:tw-border-gray-500 tw-transition-colors'
        onClick={() => setToggle(!toggle)}
      >
        {toggle ? (
          <BsSunFill className=' tw-w-5 tw-h-5 tw-text-orange-600' />
        ) : (
          <BsFillMoonFill className=' tw-w-5 tw-h-5 tw-text-gray-600' />
        )}
      </Button>
    </>
  );
};

export default ThemeToogle;
