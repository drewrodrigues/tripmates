import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faCalendarAlt,
  faLongArrowAltRight,
  faClock,
  faHourglassHalf,
  faPlus,
  faEye,
  faEyeSlash,
  faUsers,
  faMapMarkerAlt
} from '@fortawesome/free-solid-svg-icons'

export default (() => {
  library.add(faCalendarAlt)
  library.add(faLongArrowAltRight)
  library.add(faClock)
  library.add(faHourglassHalf)
  library.add(faPlus)
  library.add(faEye)
  library.add(faEyeSlash)
  library.add(faUsers)
  library.add(faMapMarkerAlt)
})()