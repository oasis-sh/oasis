// import StyledMarkdown from '../../../../web/src/components/markdown/StyledMarkdown';
import {
  Comment as TComment,
  User,
  ReportEntityMutationHookResult,
  useLikeDislikeCommentMutation,
} from '@oasis-sh/react-gql';
import React from 'react';
import Comment from '../comment/Comment';
import { InfiniteScrollWrapper } from '../shared/InfiniteScrollWrapper';

type Props = {
  comments: TComment[];
  likeDislikeComment: ReturnType<typeof useLikeDislikeCommentMutation>[0];
  // deleteComment: ReturnType<typeof useDeletePostMutation>[0];
  markdown: (text: string) => JSX.Element;
  currentUser?: User;
  reportComment?: ReportEntityMutationHookResult[0];
  fetch: (limit: number, offset: number) => Promise<TComment[]>;
  bgColorOveride?: string;
};

export const Comments: React.FC<Props> = ({
  comments,
  markdown,
  likeDislikeComment,
  currentUser,
  reportComment,
  fetch,
  bgColorOveride,
}) => {
  return (
    <>
      <InfiniteScrollWrapper
        amountPerFetch={10}
        defaultItems={comments}
        fetch={fetch}
        renderComponent={(comment, index) => (
          <div key={index} className="mb-6">
            <Comment
              comment={comment as TComment}
              currentUser={currentUser}
              // deletePost={(id) => {
              //   deletePost({
              //     variables: { postId: id },
              //   });
              //   window.location.reload();
              // }}
              markdown={markdown}
              bgColorOveride={bgColorOveride ?? 'bg-gray-900'}
              likeComment={() => {
                likeDislikeComment({
                  variables: {
                    dislike: false,
                    like: true,
                    commentId: comment.id,
                  },
                });
                // window.location.reload();
              }}
              dislikeComment={() => {
                likeDislikeComment({
                  variables: {
                    dislike: true,
                    like: false,
                    commentId: comment.id,
                  },
                });
                // window.location.reload();
              }}
              reportComment={reportComment}
            />
          </div>
        )}
      />
    </>
  );
};
