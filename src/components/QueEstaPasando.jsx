const QueEstaPasando = ({ tipo, nombre, sobre }) => {
    return (
        <div>
            <h1 style={{color: 'grey'}}> {tipo} - Tendencia </h1>
            <h2 style={{color: 'white'}}> {nombre} </h2>
            <h3 style={{color: 'grey'}}> Tendencia sobre <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
                {sobre}
                </a></h3>
        </div>
    )
}

export {QueEstaPasando}