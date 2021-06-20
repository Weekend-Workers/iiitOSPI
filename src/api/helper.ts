import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';

const apiHelpers = {
    get(url: string, config?: AxiosRequestConfig): Promise<any> {
        return APICreatingUtility(axios.get(url, config));
    },
};

export default apiHelpers;

export const APICreatingUtility = async (
    promise: Promise<AxiosResponse<any>>
): Promise<any> => {
    try {
        const _res = await promise;
        return _res.data;
    } catch (err) {
        throw err.response.data;
    }
};
