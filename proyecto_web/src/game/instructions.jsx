import './instructions.css'
import Navbar from './../common/Navbar';

export default function Instructions() {
    return (
        <div>
            <Navbar />
            <div className="instructions">
                <h2>Instrucciones</h2>
                <p>Joacopoly se juega de a 4 jugadores. Puedes registrarte e iniciar sesión, o Jugar
                    como invitado. El objetivo del juego es ser el jugador con más activos en el juego 
                    (dinero, propiedades, construcciones).</p>

                <p>El tablero representa el Campus de San Joaquín, donde la mayoría de las casillas 
                    son propiedades que pertenecen a las diferentes carreras o áreas de estudio. 
                    El resto de las casillas corresponden a las estaciones de metro para llegar a la
                    universidad y también “controles”, cartas sorpresa que le dan un toque de dinamismo
                    a la experiencia.</p>

                <p>Los jugadores avanzan por el tablero de casillas en turnos no sincrónicos, en un 
                    orden que se define aleatoriamente al inicio del juego. 
                    Al avanzar, los jugadores pueden comprar propiedades, cobrar alquileres, construir 
                    dentro de sus propiedades y, ¡mucho más!
                    Como jugador, debes gestionar tu dinero y tus recursos para adquirir la mayor 
                    cantidad de propiedades y de dinero posible, con el objetivo de ser el jugador
                    con más influencia en San Joaquín.</p>

                <ul>
                    <li><strong>Inicio: </strong> 
                    cada jugador debe elegir un personaje. Además, contará con una base inicial de $1500.</li>
                    <li><strong>Banco: </strong>
                    es el encargado de hacer todas las transacciones, guarda las propiedades, 
                    cobra los dividendos y multas, vende las construcciones, entre otras cosas.
                    No te debes preocupar por ello, el juego se encarga.</li>
                    <li><strong>Juego: </strong>
                    El jugador inicial se decide de manera aleatoria. El juego comienza cuando el primer
                    jugador tira los dados (dos dados). El jugador debe avanzar la cantidad de casillas 
                    correspondientes a la suma de los dos dados. En su jugada, el jugador puede realizar
                    diversas acciones dependiendo del estado de la casilla en la que se encuentre.
                        <ul>
                            <li>Si la casilla es de otro jugador, deberá pagarle el alquiler correspondiente</li>
                            <li>Si la casilla es de él, podrá construir edificios</li>
                            <li>Si la casilla no es de nadie, puede comprarla o no hacer nada al respecto</li>
                            <li>Si la casilla no corresponde a una propiedad, deberá acatar las 
                                instrucciones (cárcel, metro o controles)</li>
                        </ul>
                    </li>
                    <li><strong>Cómo ganar: </strong> Cuando el primer jugador se declara en quiebra, se da por finalizado 
                        el juego. Declararse en quiebra significa no tener dinero para pagar un alquiler 
                        o cualquier tipo de multa.
                        El ganador de la partida es el jugador que tiene más activos. Para calcularlo,
                        se realiza el siguiente cálculo:
                        <br/>
                        <strong>Activos = valor propiedades + valor construcciones + efectivo</strong>
                    </li>
                </ul>
                <p>Estás listo para jugar. ¡Toda la suerte en esta nueva experiencia!</p>

                <h2>Preguntas Frecuentes</h2>
                <ol>
                    <li><strong>¿Qué personajes puedo elegir?</strong></li>
                    Los meones, Baticristo, Profesor Rosa o Estudiante.
                    <li><strong>¿Qué es entrar en quiebra?</strong></li>
                    Un jugador entra en quiebra cuando no puede pagar al banco o a otro jugador. 
                    Si no tiene dinero puede vender sus propiedades al banco puede vender sus 
                    propiedades y construcciones a mitad de precio al banco. 
                    Si, aun así, no tiene dinero, el jugador se declara en quiebra y pierde.
                    <li><strong>¿Qué es una carta control?</strong></li>
                    Es una carta sorpresa que simula los controles de los ramos de la universidad. 
                    Pueden ser la I1, la I2, la I3 o Eximición del examen. 
                    Al caer en una casilla de “control” te puede tocar realizar distintas actividades,
                    tales como pagar una multa, ir a la cárcel, o ganarte un premio por tus méritos.
                </ol>
            </div>
        </div>
    )
}
