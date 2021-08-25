import React from 'react';
import { render} from '@testing-library/react-native';
import IRepository from '../../dtos/IRepository';
import RepositoryListTemplate from '../../components/RepositoryListTemplate';

const mockNavigateNavigation = jest.fn();
jest.mock('../../components/Repository', ()=> 'Repository')


describe('Repository component', ()=>{

    beforeEach(()=>{
        mockNavigateNavigation.mockClear();
        mockNavigateNavigation.mockClear();

    })

    it('should be able to render an repository list loading', ()=>{

        const repository: IRepository = {
            name: "repo-name",
            owner: {
                login: "repo-owner-login",
                avatarUrl: "repo-owner-avatar"
            },
            description: "repo-description",
            allIssues: {
                totalCount: 5
            },
            forkCount: 10,
            stargazerCount: 20,
            nameWithOwner: "repo-name/repo-owner-login",
        } 

        let loading = true;

        const {getByText, getByTestId} = render(
            <RepositoryListTemplate
                title="Teste"
                loading={loading}
                repositories={[repository]}
            />
        )

        expect(getByText("Teste")).toBeTruthy();
        expect(getByTestId("repository-list-loading")).toBeTruthy();


    })


    it('should be able to render an repository list loaded', ()=>{

        const repository: IRepository = {
            name: "repo-name",
            owner: {
                login: "repo-owner-login",
                avatarUrl: "repo-owner-avatar"
            },
            description: "repo-description",
            allIssues: {
                totalCount: 5
            },
            forkCount: 10,
            stargazerCount: 20,
            nameWithOwner: "repo-name/repo-owner-login",
        } 

        let loading = false;

        const {getByTestId} = render(
            <RepositoryListTemplate
                title="Teste"
                loading={loading}
                repositories={[repository]}
            />
        )
        expect(getByTestId("repository-flat-list")).toBeTruthy();


    })
})

export {}