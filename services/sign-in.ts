import { BASE_API_URL } from '@/config/constants';
export const signInApi = async (body: { email: string; password: string }) => {
    const url = BASE_API_URL + `/auth/sign-in`;

    try {
        const res = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!res.ok) {
            throw res;
        }
        return await res.json();
    } catch (error: unknown) {
        throw error;
    }
};
