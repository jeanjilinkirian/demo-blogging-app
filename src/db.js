const users = [{
    id: '1',
    name: 'Jean',
    email: 'jeanjilinkirian@gmail.com',
    age: 26
}, {
    id: '2',
    name: 'Sarah',
    email: 'sarahjilinkirian@gmail.com'
}, {
    id: '3',
    name: 'Mike',
    email: 'mike@example.com'
}];

const posts = [
    {
        id: "1000",
        title: "The Communist Manifesto",
        body: "The understanding of communism",
        published: true,
        author: '1'
    },
    {
        id: "1001",
        title: "The life of Vladimir Putin",
        body: "How Vladimir Putin became nation leader",
        published: true,
        author: '1'
    },
    {
        id: "1002",
        title: "Artsakh Liberation",
        body: "Independence and the Right to Self Determination",
        published: true,
        author: '2'
    }
];

const comments = [{
    id: "12000",
    text: "This is an interesting book. Much recommended!",
    author: "1",
    post: "1000"
}, {
    id: "12001",
    text: "the author is creative and insightful",
    author: "2",
    post: "1000"
}, {
    id: "12002",
    text: "People should know the turth. Highly recommended!",
    author: "3",
    post: "1002"
}, {
    id: "12003",
    text: "A Mastermind.",
    author: "3",
    post: "1001"
}];


const db = {
    users,
    posts,
    comments
}

export {db as default}