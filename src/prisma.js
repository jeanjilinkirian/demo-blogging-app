import { Prisma } from 'prisma-binding';
import { fragmentReplacements } from './resolvers/index';

const prisma = new Prisma({
    typeDefs: 'src/generated/prisma.graphql',
    endpoint: process.env.PRISMA_ENDPOINT,
    secret: process.env.PRISMA_SECRET,
    fragmentReplacements
});

export { prisma as default }
/*
const createPostForUser = async (authorId, data) => {
    const userExists = await prisma.exists.User({
        id: authorId
    });

    if(!userExists)
        throw new Error('User does not exist.');

    const post = await prisma.mutation.createPost({
        data: {
            ...data,
            author: {
                connect: {
                    id: authorId
                }
            }
        }
    }, '{ author { id name email posts { id title published }}}');

    return post.author;
};

/*createPostForUser('cl141tf9j013v09004c1v7ebm', {
    title: 'Amazing Music',
    body: 'relaxing music',
    published: true
}).then(user => console.log(user))
    .catch(err => console.log(err));*/

/*
const updatePostForUser = async (postId, data) => {
    const postExists = await prisma.exists.Post({ id: postId});

    if(!postExists)
        throw new Error('Post does not exist');

    const post = await prisma.mutation.updatePost({
        data: {
            ...data
        }, where: {
            id: postId
        }
    }, '{ author { id name email posts { id title body published }}}');

    return post.author;
};
*/

/*
updatePostForUser("cl159wudj02du0900cwvlvplo", {
    title: "101 GraphQL"
}).then(data => console.log(JSON.stringify(data, undefined, 2)))
    .catch(err => console.log(err));
*/
