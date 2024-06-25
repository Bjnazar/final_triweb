import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import Instructions from '../game/instructions'
import UserWelcome from '../profile/UserWelcome'
import About from './About'
import Player from '../game/Player'
import Sala_espera from '../game/sala_espera'
import Tablero from '../game/tablero'
import Login from '../profile/Login'
import Signup from '../profile/Signup'
import AdminCheck from '../protected/AdminCheck'
import UserCheck from '../protected/UserCheck'
import LogoutButton from '../profile/Logout'
import Dev from './Dev'

function Routing(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<App/>}/>
                <Route path={"/instructions"} element={<Instructions />}/>
                <Route path={"/welcome"} element={<UserWelcome />}/>
                <Route path={"/about"} element={<About />}/>
                <Route path={"/player"} element={<Player />}/>
                <Route path={"/sala_espera/:gameId"} element={<Sala_espera/>}/>

                <Route path={"/tablero"} element={<Tablero />}/>
                <Route path={"/login"} element={<Login />}/>
                <Route path={"/signup"} element={<Signup />}/>
                <Route path={"/admincheck"} element={<AdminCheck />}/>
                <Route path={"/usercheck"} element={<UserCheck />}/>

                <Route path={"/tablero/:gameId"} element={<Tablero />}/>

                <Route path={"/dev"} element={<Dev />}/>


               
                
            </Routes>
        </BrowserRouter>
    )
}

export default Routing;