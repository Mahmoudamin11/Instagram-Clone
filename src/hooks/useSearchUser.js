import { useState } from "react"
import useShowToast from "./useShowToast";
import { collection, getDocs, query, where } from "firebase/firestore";
import { fireStore } from "../firebase/firebase";

const useSearchUser = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState(null);
    const showToast = useShowToast();
    const getUserProfile = async (username) =>  { 
        setIsLoading(true);
        setUser(null);
        try {
            const q = query(collection(fireStore, 'users'), where("username", "==", username));
            const snapshot = await getDocs(q);
            if (snapshot.empty){ 
                return showToast("Error","User not found", 'error');
            }
            snapshot.forEach((doc) => { 
                setUser(doc.data());
            })
        } catch (error) {
            showToast("Error", error.message , "error");
            setUser(null);
        } finally { 
            setIsLoading(false);
        }
    }

    return {isLoading, user, getUserProfile, setUser}
    
}

export default useSearchUser