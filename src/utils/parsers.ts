import { GithubRepoIndentifier } from './types';

const Parsers = {
    parseRepoLink(link: string): GithubRepoIndentifier | null {
        const url = new URL(link);

        if (url.host != 'github.com') return null;
        else {
            const split = url.pathname.split('/');
            const repo: GithubRepoIndentifier = {
                owner: split[1],
                repo: split[2],
            };
            return repo;
        }
    },
};

export default Parsers;
