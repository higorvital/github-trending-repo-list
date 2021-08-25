import { gql } from '@apollo/client';

export const GET_TRENDING_REPOSITORIES = gql`
    query GetRepositories($first: Int!, $after: String) {
        search(
            type:REPOSITORY, 
            query: """
                stars:>100
                forks:>50
            """,
            first: $first,
            after: $after
        ) {
            pageInfo {
                startCursor
                hasNextPage
                endCursor
            }
            repos: edges {
                repo: node {
                    ... on Repository {
                        nameWithOwner
                        name
                        forkCount
                        description
                        stargazerCount
                        allIssues: issues {
                            totalCount
                        }
                        openIssues: issues(states:OPEN) {
                            totalCount
                        }
                        owner {
                            login
                        }
                    }
                }
            }
        }
    }
`;

export const GET_REPOSITORY = gql`
    query GetRepository($name: String!, $owner: String!){ 
        repository(name: $name, owner: $owner) { 
            url
            nameWithOwner
            forkCount
            description
            stargazerCount
            owner {
                login
                avatarUrl
            }
            allIssues: issues {
                totalCount
            }
        }
    }
`;