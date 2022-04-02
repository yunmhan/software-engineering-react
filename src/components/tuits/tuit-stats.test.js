import {act, create} from 'react-test-renderer';
import TuitStats from "./tuit-stats";

test('stats render correctly', () => {
    let stats = {
        likes: 123,
        replies: 234,
        retuits: 345,
        dislikes:543
    }

    const likeTuit = () => {
        act(() => {
            stats.likes++;
            tuitStats.update(
                <TuitStats
                    tuit={{stats: stats}}
                    likeTuit={() => {}}
                />)
        })
    }

    const dislikeTuit = () => {
        act(() => {
            stats.dislikes++;
            tuitStats.update(
                <TuitStats
                    tuit={{stats: stats}}
                    dislikeTuit={() => {}}
                />)
        })
    }

    let tuitStats
    act(() => {
        tuitStats = create(
            <TuitStats
                likeTuit={likeTuit}
                dislikeTuit={dislikeTuit}
                tuit={{stats: stats}}/>
        );
    })

    const root = tuitStats.root;
    const likesCounter = root.findByProps({className: 'ttr-stats-likes'})
    const dislikesCounter = root.findByProps({className:'ttr-stats-dislikes'})
    const retuitsCounter = root.findByProps({className: 'ttr-stats-retuits'})
    const repliesCounter = root.findByProps({className: 'ttr-stats-replies'})
    const likeTuitButton = root.findByProps(
        {className: 'ttr-like-tuit-click'})
    const dislikeTuitButton = root.findByProps({className:'ttr-dislike-tuit-click'})

    let likesText = likesCounter.children[0];
    let dislikesText =dislikesCounter.children[0];
    const repliesText = repliesCounter.children[0];
    const retuitsText = retuitsCounter.children[0];
    expect(likesText).toBe('123');
    expect(repliesText).toBe('234');
    expect(retuitsText).toBe('345');
    expect(dislikesText).toBe('543')

    act(() => {likeTuitButton.props.onClick()})
    likesText = likesCounter.children[0];
    expect(likesText).toBe('124');
    act(() => {dislikeTuitButton.props.onClick()})
    dislikesText =dislikesCounter.children[0];
    expect(dislikesText).toBe('544');
});