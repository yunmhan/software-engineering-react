import {
    createTuit, deleteTuit, findTuitById, findAllTuits, findTuitByUser
} from "../services/tuits-service";

import {
    createUser, deleteUsersByUsername
} from "../services/users-service";

const ripley = {
    username: 'ellenripley',
    password: 'lv426',
    email: 'ellenripley@aliens.com'
};

let newUser;

beforeAll(async () => {
    newUser = await createUser(ripley);
})

afterAll(() => {
    return deleteUsersByUsername(ripley.username);
})


describe('createTuit', () => {
    const newtuit = {
        tuit: 'this is a test of create tuit',
    };

    let tid;
    afterAll(() => {
        return deleteTuit(tid);
    })

    test('can create tuit with REST API', async() => {
        const createNewTuit = await createTuit(newUser._id, newtuit);
        tid = createNewTuit._id;
        expect(createNewTuit.postedBy).toEqual(newUser._id);
        expect(createNewTuit.tuit).toEqual(newtuit.tuit);
    })
});

describe('deleteTuit', () => {
  const deletedTuit = {
        tuit:'This tuit has been deleted.'
  };
  let tid;

  afterAll(() => {
        return deleteTuit(tid);
    })

  test('can delete tuit wtih REST API', async () => {
      const newTuit = await createTuit(newUser._id, deletedTuit);
      tid = newTuit._id;
      const status = await deleteTuit(newTuit._id);
      expect(status.deletedCount).toBeGreaterThanOrEqual(1);
  })

});

describe('findTuitById', () => {
    const findTuit = {
        tuit: 'this is a test for find tuit by tid'
    }
    let tid;

    afterAll(() => {
        return deleteTuit(tid);
    })

    test('can retrieve a tuit by their primary key with REST API', async () =>{
        const newTuit = await createTuit(newUser._id, findTuit);
        tid = newTuit._id;
        const existingTuit = await findTuitById(newTuit._id);
        expect(existingTuit.postedBy).toEqual(newUser);
        expect(existingTuit.tuit).toEqual(findTuit.tuit);
    })

});

describe('findAllTuits', () => {
    const tuits = [
        "tuit 1", "tuit 2", "tuit 3"
    ];

    beforeAll(() =>
        tuits.map(tuitarray =>
            createTuit(newUser._id,
                       {tuit: tuitarray}))
    );

    afterAll(async () =>{
        const insertTuits = await findTuitByUser(newUser._id);
        return Promise.all(insertTuits.map(tuit =>
                deleteTuit(tuit._id)));
    });

    test('can retrieve all tuits with REST API', async() => {
        const findTuits = await findAllTuits();
        expect(findTuits.length).toBeGreaterThanOrEqual(tuits.length);

        const tuitsWeInserted = findTuits.filter(
            tuitarray => tuits.indexOf(tuitarray.tuit) >= 0
        );

        tuitsWeInserted.forEach(tuitarray => {
            const tuitContent = tuits.find(tuitContent => tuitContent === tuitarray.tuit);
            expect(tuitarray.tuit).toEqual(tuitContent);
            expect(tuitarray.postedBy).toEqual(newUser);
        });
    })

});


