import React, {createContext, useCallback, useContext, useState} from 'react';
import IRepository from '../dtos/IRepository';
import AsyncStorage from '@react-native-community/async-storage';
import { useEffect } from 'react';

interface FavoriteContextData{
    favorites: IRepository[];
    addFavorite(item: IRepository): void;
    isFavorite(item: IRepository): boolean;
}

interface FavoriteState{
    favorites: IRepository[];
}

const FavoriteContext = createContext<FavoriteContextData>({} as FavoriteContextData);

const FavoriteProvider: React.FC = ({children}) => {

    const [data, setData] = useState<FavoriteState>({
        favorites: []
    } as FavoriteState);

    useEffect(()=>{
        async function loadFavorites(){

            const favorites = await AsyncStorage.getItem('@TrendingGithub:favorites');
        
            if(favorites){
                setData(
                    {favorites: JSON.parse(favorites)}
                )
            }else{
                setData(
                    {favorites: []}
                )
            }

        }

        loadFavorites();
    },[])


    const addFavorite = useCallback(async (item: IRepository)=>{

        const findFavorite = data.favorites.find(respository => respository.nameWithOwner === item.nameWithOwner);

        if(!findFavorite){

            let favorites = data.favorites;
            favorites.push(item);

            setData({...data, favorites});
            await AsyncStorage.setItem('@TrendingGithub:favorites', JSON.stringify(favorites));

        }else{

            const favorites = data.favorites.filter(respository => respository.nameWithOwner !== item.nameWithOwner);

            setData({...data, favorites});
            await AsyncStorage.setItem('@TrendingGithub:favorites', JSON.stringify(favorites));
    
        }

    },[data]);

    const isFavorite = useCallback((item: IRepository)=>{
        const findFavorite = data.favorites.find(respository => respository.nameWithOwner === item.nameWithOwner);

        return !!findFavorite;

    },[data.favorites])


    return (
        <FavoriteContext.Provider value={{favorites: data.favorites, addFavorite, isFavorite}}>
            {children}
        </FavoriteContext.Provider>
    );
}

function useFavorite(){
    const context = useContext(FavoriteContext);

    if(!context){
        throw new Error('Contexto deve ser criado dentro de FavoriteProvider');
    }

    return context;
}

export {FavoriteProvider, useFavorite};