import moment from 'moment';

export const getDayOfTheWeek = (time) => {
  const day = moment(time).day()

  switch (day) {
    case 1:
      return 'Thứ Hai'
    case 2:
      return 'Thứ Ba'
    case 3:
      return 'Thứ Tư'
    case 4:
      return 'Thứ Năm'
    case 5:
      return 'Thứ Sáu'
    case 6:
      return 'Thứ Bảy'
    default:
      return 'Chủ Nhật'
  }
}

export const timeFormat = (time) => {
  return getDayOfTheWeek(time) + '\n' + moment(time).format('DD/MM/YYYY')
}