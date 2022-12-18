import React from 'react'
import { useCountdown } from '../../utils/timer-hook'

const CountdownTimer = ({ targetDate, colorText = 'sky-400', size = "default" }) => {
  const [days, hours, minutes, seconds] = useCountdown(targetDate)

  if (days + hours + minutes + seconds <= 0) {
    return ''
  } else {
    if (size === "small") {
      return (
        <div className="tw-flex tw-flex-row tw-justify-center tw-items-center tw-gap-2">
          <div className="tw-flex tw-flex-col tw-justify-center tw-items-center">
            <div className={`tw-text-sm tw-font-bold tw-text-${colorText}`}>{days}</div>
            <div className={`tw-text-xs tw-font-bold tw-text-${colorText}`}>Ngày</div>
          </div>
          <div className="tw-flex tw-flex-col tw-justify-center tw-items-center">
            <div className={`tw-text-sm tw-font-bold tw-text-${colorText}`}>{hours}</div>
            <div className={`tw-text-xs tw-font-bold tw-text-${colorText}`}>Giờ</div>
          </div>
          <div className="tw-flex tw-flex-col tw-justify-center tw-items-center">
            <div className={`tw-text-sm tw-font-bold tw-text-${colorText}`}>{minutes}</div>
            <div className={`tw-text-xs tw-font-bold tw-text-${colorText}`}>Phút</div>
          </div>
          <div className="tw-flex tw-flex-col tw-justify-center tw-items-center">
            <div className={`tw-text-sm tw-font-bold tw-text-${colorText}`}>{seconds}</div>
            <div className={`tw-text-xs tw-font-bold tw-text-${colorText}`}>Giây</div>
          </div>
        </div>
      )

    } else {
      return (
        <div className="tw-flex tw-flex-row tw-justify-center tw-items-center tw-gap-2">
          <div className="tw-flex tw-flex-col tw-justify-center tw-items-center">
            <div className={`tw-text-2xl tw-font-bold tw-text-${colorText}`}>{days}</div>
            <div className={`tw-text-sm tw-font-bold tw-text-${colorText}`}>Ngày</div>
          </div>
          <div className="tw-flex tw-flex-col tw-justify-center tw-items-center">
            <div className={`tw-text-2xl tw-font-bold tw-text-${colorText}`}>{hours}</div>
            <div className={`tw-text-sm tw-font-bold tw-text-${colorText}`}>Giờ</div>
          </div>
          <div className="tw-flex tw-flex-col tw-justify-center tw-items-center">
            <div className={`tw-text-2xl tw-font-bold tw-text-${colorText}`}>{minutes}</div>
            <div className={`tw-text-sm tw-font-bold tw-text-${colorText}`}>Phút</div>
          </div>
          <div className="tw-flex tw-flex-col tw-justify-center tw-items-center">
            <div className={`tw-text-2xl tw-font-bold tw-text-${colorText}`}>{seconds}</div>
            <div className={`tw-text-sm tw-font-bold tw-text-${colorText}`}>Giây</div>
          </div>
        </div>
      )
    }
  }
}

export default CountdownTimer