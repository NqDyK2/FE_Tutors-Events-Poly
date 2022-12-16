import React from 'react'
import { useCountdown } from '../../utils/timer-hook'

const CountdownTimer = ({ targetDate }) => {
  const [days, hours, minutes, seconds] = useCountdown(targetDate)

  if (days + hours + minutes + seconds <= 0) {
    return ''
  } else {
    return (
      <div className="tw-flex tw-flex-row tw-justify-center tw-items-center tw-gap-2">
        <div className="tw-flex tw-flex-col tw-justify-center tw-items-center">
          <div className="tw-text-2xl tw-font-bold tw-text-sky-400">{days}</div>
          <div className="tw-text-sm tw-font-bold tw-text-sky-400">Ngày</div>
        </div>
        <div className="tw-flex tw-flex-col tw-justify-center tw-items-center">
          <div className="tw-text-2xl tw-font-bold tw-text-sky-400">{hours}</div>
          <div className="tw-text-sm tw-font-bold tw-text-sky-400">Giờ</div>
        </div>
        <div className="tw-flex tw-flex-col tw-justify-center tw-items-center">
          <div className="tw-text-2xl tw-font-bold tw-text-sky-400">{minutes}</div>
          <div className="tw-text-sm tw-font-bold tw-text-sky-400">Phút</div>
        </div>
        <div className="tw-flex tw-flex-col tw-justify-center tw-items-center">
          <div className="tw-text-2xl tw-font-bold tw-text-sky-400">{seconds}</div>
          <div className="tw-text-sm tw-font-bold tw-text-sky-400">Giây</div>
        </div>
      </div>
    )
  }
}

export default CountdownTimer