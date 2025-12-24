import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';

import 'dayjs/locale/ko';

dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);
dayjs.locale('ko');

export default dayjs;
