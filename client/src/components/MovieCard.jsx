function MovieCard({ movie }) {
    return (
        <div>
            <img src={movie.poster} alt={`${movie.title}`} width="150" />
            <h2>{movie.title}</h2>
            <p>{movie.year}</p>
        </div>
    );
}

export default MovieCard;