export interface User {
    uid: string;
    name: string;
    email: string;
}

export interface Repo {
    uid: string;
    name: string;
    ownerUID: string;
    shortDes: string;
    longDes: string;
    link: string;
    topics: string[];
}

export type GithubRepoIndentifier = {
    owner: string;
    repo: string;
};
