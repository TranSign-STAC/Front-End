import { TRANSLATE_API } from '../url';
import axios from 'axios';

type Data = {
    uuid: string;
    text: string;
};

export const translateTextToSign = async (data: Data) => await axios.post(TRANSLATE_API, data);
