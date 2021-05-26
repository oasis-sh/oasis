import React from 'react'

import {
    CreatePostInput
} from '../CreatePostInput';
import { Post } from "../../post/Post";

import StyledMarkdown from '../../../../../web/src/markdown/StyledMarkdown';
interface Props {
    createPost: (variables: object) => void,
    likeDislikePost: (variable: object) => void,
    user: any,
    posts: any
}
export const PostsSection: React.FC<Props> = ({ createPost, likeDislikePost, user, posts }) => {
    return (
        <>

            {user && (
                <CreatePostInput
                    avatarUrl={user.avatar}
                    onSubmit={(value: string) =>
                        createPost({ variables: { message: value, topics: [] } })
                    }
                />
            )}
            {[...posts].reverse().map((post: any, index: number) => (
                <Post
                    post={post}
                    key={index}
                    markdown={(text) => {
                        return <StyledMarkdown text={text} isPost={true} />;
                    }}
                    likePost={() => {
                        likeDislikePost({
                            variables: {
                                postId: post.id,
                                dislike: false,
                                like: true,
                            },
                        });
                    }}
                    dislikePost={() => {
                        likeDislikePost({
                            variables: {
                                postId: post.id,
                                dislike: true,
                                like: false,
                            },
                        });
                    }}
                />
            ))}
        </>

    )

}
