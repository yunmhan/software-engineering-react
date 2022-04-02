/**
 *@file implement my-dislike screen in profile
 */
import Tuits from "../tuits";
import * as service from "../../services/likes-service";
import {useEffect, useState} from "react";

const MyDislikes = () => {
    const [dislikedTuits, setDislikedTuits] = useState([]);
    const findTuitsIDislike = () =>
        service.findAllTuitsDislikedByUser("me")
            .then((tuits) => setDislikedTuits(tuits));
    useEffect(findTuitsIDislike, []);

    return(
        <div>
            <Tuits tuits={dislikedTuits} refreshTuits={findTuitsIDislike}/>
        </div>
    );
};
export default MyDislikes;