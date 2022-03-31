import bcryptjs from 'bcryptjs';
import getUserId from '../utils/getUserId';
import generateToken from '../utils/generateToken';
import hashPassword from '../utils/hashPassword';

const Mutation = {
    async createUser(parent, args, {prisma}, info) {
        const password = await hashPassword(args.data.password);

        const user = await prisma.mutation.createUser({ 
            data: {
                ...args.data,
                password
            }
        });

        return { user, token: generateToken(user.id) }
    },
    async logIn(parent, args, {prisma}, info) {
        const user = await prisma.query.user({
            where: {
                email: args.data.email
            }
        });

        if(!user)
            throw new Error('User does not exist');

        const authenticated = await bcryptjs.compare(args.data.password, user.password)

        if(!authenticated)
            throw new Error('Email and/or password are not correct. Please provide the correct credentials');

        const token = generateToken(user.id);

        return {
            user,
            token
        };
    },
    async deleteUser(parent, args, {prisma, request}, info) {
        const userId = getUserId(request);

        return prisma.mutation.deleteUser({
            where: { id: userId }
        }, info);
    },
    async updateUser(parent, args, {prisma, request}, info) {
        const userId = getUserId(request);

        if(typeof args.data.password == 'string')
            args.data.password = await hashPassword(args.data.password);

        return prisma.mutation.updateUser({
            where: {
                id: userId
            },
            data: args.data
        }, info);
    },
    async createPost(parent, args, {prisma, request}, info) {
        const userId = getUserId(request);

        const userExists = await prisma.exists.User({ id: userId });

        if(!userExists)
            throw new Error('Authentication required.');

        return prisma.mutation.createPost({
            data: {
                title: args.data.title,
                body: args.data.body,
                published: args.data.published,
                author: {
                    connect: { id: userId }
                }
            }
        }, info);
        
    },
    async deletePost(parent, args, {prisma, request}, info) {
        const userId = getUserId(request);

        const postExists = await prisma.exists.Post({
            id: args.id,
            author: {
                id: userId
            }
        });

        if(!postExists)
            throw new Error('Post does not exist');

        return prisma.mutation.deletePost({
            where: { id: args.id }
        }, info);
    },
    async updatePost(parent, args, {prisma ,request}, info) {
        const userId = getUserId(request);

        const postExists = await prisma.exists.Post({
            id: args.id,
            author: { id: userId }
        });

        const isPublished = await prisma.exists.Post({
            id: args.id,
            published: true
        });

        if(!postExists)
            throw new Error("Post does not exist.");

        if(isPublished && !args.data.published)
            await prisma.mutation.deleteManyComments({
                where: {
                    post: {
                        id: args.id
                    }
                }
            });
        
        return prisma.mutation.updatePost({
            where: { id: args.id },
            data: args.data
        }, info);
    },
    async createComment(parent, args, {prisma, request}, info) {
        const userId = getUserId(request);
        const postExists = await prisma.exists.Post({
            id: args.data.post,
            published: true
        });

        if(!postExists)
            throw new Error('Unable to find the post');

        return prisma.mutation.createComment({
            data: {
                text: args.data.text,
                author: {
                    connect: { id: userId }
                },
                post: {
                    connect: { id: args.data.post }
                }
            }
        }, info);
    },
    async deleteComment(parent, args, {prisma, request}, info) {
        const userId = getUserId(request);
        
        const commentExists = await prisma.exists.Comment({
            id: args.id,
            author: {
                id: userId
            }
        });

        if(!commentExists)
            throw new Error('Comment does not exist');
        
        return prisma.mutation.deleteComment({
            where: { id: args.id }
        }, info);
    },
    async updateComment(parent, args, {prisma, request}, info) {
        const userId = getUserId(request);
        
        const commentExists = await prisma.exists.Comment({
            id: args.id,
            author: {
                id: userId
            }
        });

        if(!commentExists)
            throw new Error('Comment does not exist');
        
        return prisma.mutation.updateComment({
            where: { id: args.id },
            data: args.data
        }, info);
    }
};

export { Mutation as default }