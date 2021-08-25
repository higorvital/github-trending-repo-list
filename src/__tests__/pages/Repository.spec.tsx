import React from 'react';
import {render} from '@testing-library/react-native';
import IRepository from '../../dtos/IRepository';
import Repository from '../../pages/Repository';
import { MockedProvider } from '@apollo/client/testing';
import { GET_REPOSITORY } from '../../api/queries';
import IQueryRepositoryResponse from '../../dtos/IQueryRepositoryResponse';

const mockNavigateNavigation = jest.fn();

jest.mock('react-native-vector-icons/FontAwesome', ()=> 'FontAwesomeIcon')
jest.mock('react-native-vector-icons/Feather', ()=> 'FeatherIcon')

jest.mock('@react-navigation/native', ()=>{
    return {
        useRoute: ()=>({
            params: {
                name: "repo-name",
                owner: "repo-owner-login"
            },
        })
        
    }
})

jest.mock('../../hooks/favorite', ()=>{
    return {
        useFavorite: ()=>({
            isFavorite: jest.fn(),
            addFavorite: jest.fn()
        })
        
    }
})

describe('Repository page', ()=>{

    beforeEach(()=>{
        mockNavigateNavigation.mockClear();
    })

    it('should be able to render an repository page loaded', async ()=>{

        const repository: IRepository = {
            owner: {
                login: "repo-owner-login",
                avatarUrl: "repo-owner-avatar"
            },
            name: "repo-name",
            description: "repo-description",
            allIssues: {
                totalCount: 5
            },
            forkCount: 10,
            stargazerCount: 21,
            nameWithOwner: "repo-name/repo-owner-login",
        } 

        const mocks = [
            {
              request: {
                query: GET_REPOSITORY,
                variables: {
                  name: 'repo-name',
                  owner: 'repo-owner-login',
                },
              },
              result: {
                data: {
                    repository,
                },
              },
            },
          ];
        
          const {findByText} = render(
            <MockedProvider mocks={mocks} addTypename={false}>
              <Repository />
            </MockedProvider>,
          );

          const component = await findByText("repo-owner-login");

          expect(component).toBeTruthy();
    })

    // it('should be able to render an repository page loading', async ()=>{

    //     const repository: IRepository = {
    //         name: "repo-name",
    //         owner: {
    //             login: "repo-owner-login",
    //             avatarUrl: "repo-owner-avatar"
    //         },
    //         description: "repo-description",
    //         allIssues: {
    //             totalCount: 5
    //         },
    //         forkCount: 10,
    //         stargazerCount: 20,
    //         nameWithOwner: "repo-name/repo-owner-login",
    //     } 

    //     const mocks = [
    //         {
    //           request: {
    //             query: GET_REPOSITORY,
    //             variables: {
    //               name: 'repo-name',
    //               owner: 'repo-owner-login',
    //             },
    //           },
    //           result: {
    //             loading: true,
    //             data: {
    //                 repository,
    //             },
    //           },
    //         },
    //       ];
        
    //       const {findByTestId} = render(
    //         <MockedProvider mocks={mocks} addTypename={false}>
    //           <Repository />
    //         </MockedProvider>,
    //       );

    //       const component = findByTestId("repository-loading");

    //       expect(component).toBeTruthy();
    // })

    it('should be able to render an repository page loading', ()=>{

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

        const loading = true;
        const data: IQueryRepositoryResponse = {
            repository
        }
        
        jest.mock('@apollo/client', ()=>{
            return {
                useQuery: jest.fn(() => ({ loading, data }))   
            }
        })
        
        const {getByTestId} = render(
            <Repository />,
            {
                wrapper: MockedProvider
            }
        )

        expect(getByTestId("repository-loading")).toBeTruthy();

    })

})

export {}