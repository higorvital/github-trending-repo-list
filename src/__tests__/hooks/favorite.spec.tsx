import { renderHook } from '@testing-library/react-hooks';
import { FavoriteProvider, useFavorite } from '../../hooks/favorite';
import IRepository from '../../dtos/IRepository';
import AsyncStorage from '@react-native-community/async-storage';

describe('Favorites hook', ()=>{
    it('should be able to add favorite', async ()=>{
     
        const {result} = renderHook(()=>useFavorite(), {
            wrapper: FavoriteProvider
        })
    
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

        const repository2: IRepository = {
            name: "repo-name2",
            owner: {
                login: "repo-owner-login2",
                avatarUrl: "repo-owner-avatar2"
            },
            description: "repo-description2",
            allIssues: {
                totalCount: 52
            },
            forkCount: 102,
            stargazerCount: 202,
            nameWithOwner: "repo-name2/repo-owner-login2",
        }

        result.current.addFavorite(repository)
        result.current.addFavorite(repository2)

        expect(AsyncStorage.setItem).toBeCalledWith('@TrendingGithub:favorites', JSON.stringify([repository]));        
        expect(result.current.favorites.length).toBe(2);
        expect(result.current.favorites[0].name).toBe("repo-name");
        expect(result.current.favorites[1].name).toBe("repo-name2");

   
    })

    it('should be able to remove favorite', async ()=>{
     
        const {result} = renderHook(()=>useFavorite(), {
            wrapper: FavoriteProvider
        })
    
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

        result.current.addFavorite(repository)
        result.current.addFavorite(repository)

        expect(result.current.favorites.length).toBe(0);
   
    })

    it('should be able to check if is favorite', async ()=>{
     
        const {result} = renderHook(()=>useFavorite(), {
            wrapper: FavoriteProvider
        })
    
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

        const repository2: IRepository = {
            name: "repo-name2",
            owner: {
                login: "repo-owner-login2",
                avatarUrl: "repo-owner-avatar2"
            },
            description: "repo-description2",
            allIssues: {
                totalCount: 52
            },
            forkCount: 102,
            stargazerCount: 202,
            nameWithOwner: "repo-name2/repo-owner-login2",
        }

        result.current.addFavorite(repository)

        expect(result.current.isFavorite(repository)).toBe(true);
        expect(result.current.isFavorite(repository2)).toBe(false);

    }) 
})

export {}