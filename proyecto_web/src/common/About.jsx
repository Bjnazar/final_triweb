import './About.css'
import Navbar from './../common/Navbar';

export default function About() {
    return (
        <div>
            <Navbar />
                <div className="about">

                
                    <h2>Nosotros</h2>
                    <h3>Grupo Triweb</h3>
                    <p>
                        Somos 3 estudiantes de Ingeniería Civil UC que creamos este juego para el ramo 
                        Tecnologías y Aplicaciones Web (IIC2513-2). El juego se inspira en el clásico
                        Monopoly, pero lo transformamos en un juego de mesa virtual que refleja el día a 
                        día de los estudiantes en San Joaquín, y presenta los personajes más célebres
                        de nuestra Escuela.
                    </p>
                    
                    <p> ¡Los invitamos a disfrutar del juego y adentrarse en una experiencia auténtica
                        del Campus San Joaquín!</p>
                    <ul>
                        <li>Isidora Chávez</li>
                        <li>Dante Comparini</li>
                        <li>Bernardita Nazar</li>
                    </ul>
                <footer> © Todos los derechos reservados.   </footer>
                </div>
        </div>
    )
}