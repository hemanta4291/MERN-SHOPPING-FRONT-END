import { useSelector } from "react-redux";

export default function useAdmin() {
    const auth = useSelector((state) => state.auth);
    // console.log("use admin",auth.user)

    if (auth?.user.role === 'admin') {
        return true;
    } else {
        return false;
    }
}
