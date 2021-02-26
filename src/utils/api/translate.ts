import { TRANSLATE_API } from '../url';
import axios from 'axios';
import { parseCookies } from 'nookies';

type DataType = {
    uuid: string;
    text: string;
};

export const translateTextToSign = async (data: DataType) => {
    const uuid = parseCookies().uuid;
    data.uuid = uuid;
    return await axios.post(TRANSLATE_API, JSON.stringify(data));
};
