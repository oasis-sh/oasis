import React from 'react';
import { CreatePostInput } from '../home/CreatePostInput';
import {
  DeletePostMutationHookResult,
  ReportEntityMutationHookResult,
} from '@oasis-sh/react-gql';
import { InfiniteScrollWrapper } from '../shared/InfiniteScrollWrapper';
import { NewPost } from '../..';

type DeleteMutation = DeletePostMutationHookResult[0];

interface Props {
  createPost: (variables: object) => void;
  likeDownvotePost: (variable: object) => void;
  user: any;
  posts: any;
  StyledMarkdown: any;
  deleteMutation: DeleteMutation;
  fetch: (limit: number, offset: number) => Promise<any>;
  amountPerFetch: number;
  reportPost?: ReportEntityMutationHookResult[0];
}

export const NewPostsSection: React.FC<Props> = ({
  createPost,
  likeDownvotePost,
  user,
  posts,
  StyledMarkdown,
  deleteMutation,
  fetch,
  amountPerFetch,
  reportPost,
}) => {
  return (
    <>
      {user && (
        <div className="mb-6">
          <CreatePostInput
            avatarUrl={user.avatar}
            onSubmit={(value: string) => {
              createPost({ variables: { message: value, topics: [] } });
              // window.location.reload();
            }}
          />
        </div>
      )}
      <InfiniteScrollWrapper
        fetch={fetch}
        amountPerFetch={amountPerFetch}
        defaultItems={posts}
        renderComponent={(post, index) => (
          <div className="mb-6" key={index}>
            <NewPost
              post={post}
              markdown={(text) => {
                return <StyledMarkdown text={text} isPost={true} />;
              }}
              likePost={() => {
                likeDownvotePost({
                  variables: {
                    postId: post.id,
                    downvote: false,
                    like: true,
                  },
                });
              }}
              downvotePost={() => {
                likeDownvotePost({
                  variables: {
                    postId: post.id,
                    downvote: true,
                    like: false,
                  },
                });
              }}
              currentUser={user}
              deletePost={(id) => {
                deleteMutation({
                  variables: {
                    postId: id,
                  },
                });
                window.location.reload();
              }}
              reportPost={reportPost}
            />
          </div>
        )}
      />
    </>
  );
};
