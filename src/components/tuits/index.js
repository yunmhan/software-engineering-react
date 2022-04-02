import React from "react";
import './tuits.css';
import Tuit from "./tuit";
import * as service from "../../services/tuits-service";
import {userDislikesTuit, userLikesTuit} from "../../services/likes-service";
const Tuits = ({tuits = [], refreshTuits}) => {
    const likeTuit = (tuit) =>
        userLikesTuit("me", tuit._id)
            .then(refreshTuits)
            .catch(e => alert(e))
    const deleteTuit = (tid) =>
        service.deleteTuit(tid)
            .then(refreshTuits)
    const dislikeTuit = (tuit) =>
        userDislikesTuit("me", tuit._id)
            .then(refreshTuits)
            .catch(e => alert(e));

    return (
        <div>
          <ul className="ttr-tuits list-group">
            {
              tuits.map && tuits.map(tuit =>
                  <Tuit className="the-tuit"
                        key={tuit._id}
                        deleteTuit={deleteTuit}
                        likeTuit={likeTuit}
                        dislikeTuit={dislikeTuit}
                        tuit={tuit}/>)
            }
          </ul>
        </div>
      );
}

export default Tuits;