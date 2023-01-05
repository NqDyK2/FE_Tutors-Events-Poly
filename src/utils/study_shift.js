export const StudyShift = (time) => {
    switch (time) {
        case "07:15:00":
            return 1
        case "09:25:00":
            return 2
        case "12:00:00":
            return 3
        case "14:10:00":
            return 4
        case "16:20:00":
            return 5
        case "18:35:00":
            return 6
        default:
            return 6
    }
}