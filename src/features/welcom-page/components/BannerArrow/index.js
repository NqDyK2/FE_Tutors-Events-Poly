import {FaChevronLeft, FaChevronRight} from "react-icons/fa"
import "./bannerarrow.css"

const BannerArrow = ({ onClick, direction }) => {
  return (
    <button
      className={`arrowSlider tw-w-9 tw-h-9 tw-absolute tw-top-1/2 tw-z-10 tw-text-[30px] tw-ease-linear tw-duration-200
       tw-hover:text-white tw-text-[#fff] tw-hover:bg-transparent
       ${ direction === "right" ? "tw-right-[6%]" : "tw-left-[6%]" }`
      }
      onClick={onClick}
    >
      {direction === "right" ? <FaChevronRight /> : <FaChevronLeft/>}
    </button>
  );
};

export default BannerArrow;
