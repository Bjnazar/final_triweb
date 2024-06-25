import { useEffect , useState} from "react";
import { AuthContext } from "./AuthContext";

function AuthProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [username, setUsername] = useState(localStorage.getItem('username') || '');
    const [userId, setUserId] = useState(localStorage.getItem('userId') || '');

    function logout() {
        setToken(null)
    }

    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
        } else {
            localStorage.removeItem('token');
        }
    }, [token]);

    useEffect(() => {
        if (username) {
            localStorage.setItem('username', username);
        } else {
            localStorage.removeItem('username');
        }
    }, [username]);

    useEffect(() => {
        if (userId) {
            localStorage.setItem('userId', userId);
        } else {
            localStorage.removeItem('userId');
        }
    }, [userId]);

    return (
        <AuthContext.Provider value={{ token, username, userId, setToken, setUsername, setUserId,
         logout}}>
            {children}
        </AuthContext.Provider>
    );
    }
export default AuthProvider;