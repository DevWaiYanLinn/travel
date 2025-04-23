import { BASE_API_URL } from '@/config/constants';

export const getAllCities = (url: string, token: string) => {
    return fetch(BASE_API_URL + url, {
        headers: {
            Authorization: 'Bearer ' + token,
        },
    }).then((res) => res.json());
};
