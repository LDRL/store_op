// import { useContext } from 'react'
// import AuthContext from '../context/AuthProvider';

// const useAuth = () => {
//     return useContext(AuthContext)
// }

// export default useAuth;


import { getUser } from '@/pages/public/Login/api/AuthApi'
import { useQuery} from '@tanstack/react-query'


export const useAuth = () => {
    const { data, isError, isLoading } = useQuery({
        queryKey: ['user'],
        queryFn: getUser,
        retry: 1,
        refetchOnWindowFocus: false
    })

    return { data, isError, isLoading }
}