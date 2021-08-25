interface IRepository {
    url: string;
    nameWithOwner: string;
    description: string;
    name: string;
    // collaborators: {
    //     totalCount: number;
    // };
    owner: {
        login: string;
        avatarUrl: string;
    }
    forkCount: number;
    stargazerCount: number;
    allIssues: {
        totalCount  : number;
    }
}

export default IRepository;