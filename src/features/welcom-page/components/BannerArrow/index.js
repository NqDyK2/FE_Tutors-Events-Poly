import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './bannerarrow.css';

const BannerArrow = ({ onClick, direction }) => {
  return (
    <button
      className={`arrowSlider tw-hover:text-white tw-hover:bg-transparent tw-absolute tw-top-1/2 tw-z-10 tw-h-9 tw-w-9 tw-text-[30px]
       tw-text-[#fff] tw-duration-200 tw-ease-linear
       ${direction === 'right' ? 'tw-right-[6%]' : 'tw-left-[6%]'}`}
      onClick={onClick}
    >
      {direction === 'right' ? <FaChevronRight /> : <FaChevronLeft />}
    </button>
  );
};

export default BannerArrow;
