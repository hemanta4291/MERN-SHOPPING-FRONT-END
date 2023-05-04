import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { userLoggedIn } from "../features/auth/signInSlice";
import { getData } from "../utils/localStorageConfig";

export default function useAuthCheck() {
    const dispatch = useDispatch();
    const [authChecked, setAuthChecked] = useState(false);

    useEffect(() => {
        const user = getData(import.meta.env.VITE_LOCAL_USER);
        console.log(user)
        const accessToken = getData(import.meta.env.VITE_ACCESS_TOKEN);

        if (user && accessToken) {
            dispatch(
                userLoggedIn({accessToken,user})
            );
        }
        setAuthChecked(true);
    }, [dispatch, setAuthChecked]);

    return authChecked;
}
