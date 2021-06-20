import { Repo } from '@/utils/types';
import apiHelpers from './helper';
import { GithubRepoIndentifier } from '@/utils/types';

const baseURL = 'https://api.github.com';

const GithubAPI = {
    async getRepo(repoIden: GithubRepoIndentifier): Promise<Partial<Repo>> {
        const repoRes = await apiHelpers.get(
            baseURL + `/repos/${repoIden.owner}/${repoIden.repo}`,
            {
                headers: {
                    Accept: 'application/vnd.github.v3+json',
                },
            }
        );
        const repo: Partial<Repo> = {
            name: repoRes.name,
            shortDes: repoRes.description,
            link: repoRes.html_url,
            topics: repoRes.topics || [],
        };
        const readmeLink = `https://raw.githubusercontent.com/${repoRes.owner.login}/${repo.name}/${repoRes.default_branch}/README.md`;
        const readmeString = await apiHelpers.get(readmeLink);
        repo.longDes = readmeString;
        return repo;
    },
};

export default GithubAPI;
