import "./List.scss";
import { useDispatch, useSelector } from "react-redux";
import { changeCurrent, replaceQueue } from "../../store/reducers/queue";
import { dislikeSong, likeSong } from "../../store/thunks/user";
import axios from "../../api/axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import ModalWrapper from "./ModalWrapper";
import {
  RiDeleteBin6Line,
  RiEditCircleLine,
  RiHeart2Fill,
  RiHeart2Line,
  RiMoreLine,
} from "react-icons/ri";

const List = (props) => {
  const [songId, setSongId] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const { likedSongs, playlists } = useSelector(
    (state) => state.user.data || { likedSongs: [], playlists: [] }
  );
  const { currentId } = useSelector((state) => state.queue || {});
  const dispatch = useDispatch();

  const playSongHandler = (i, id) => {
    const songs = props.list;
    if (id === "65195ebfd44961eafcf4c9c2") toast("🦄 I GOT YOU!");
    dispatch(changeCurrent({ i, id }));
    dispatch(replaceQueue({ songs, i, id }));
  };

  const userLikedSong = (id) => {
    return likedSongs.some((obj) => obj.id === id);
  };

  const likeSongHandler = (song) => {
    dispatch(likeSong(song.id));
  };

  const dislikeSongHandler = (song) => {
    dispatch(dislikeSong(song.id));
  };

  const openModalHandler = (id) => {
    setModalOpen(true);
    setSongId(id);
  };

  const closeModalHandler = () => setModalOpen(false);

  const addSongToPlaylistHandler = async (id, songId) => {
    try {
      const res = await axios.post(`playlists/${id}/song/${songId}`);
      toast.success(res.data.message);
      setModalOpen(false);
    } catch (error) {
      toast.error("Failed to add song to playlist");
    }
  };

  const removeSongFromPlaylistHandler = async (id, songId) => {
    try {
      await axios.delete(`playlists/${id}/song/${songId}`);
      toast.success("Song removed");
    } catch (error) {
      toast.error("Failed to remove song from playlist");
    }
  };

  if (!props.list || props.list.length === 0) {
    return <div>No songs available</div>;
  }

  return (
    <>
      <div className="list">
        {props.list.map((el, i) => {
          // Check if el and el.artist are not null before accessing their properties
          if (!el || !el.artist) {
            return null;
          }

          return (
            <div
              className={`list__item ${el.artist.id === "6513505bef35c9d633139956" ? "vip" : ""}`}
              key={el.id}
            >
              {currentId !== el.id ? (
                <span className="list__num">{i + 1}</span>
              ) : (
                <div className="anim">
                  <div className="sq sq1"></div>
                  <div className="sq sq2"></div>
                  <div className="sq sq3"></div>
                  <div className="sq sq4"></div>
                </div>
              )}
              <img src={el.img} alt="Song cover" />
              <span
                className={`${currentId === el.id ? "list--green" : ""} list__name`}
                onClick={() => playSongHandler(i, el.id)}
              >
                {el.name}
              </span>
              <Link
                to={`/artist/${el.artist.id}`}
                className="list__artist-name"
              >
                {el.artist.name}
              </Link>
              <span className="list__count">{el.plays}</span>
              {userLikedSong(el.id) ? (
                <RiHeart2Fill onClick={() => dislikeSongHandler(el)} />
              ) : (
                <RiHeart2Line
                  style={{ color: "#fff" }}
                  onClick={() => likeSongHandler(el)}
                />
              )}
              <span>
                {props.admin && (
                  <RiEditCircleLine onClick={() => props.handler(el.id)} />
                )}
                {!props.admin &&
                  (props.onPlaylist ? (
                    <RiDeleteBin6Line
                      onClick={() =>
                        removeSongFromPlaylistHandler(props.pId, el.id)
                      }
                    />
                  ) : (
                    <RiMoreLine onClick={() => openModalHandler(el.id)} />
                  ))}
              </span>
            </div>
          );
        })}
      </div>

      <ModalWrapper
        heading="Save song to"
        open={modalOpen}
        type="list"
        handleClose={closeModalHandler}
      >
        <ul className="modal__list">
          {playlists.map((p, i) => (
            <li
              key={i}
              className="modal-wrapper__item"
              onClick={() => addSongToPlaylistHandler(p.id, songId)}
            >
              {p.name}
            </li>
          ))}
        </ul>
      </ModalWrapper>
    </>
  );
};

export default List;
