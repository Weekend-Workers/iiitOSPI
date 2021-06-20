import { Repo } from '@/utils/types';
import { AxiosRequestConfig } from 'axios';
import apiHelpers from './helper';

const defaultConfig: AxiosRequestConfig = {
    headers: {
        Accept: 'application/vnd.github.v3+json',
    },
};

const GithubAPI = {
    async getRepo(repoLink: string): Promise<Partial<Repo>> {
        const repoRes = await apiHelpers.get(repoLink, defaultConfig);
        const repo: Partial<Repo> = {
            name: repoRes.name,
            shortDes: repoRes.description,
            link: repoLink,
            topics: repoRes.topics,
        };
        const readmeLink = `https://raw.githubusercontent.com/${repoRes.owner.login}/${repo.name}/${repoRes.default_branch}/README.md`;
        const readmeString = await apiHelpers.get(readmeLink);
        repo.longDes = readmeString;
        return repo;
    },
};

export default GithubAPI;
