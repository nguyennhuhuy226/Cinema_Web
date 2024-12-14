import { createContext, useState } from "react";
import PropType from "prop-types";
import Modal from "react-modal";
import YouTube from "react-youtube";

const opts = {
    height: "600",
    width: "900",
    playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
    },
};

const MovieContext = createContext();

const MovieProvider = ({ children }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [trailerKey, setTrailerKey] = useState("");

    const handleTrailer = async (id) => {
        setTrailerKey('');
        try {
            const url = `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`;
            const options = {
                method: "GET",
                headers: {
                    accept: "application/json",
                    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MzgwMzgyZDEyOTk3ZDQ3NWEwNjg2MjU1MDNiMjg4MSIsIm5iZiI6MTcyOTU0MDcyNS45NTQ5OTMsInN1YiI6IjY3MTJhNDJlMjVjNzBiOGIxZDY3ZDY4NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zNPld_SAJs7Sp0B2aWHUMXqXpm70Wexc0UMcdV17KFI`,
                },
            };
            const movieKey = await fetch(url, options);
            console.log(movieKey)
            const data = await movieKey.json();
            setTrailerKey(data.results[0].key);
            setModalIsOpen(true);
            console.log(url)
        } catch (error) {
            setModalIsOpen(false);
            console.log(error);
        }
    };
    return (
        <MovieContext.Provider value={{ handleTrailer }}>
            {children}
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                style={{
                    overlay: {
                        position: "fixed",
                        zIndex: 9999,
                    },
                    content: {
                        top: "50%",
                        left: "50%",
                        right: "auto",
                        bottom: "auto",
                        marginRight: "-50%",
                        transform: "translate(-50%, -50%)",
                    },
                }}
                contentLabel="Example Modal"
            >
                <YouTube videoId={trailerKey} opts={opts} />
            </Modal>
        </MovieContext.Provider>
    )
};

MovieProvider.propType = {
    children: PropType.node,
}

export { MovieProvider, MovieContext }