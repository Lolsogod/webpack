import { useDispatch, useSelector } from "react-redux";
import { Navigate, useParams } from "react-router";
import { AppDispatch, RootState } from "../store";
import NotFound from "./NotFound";
import { fetchMovie } from "../store/movies/moviesSlice";
import { useEffect } from "react";

const MoviePage = () => {
    let { id } = useParams<{ id: string }>();
    const dispatch: AppDispatch = useDispatch();    
    const movie = useSelector((state: RootState) => state.movies.current);
    useEffect(() => {
        dispatch(fetchMovie(id!))
    },[])
    if (movie.pending) return <div>Loading...</div>
    if (!movie.data) return <NotFound/>
    return (
        <div>{movie.data?.name}</div>
    )
}

export default MoviePage