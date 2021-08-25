import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import IRepository from '../../dtos/IRepository';
import Repository from '../../components/Repository';

const mockNavigateNavigation = jest.fn();
const mockAddFavorite = jest.fn();
const mockIsFavorite = jest.fn();

jest.mock('@react-navigation/native', ()=>{
    return {
        useNavigation: ()=>({
            navigate: mockNavigateNavigation
        })        
    }
})

jest.mock('react-native-vector-icons/FontAwesome', ()=> 'FontAwesomeIcon')

jest.mock('../../hooks/favorite', ()=>{
    return {
        useFavorite: ()=>({
            isFavorite: mockIsFavorite,
            addFavorite: mockAddFavorite
        })
        
    }
})

describe('Repository component', ()=>{

    beforeEach(()=>{
        mockNavigateNavigation.mockClear();
        mockNavigateNavigation.mockClear();

    })

    it('should be able to render an repository', ()=>{

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

        const {getByText} = render(
            <Repository
                item={repository}
            />
        )

        expect(getByText("repo-name/repo-owner-login")).toBeTruthy();
        expect(getByText("repo-description")).toBeTruthy();
        expect(getByText("10")).toBeTruthy();
        expect(getByText("20")).toBeTruthy();


    })


    it('should be able to enter an repository', ()=>{

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

        const {getByTestId} = render(
            <Repository
                item={repository}
            />
        )

        fireEvent.press(getByTestId("repository-container"))

        expect(mockNavigateNavigation).toHaveBeenCalledWith('Repository', {
            name: "repo-name",
            owner: "repo-owner-login"
        });


    })


    it('should be able to favorite an repository', ()=>{

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

        const {getByTestId} = render(
            <Repository
                item={repository}
            />
        )

        fireEvent.press(getByTestId("repository-favorite-button"))
        fireEvent.press(getByTestId("repository-favorite-button"))

        expect(mockAddFavorite).toHaveBeenCalledTimes(2);
        expect(mockAddFavorite).toHaveBeenCalledWith(repository);
        expect(mockIsFavorite).toHaveBeenCalledWith(repository);


    }) 
})

export {}