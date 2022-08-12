import { useState, useEffect, useContext, createContext } from "react";
import { getTrending } from '../services/apiRequests';
import { useAuth } from "./auth";
import { api } from '../services/api';
const Trending = createContext();

export const TrendingProvider = ({ children }) => {
    const { logout } = useAuth();
    const [trending, setTrending] = useState([]);
    const [updateTrending, setUpdateTrending] = useState(false);
    const [loading, setLoading] = useState(false);
   
    const update= async () => {
        setLoading(true);
        const storagedToken = localStorage.getItem('LinkrAuthToken');
        api.defaults.headers['Authorization'] = storagedToken;
        try {
            const { data: trendingData } = await getTrending();
            setTrending(trendingData);
        } catch (err) {
            if (err.response.status === 401) {
                logout();
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(()=> {
        let allowUpdate = true
        if(allowUpdate) {
            update()
        }
        return () => allowUpdate = false
    }, [updateTrending])

    return (
        <Trending.Provider
            value={{ trending, loading, setUpdateTrending }}
        >
            {children}
        </Trending.Provider>
    )
}

export const useTrending = () => {
    const context = useContext(Trending);
    return context;
}