import IRepository from "./IRepository";

interface IQueriesRepositoriesResponse {
    search: {
        pageInfo: {
            startCursor: string,
            hasNextPage: boolean,
            endCursor: string
        },    
        repos: {
            repo: IRepository;
        }[];
    }
}

export default IQueriesRepositoriesResponse;