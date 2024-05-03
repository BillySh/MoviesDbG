export interface IMovieCard{
    title: string;
    genreId: number;
    movieId: number;
    votesAverage: number;
    posterPath: string;

}

export interface IGenre{
    id: number;
    name: string;
}