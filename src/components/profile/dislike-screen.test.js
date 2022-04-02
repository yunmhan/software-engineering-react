import {act, create} from 'react-test-renderer';
import dislikedTuits from "./my-dislikes";
import MyDislikes from "./my-dislikes";

const MOCKED_TUITS =
    [{tuit: "alice's tuit", postBy: "123", _id: "321", stats: {likes: 345, dislikes: 543}}, {tuit: "bob's tuit", postBy: "234", _id: "432", stats: {likes: 543, dislikes: 345}}];

console.error = () => {
};
test(
    'mydislike-screen', () => {
        let dislike;
        act(() => {
            dislike = create(
                <MyDislikes
                    tuits={MOCKED_TUITS}
                    />
            )
        });

        const root = dislike.root;
        const ttrTuits = root.findAllByProps({className:"ttr-tuit"});
        expect(ttrTuits.length).toEqual(dislikedTuits.length);
        ttrTuits.forEach((ttrTuit, ndx) => {
            expect(ttrTuit.props.children).toBe(dislikedTuits[ndx].tuit);
        });

    }
)
