import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};


export type Query = {
  __typename?: 'Query';
  _: Scalars['String'];
  users?: Maybe<Array<User>>;
  userId: Scalars['String'];
  me?: Maybe<User>;
  posts?: Maybe<Array<Maybe<Post>>>;
  post?: Maybe<Post>;
  comments?: Maybe<Array<Maybe<Comment>>>;
  blog?: Maybe<Blog>;
  blogByUser?: Maybe<Array<Maybe<Blog>>>;
  recentBlogPosts?: Maybe<Array<Maybe<Post>>>;
  followers?: Maybe<Array<Maybe<User>>>;
  following?: Maybe<Array<Maybe<Blog>>>;
  followingIds?: Maybe<Array<Maybe<Scalars['String']>>>;
  followersCount?: Maybe<Scalars['Int']>;
  followingCount?: Maybe<Scalars['Int']>;
};


export type QueryPostsArgs = {
  approved?: Maybe<Scalars['Boolean']>;
};


export type QueryPostArgs = {
  postId: Scalars['String'];
};


export type QueryCommentsArgs = {
  postId: Scalars['String'];
};


export type QueryBlogArgs = {
  _id: Scalars['String'];
};


export type QueryBlogByUserArgs = {
  _id: Scalars['String'];
};


export type QueryRecentBlogPostsArgs = {
  _id: Scalars['String'];
  amount: Scalars['Int'];
};


export type QueryFollowersArgs = {
  _id: Scalars['String'];
};


export type QueryFollowingArgs = {
  _id: Scalars['String'];
};


export type QueryFollowingIdsArgs = {
  _id: Scalars['String'];
};


export type QueryFollowersCountArgs = {
  _id?: Maybe<Scalars['String']>;
};


export type QueryFollowingCountArgs = {
  _id?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  _: Scalars['String'];
  registerUser: BaseResponse;
  login: LoginResponse;
  revokeUserFrefreshToken: Scalars['Boolean'];
  logout: Scalars['Boolean'];
  createPost: PostResponse;
  editPost: EditPostResponse;
  removeAllPosts?: Maybe<Scalars['Boolean']>;
  changeApprovalStatus: ApprovalStatusResponse;
  createComment: CreateCommentResponse;
  editComment: CreateCommentResponse;
  createBlog: BlogCreateResponse;
  addFollower?: Maybe<BaseResponse>;
  removeFollower?: Maybe<BaseResponse>;
};


export type MutationRegisterUserArgs = {
  user: UserInput;
};


export type MutationLoginArgs = {
  user: UserInput;
};


export type MutationRevokeUserFrefreshTokenArgs = {
  userId: Scalars['String'];
};


export type MutationCreatePostArgs = {
  post?: Maybe<PostInput>;
};


export type MutationEditPostArgs = {
  postId: Scalars['String'];
  newPost: PostInput;
};


export type MutationChangeApprovalStatusArgs = {
  postId: Scalars['String'];
  approved: Scalars['Boolean'];
};


export type MutationCreateCommentArgs = {
  comment: CommentInput;
};


export type MutationEditCommentArgs = {
  commentId: Scalars['String'];
  updatedContent: Scalars['String'];
};


export type MutationCreateBlogArgs = {
  name: Scalars['String'];
};


export type MutationAddFollowerArgs = {
  blogId: Scalars['String'];
  userId: Scalars['String'];
};


export type MutationRemoveFollowerArgs = {
  blogId: Scalars['String'];
  userId: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  password: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  admin: Scalars['Boolean'];
  _id: Scalars['String'];
};

export type UserInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  name?: Maybe<Scalars['String']>;
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  accessToken: Scalars['String'];
  user: User;
};

export type BaseResponse = {
  __typename?: 'BaseResponse';
  success: Scalars['Boolean'];
  message?: Maybe<Scalars['String']>;
};

export type Post = {
  __typename?: 'Post';
  content?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  author?: Maybe<Author>;
  _id?: Maybe<Scalars['String']>;
  approved?: Maybe<Scalars['Boolean']>;
};

export type Author = {
  __typename?: 'Author';
  name?: Maybe<Scalars['String']>;
  _id: Scalars['String'];
};

export type PostInput = {
  content: Scalars['String'];
  title: Scalars['String'];
  blog: Scalars['String'];
};

export type PostResponse = {
  __typename?: 'PostResponse';
  success: Scalars['Boolean'];
  post?: Maybe<Post>;
  message?: Maybe<Scalars['String']>;
};

export type ApprovalStatusResponse = {
  __typename?: 'ApprovalStatusResponse';
  success: Scalars['Boolean'];
  approved: Scalars['Boolean'];
  message?: Maybe<Scalars['String']>;
  postId?: Maybe<Scalars['String']>;
};

export type EditPostResponse = {
  __typename?: 'EditPostResponse';
  success: Scalars['Boolean'];
  message?: Maybe<Scalars['String']>;
};

export type Comment = {
  __typename?: 'Comment';
  content?: Maybe<Scalars['String']>;
  parentPost?: Maybe<Scalars['String']>;
  author?: Maybe<Author>;
  _id?: Maybe<Scalars['String']>;
};

export type CommentInput = {
  content: Scalars['String'];
  postId: Scalars['String'];
};

export type CreateCommentResponse = {
  __typename?: 'CreateCommentResponse';
  success: Scalars['Boolean'];
  message?: Maybe<Scalars['String']>;
  comment?: Maybe<Comment>;
};

export type Blog = {
  __typename?: 'Blog';
  author: Author;
  posts: Array<Maybe<Post>>;
  name: Scalars['String'];
  _id: Scalars['String'];
};

export type BlogCreateResponse = {
  __typename?: 'BlogCreateResponse';
  success: Scalars['Boolean'];
  message?: Maybe<Scalars['String']>;
  _id?: Maybe<Scalars['String']>;
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}


export type AdminMeQueryVariables = Exact<{ [key: string]: never; }>;


export type AdminMeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'email' | '_id' | 'admin'>
  )> }
);

export type ApprovedPostsQueryVariables = Exact<{ [key: string]: never; }>;


export type ApprovedPostsQuery = (
  { __typename?: 'Query' }
  & { posts?: Maybe<Array<Maybe<(
    { __typename?: 'Post' }
    & Pick<Post, 'content' | 'title' | '_id'>
    & { author?: Maybe<(
      { __typename?: 'Author' }
      & Pick<Author, 'name' | '_id'>
    )> }
  )>>> }
);

export type BlogQueryVariables = Exact<{
  _id: Scalars['String'];
}>;


export type BlogQuery = (
  { __typename?: 'Query' }
  & { blog?: Maybe<(
    { __typename?: 'Blog' }
    & Pick<Blog, 'name' | '_id'>
    & { posts: Array<Maybe<(
      { __typename?: 'Post' }
      & Pick<Post, 'title' | '_id'>
    )>>, author: (
      { __typename?: 'Author' }
      & Pick<Author, 'name' | '_id'>
    ) }
  )> }
);

export type BlogByUserQueryVariables = Exact<{
  _id: Scalars['String'];
}>;


export type BlogByUserQuery = (
  { __typename?: 'Query' }
  & { blogByUser?: Maybe<Array<Maybe<(
    { __typename?: 'Blog' }
    & Pick<Blog, 'name' | '_id'>
    & { author: (
      { __typename?: 'Author' }
      & Pick<Author, 'name'>
    ) }
  )>>> }
);

export type ChangeApprovalStatusMutationVariables = Exact<{
  postId: Scalars['String'];
  approved: Scalars['Boolean'];
}>;


export type ChangeApprovalStatusMutation = (
  { __typename?: 'Mutation' }
  & { changeApprovalStatus: (
    { __typename?: 'ApprovalStatusResponse' }
    & Pick<ApprovalStatusResponse, 'success' | 'message' | 'postId' | 'approved'>
  ) }
);

export type CommentsQueryVariables = Exact<{
  postId: Scalars['String'];
}>;


export type CommentsQuery = (
  { __typename?: 'Query' }
  & { comments?: Maybe<Array<Maybe<(
    { __typename?: 'Comment' }
    & Pick<Comment, 'content' | '_id'>
    & { author?: Maybe<(
      { __typename?: 'Author' }
      & Pick<Author, 'name' | '_id'>
    )> }
  )>>> }
);

export type CreateBlogMutationVariables = Exact<{
  name: Scalars['String'];
}>;


export type CreateBlogMutation = (
  { __typename?: 'Mutation' }
  & { createBlog: (
    { __typename?: 'BlogCreateResponse' }
    & Pick<BlogCreateResponse, 'success' | '_id'>
  ) }
);

export type CreateCommentMutationVariables = Exact<{
  comment: CommentInput;
}>;


export type CreateCommentMutation = (
  { __typename?: 'Mutation' }
  & { createComment: (
    { __typename?: 'CreateCommentResponse' }
    & Pick<CreateCommentResponse, 'success' | 'message'>
  ) }
);

export type CreatePostMutationVariables = Exact<{
  title: Scalars['String'];
  content: Scalars['String'];
  blog: Scalars['String'];
}>;


export type CreatePostMutation = (
  { __typename?: 'Mutation' }
  & { createPost: (
    { __typename?: 'PostResponse' }
    & Pick<PostResponse, 'success' | 'message'>
  ) }
);

export type EditCommentMutationVariables = Exact<{
  commentId: Scalars['String'];
  updatedContent: Scalars['String'];
}>;


export type EditCommentMutation = (
  { __typename?: 'Mutation' }
  & { editComment: (
    { __typename?: 'CreateCommentResponse' }
    & Pick<CreateCommentResponse, 'success' | 'message'>
  ) }
);

export type EditPostMutationVariables = Exact<{
  postId: Scalars['String'];
  post: PostInput;
}>;


export type EditPostMutation = (
  { __typename?: 'Mutation' }
  & { editPost: (
    { __typename?: 'EditPostResponse' }
    & Pick<EditPostResponse, 'message' | 'success'>
  ) }
);

export type AddFollowerMutationVariables = Exact<{
  userId: Scalars['String'];
  blogId: Scalars['String'];
}>;


export type AddFollowerMutation = (
  { __typename?: 'Mutation' }
  & { addFollower?: Maybe<(
    { __typename?: 'BaseResponse' }
    & Pick<BaseResponse, 'success' | 'message'>
  )> }
);

export type FollowersCountQueryVariables = Exact<{
  _id: Scalars['String'];
}>;


export type FollowersCountQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'followersCount'>
);

export type FollowingQueryVariables = Exact<{
  _id: Scalars['String'];
}>;


export type FollowingQuery = (
  { __typename?: 'Query' }
  & { following?: Maybe<Array<Maybe<(
    { __typename?: 'Blog' }
    & Pick<Blog, '_id' | 'name'>
  )>>> }
);

export type FollowingCountQueryVariables = Exact<{
  _id: Scalars['String'];
}>;


export type FollowingCountQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'followingCount'>
);

export type FollowingIdsQueryVariables = Exact<{
  _id: Scalars['String'];
}>;


export type FollowingIdsQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'followingIds'>
);

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'LoginResponse' }
    & Pick<LoginResponse, 'accessToken'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'email' | '_id' | 'admin'>
    ) }
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'email' | '_id' | 'admin'>
  )> }
);

export type PostQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type PostQuery = (
  { __typename?: 'Query' }
  & { post?: Maybe<(
    { __typename?: 'Post' }
    & Pick<Post, '_id' | 'title' | 'content'>
    & { author?: Maybe<(
      { __typename?: 'Author' }
      & Pick<Author, 'name' | '_id'>
    )> }
  )> }
);

export type PostsQueryVariables = Exact<{ [key: string]: never; }>;


export type PostsQuery = (
  { __typename?: 'Query' }
  & { posts?: Maybe<Array<Maybe<(
    { __typename?: 'Post' }
    & Pick<Post, 'title' | '_id'>
    & { author?: Maybe<(
      { __typename?: 'Author' }
      & Pick<Author, 'name' | '_id'>
    )> }
  )>>> }
);

export type RecentBlogPostsQueryVariables = Exact<{
  _id: Scalars['String'];
  amount: Scalars['Int'];
}>;


export type RecentBlogPostsQuery = (
  { __typename?: 'Query' }
  & { recentBlogPosts?: Maybe<Array<Maybe<(
    { __typename?: 'Post' }
    & Pick<Post, 'title' | 'content'>
  )>>> }
);

export type RegisterMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { registerUser: (
    { __typename?: 'BaseResponse' }
    & Pick<BaseResponse, 'success' | 'message'>
  ) }
);

export type UnapprovedPostsQueryVariables = Exact<{ [key: string]: never; }>;


export type UnapprovedPostsQuery = (
  { __typename?: 'Query' }
  & { posts?: Maybe<Array<Maybe<(
    { __typename?: 'Post' }
    & Pick<Post, '_id' | 'content' | 'title' | 'approved'>
    & { author?: Maybe<(
      { __typename?: 'Author' }
      & Pick<Author, 'name'>
    )> }
  )>>> }
);

export type UserIdQueryVariables = Exact<{ [key: string]: never; }>;


export type UserIdQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'userId'>
);

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = (
  { __typename?: 'Query' }
  & { users?: Maybe<Array<(
    { __typename?: 'User' }
    & Pick<User, 'email'>
  )>> }
);

export type UsersPublicQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersPublicQuery = (
  { __typename?: 'Query' }
  & { users?: Maybe<Array<(
    { __typename?: 'User' }
    & Pick<User, 'email'>
  )>> }
);


export const AdminMeDocument = gql`
    query adminMe {
  me {
    email
    _id
    admin
  }
}
    `;

/**
 * __useAdminMeQuery__
 *
 * To run a query within a React component, call `useAdminMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useAdminMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAdminMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useAdminMeQuery(baseOptions?: Apollo.QueryHookOptions<AdminMeQuery, AdminMeQueryVariables>) {
        return Apollo.useQuery<AdminMeQuery, AdminMeQueryVariables>(AdminMeDocument, baseOptions);
      }
export function useAdminMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AdminMeQuery, AdminMeQueryVariables>) {
          return Apollo.useLazyQuery<AdminMeQuery, AdminMeQueryVariables>(AdminMeDocument, baseOptions);
        }
export type AdminMeQueryHookResult = ReturnType<typeof useAdminMeQuery>;
export type AdminMeLazyQueryHookResult = ReturnType<typeof useAdminMeLazyQuery>;
export type AdminMeQueryResult = Apollo.QueryResult<AdminMeQuery, AdminMeQueryVariables>;
export const ApprovedPostsDocument = gql`
    query ApprovedPosts {
  posts(approved: true) {
    content
    title
    author {
      name
      _id
    }
    _id
  }
}
    `;

/**
 * __useApprovedPostsQuery__
 *
 * To run a query within a React component, call `useApprovedPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useApprovedPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useApprovedPostsQuery({
 *   variables: {
 *   },
 * });
 */
export function useApprovedPostsQuery(baseOptions?: Apollo.QueryHookOptions<ApprovedPostsQuery, ApprovedPostsQueryVariables>) {
        return Apollo.useQuery<ApprovedPostsQuery, ApprovedPostsQueryVariables>(ApprovedPostsDocument, baseOptions);
      }
export function useApprovedPostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ApprovedPostsQuery, ApprovedPostsQueryVariables>) {
          return Apollo.useLazyQuery<ApprovedPostsQuery, ApprovedPostsQueryVariables>(ApprovedPostsDocument, baseOptions);
        }
export type ApprovedPostsQueryHookResult = ReturnType<typeof useApprovedPostsQuery>;
export type ApprovedPostsLazyQueryHookResult = ReturnType<typeof useApprovedPostsLazyQuery>;
export type ApprovedPostsQueryResult = Apollo.QueryResult<ApprovedPostsQuery, ApprovedPostsQueryVariables>;
export const BlogDocument = gql`
    query blog($_id: String!) {
  blog(_id: $_id) {
    name
    posts {
      title
      _id
    }
    author {
      name
      _id
    }
    _id
  }
}
    `;

/**
 * __useBlogQuery__
 *
 * To run a query within a React component, call `useBlogQuery` and pass it any options that fit your needs.
 * When your component renders, `useBlogQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBlogQuery({
 *   variables: {
 *      _id: // value for '_id'
 *   },
 * });
 */
export function useBlogQuery(baseOptions: Apollo.QueryHookOptions<BlogQuery, BlogQueryVariables>) {
        return Apollo.useQuery<BlogQuery, BlogQueryVariables>(BlogDocument, baseOptions);
      }
export function useBlogLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BlogQuery, BlogQueryVariables>) {
          return Apollo.useLazyQuery<BlogQuery, BlogQueryVariables>(BlogDocument, baseOptions);
        }
export type BlogQueryHookResult = ReturnType<typeof useBlogQuery>;
export type BlogLazyQueryHookResult = ReturnType<typeof useBlogLazyQuery>;
export type BlogQueryResult = Apollo.QueryResult<BlogQuery, BlogQueryVariables>;
export const BlogByUserDocument = gql`
    query blogByUser($_id: String!) {
  blogByUser(_id: $_id) {
    name
    _id
    author {
      name
    }
  }
}
    `;

/**
 * __useBlogByUserQuery__
 *
 * To run a query within a React component, call `useBlogByUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useBlogByUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBlogByUserQuery({
 *   variables: {
 *      _id: // value for '_id'
 *   },
 * });
 */
export function useBlogByUserQuery(baseOptions: Apollo.QueryHookOptions<BlogByUserQuery, BlogByUserQueryVariables>) {
        return Apollo.useQuery<BlogByUserQuery, BlogByUserQueryVariables>(BlogByUserDocument, baseOptions);
      }
export function useBlogByUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BlogByUserQuery, BlogByUserQueryVariables>) {
          return Apollo.useLazyQuery<BlogByUserQuery, BlogByUserQueryVariables>(BlogByUserDocument, baseOptions);
        }
export type BlogByUserQueryHookResult = ReturnType<typeof useBlogByUserQuery>;
export type BlogByUserLazyQueryHookResult = ReturnType<typeof useBlogByUserLazyQuery>;
export type BlogByUserQueryResult = Apollo.QueryResult<BlogByUserQuery, BlogByUserQueryVariables>;
export const ChangeApprovalStatusDocument = gql`
    mutation ChangeApprovalStatus($postId: String!, $approved: Boolean!) {
  changeApprovalStatus(postId: $postId, approved: $approved) {
    success
    message
    postId
    approved
  }
}
    `;
export type ChangeApprovalStatusMutationFn = Apollo.MutationFunction<ChangeApprovalStatusMutation, ChangeApprovalStatusMutationVariables>;

/**
 * __useChangeApprovalStatusMutation__
 *
 * To run a mutation, you first call `useChangeApprovalStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeApprovalStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeApprovalStatusMutation, { data, loading, error }] = useChangeApprovalStatusMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *      approved: // value for 'approved'
 *   },
 * });
 */
export function useChangeApprovalStatusMutation(baseOptions?: Apollo.MutationHookOptions<ChangeApprovalStatusMutation, ChangeApprovalStatusMutationVariables>) {
        return Apollo.useMutation<ChangeApprovalStatusMutation, ChangeApprovalStatusMutationVariables>(ChangeApprovalStatusDocument, baseOptions);
      }
export type ChangeApprovalStatusMutationHookResult = ReturnType<typeof useChangeApprovalStatusMutation>;
export type ChangeApprovalStatusMutationResult = Apollo.MutationResult<ChangeApprovalStatusMutation>;
export type ChangeApprovalStatusMutationOptions = Apollo.BaseMutationOptions<ChangeApprovalStatusMutation, ChangeApprovalStatusMutationVariables>;
export const CommentsDocument = gql`
    query Comments($postId: String!) {
  comments(postId: $postId) {
    content
    author {
      name
      _id
    }
    _id
  }
}
    `;

/**
 * __useCommentsQuery__
 *
 * To run a query within a React component, call `useCommentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCommentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCommentsQuery({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useCommentsQuery(baseOptions: Apollo.QueryHookOptions<CommentsQuery, CommentsQueryVariables>) {
        return Apollo.useQuery<CommentsQuery, CommentsQueryVariables>(CommentsDocument, baseOptions);
      }
export function useCommentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CommentsQuery, CommentsQueryVariables>) {
          return Apollo.useLazyQuery<CommentsQuery, CommentsQueryVariables>(CommentsDocument, baseOptions);
        }
export type CommentsQueryHookResult = ReturnType<typeof useCommentsQuery>;
export type CommentsLazyQueryHookResult = ReturnType<typeof useCommentsLazyQuery>;
export type CommentsQueryResult = Apollo.QueryResult<CommentsQuery, CommentsQueryVariables>;
export const CreateBlogDocument = gql`
    mutation CreateBlog($name: String!) {
  createBlog(name: $name) {
    success
    _id
  }
}
    `;
export type CreateBlogMutationFn = Apollo.MutationFunction<CreateBlogMutation, CreateBlogMutationVariables>;

/**
 * __useCreateBlogMutation__
 *
 * To run a mutation, you first call `useCreateBlogMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateBlogMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBlogMutation, { data, loading, error }] = useCreateBlogMutation({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useCreateBlogMutation(baseOptions?: Apollo.MutationHookOptions<CreateBlogMutation, CreateBlogMutationVariables>) {
        return Apollo.useMutation<CreateBlogMutation, CreateBlogMutationVariables>(CreateBlogDocument, baseOptions);
      }
export type CreateBlogMutationHookResult = ReturnType<typeof useCreateBlogMutation>;
export type CreateBlogMutationResult = Apollo.MutationResult<CreateBlogMutation>;
export type CreateBlogMutationOptions = Apollo.BaseMutationOptions<CreateBlogMutation, CreateBlogMutationVariables>;
export const CreateCommentDocument = gql`
    mutation CreateComment($comment: CommentInput!) {
  createComment(comment: $comment) {
    success
    message
  }
}
    `;
export type CreateCommentMutationFn = Apollo.MutationFunction<CreateCommentMutation, CreateCommentMutationVariables>;

/**
 * __useCreateCommentMutation__
 *
 * To run a mutation, you first call `useCreateCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCommentMutation, { data, loading, error }] = useCreateCommentMutation({
 *   variables: {
 *      comment: // value for 'comment'
 *   },
 * });
 */
export function useCreateCommentMutation(baseOptions?: Apollo.MutationHookOptions<CreateCommentMutation, CreateCommentMutationVariables>) {
        return Apollo.useMutation<CreateCommentMutation, CreateCommentMutationVariables>(CreateCommentDocument, baseOptions);
      }
export type CreateCommentMutationHookResult = ReturnType<typeof useCreateCommentMutation>;
export type CreateCommentMutationResult = Apollo.MutationResult<CreateCommentMutation>;
export type CreateCommentMutationOptions = Apollo.BaseMutationOptions<CreateCommentMutation, CreateCommentMutationVariables>;
export const CreatePostDocument = gql`
    mutation CreatePost($title: String!, $content: String!, $blog: String!) {
  createPost(post: {content: $content, title: $title, blog: $blog}) {
    success
    message
  }
}
    `;
export type CreatePostMutationFn = Apollo.MutationFunction<CreatePostMutation, CreatePostMutationVariables>;

/**
 * __useCreatePostMutation__
 *
 * To run a mutation, you first call `useCreatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostMutation, { data, loading, error }] = useCreatePostMutation({
 *   variables: {
 *      title: // value for 'title'
 *      content: // value for 'content'
 *      blog: // value for 'blog'
 *   },
 * });
 */
export function useCreatePostMutation(baseOptions?: Apollo.MutationHookOptions<CreatePostMutation, CreatePostMutationVariables>) {
        return Apollo.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument, baseOptions);
      }
export type CreatePostMutationHookResult = ReturnType<typeof useCreatePostMutation>;
export type CreatePostMutationResult = Apollo.MutationResult<CreatePostMutation>;
export type CreatePostMutationOptions = Apollo.BaseMutationOptions<CreatePostMutation, CreatePostMutationVariables>;
export const EditCommentDocument = gql`
    mutation EditComment($commentId: String!, $updatedContent: String!) {
  editComment(commentId: $commentId, updatedContent: $updatedContent) {
    success
    message
  }
}
    `;
export type EditCommentMutationFn = Apollo.MutationFunction<EditCommentMutation, EditCommentMutationVariables>;

/**
 * __useEditCommentMutation__
 *
 * To run a mutation, you first call `useEditCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editCommentMutation, { data, loading, error }] = useEditCommentMutation({
 *   variables: {
 *      commentId: // value for 'commentId'
 *      updatedContent: // value for 'updatedContent'
 *   },
 * });
 */
export function useEditCommentMutation(baseOptions?: Apollo.MutationHookOptions<EditCommentMutation, EditCommentMutationVariables>) {
        return Apollo.useMutation<EditCommentMutation, EditCommentMutationVariables>(EditCommentDocument, baseOptions);
      }
export type EditCommentMutationHookResult = ReturnType<typeof useEditCommentMutation>;
export type EditCommentMutationResult = Apollo.MutationResult<EditCommentMutation>;
export type EditCommentMutationOptions = Apollo.BaseMutationOptions<EditCommentMutation, EditCommentMutationVariables>;
export const EditPostDocument = gql`
    mutation EditPost($postId: String!, $post: PostInput!) {
  editPost(postId: $postId, newPost: $post) {
    message
    success
  }
}
    `;
export type EditPostMutationFn = Apollo.MutationFunction<EditPostMutation, EditPostMutationVariables>;

/**
 * __useEditPostMutation__
 *
 * To run a mutation, you first call `useEditPostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditPostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editPostMutation, { data, loading, error }] = useEditPostMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *      post: // value for 'post'
 *   },
 * });
 */
export function useEditPostMutation(baseOptions?: Apollo.MutationHookOptions<EditPostMutation, EditPostMutationVariables>) {
        return Apollo.useMutation<EditPostMutation, EditPostMutationVariables>(EditPostDocument, baseOptions);
      }
export type EditPostMutationHookResult = ReturnType<typeof useEditPostMutation>;
export type EditPostMutationResult = Apollo.MutationResult<EditPostMutation>;
export type EditPostMutationOptions = Apollo.BaseMutationOptions<EditPostMutation, EditPostMutationVariables>;
export const AddFollowerDocument = gql`
    mutation addFollower($userId: String!, $blogId: String!) {
  addFollower(userId: $userId, blogId: $blogId) {
    success
    message
  }
}
    `;
export type AddFollowerMutationFn = Apollo.MutationFunction<AddFollowerMutation, AddFollowerMutationVariables>;

/**
 * __useAddFollowerMutation__
 *
 * To run a mutation, you first call `useAddFollowerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddFollowerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addFollowerMutation, { data, loading, error }] = useAddFollowerMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      blogId: // value for 'blogId'
 *   },
 * });
 */
export function useAddFollowerMutation(baseOptions?: Apollo.MutationHookOptions<AddFollowerMutation, AddFollowerMutationVariables>) {
        return Apollo.useMutation<AddFollowerMutation, AddFollowerMutationVariables>(AddFollowerDocument, baseOptions);
      }
export type AddFollowerMutationHookResult = ReturnType<typeof useAddFollowerMutation>;
export type AddFollowerMutationResult = Apollo.MutationResult<AddFollowerMutation>;
export type AddFollowerMutationOptions = Apollo.BaseMutationOptions<AddFollowerMutation, AddFollowerMutationVariables>;
export const FollowersCountDocument = gql`
    query followersCount($_id: String!) {
  followersCount(_id: $_id)
}
    `;

/**
 * __useFollowersCountQuery__
 *
 * To run a query within a React component, call `useFollowersCountQuery` and pass it any options that fit your needs.
 * When your component renders, `useFollowersCountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFollowersCountQuery({
 *   variables: {
 *      _id: // value for '_id'
 *   },
 * });
 */
export function useFollowersCountQuery(baseOptions: Apollo.QueryHookOptions<FollowersCountQuery, FollowersCountQueryVariables>) {
        return Apollo.useQuery<FollowersCountQuery, FollowersCountQueryVariables>(FollowersCountDocument, baseOptions);
      }
export function useFollowersCountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FollowersCountQuery, FollowersCountQueryVariables>) {
          return Apollo.useLazyQuery<FollowersCountQuery, FollowersCountQueryVariables>(FollowersCountDocument, baseOptions);
        }
export type FollowersCountQueryHookResult = ReturnType<typeof useFollowersCountQuery>;
export type FollowersCountLazyQueryHookResult = ReturnType<typeof useFollowersCountLazyQuery>;
export type FollowersCountQueryResult = Apollo.QueryResult<FollowersCountQuery, FollowersCountQueryVariables>;
export const FollowingDocument = gql`
    query following($_id: String!) {
  following(_id: $_id) {
    _id
    name
  }
}
    `;

/**
 * __useFollowingQuery__
 *
 * To run a query within a React component, call `useFollowingQuery` and pass it any options that fit your needs.
 * When your component renders, `useFollowingQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFollowingQuery({
 *   variables: {
 *      _id: // value for '_id'
 *   },
 * });
 */
export function useFollowingQuery(baseOptions: Apollo.QueryHookOptions<FollowingQuery, FollowingQueryVariables>) {
        return Apollo.useQuery<FollowingQuery, FollowingQueryVariables>(FollowingDocument, baseOptions);
      }
export function useFollowingLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FollowingQuery, FollowingQueryVariables>) {
          return Apollo.useLazyQuery<FollowingQuery, FollowingQueryVariables>(FollowingDocument, baseOptions);
        }
export type FollowingQueryHookResult = ReturnType<typeof useFollowingQuery>;
export type FollowingLazyQueryHookResult = ReturnType<typeof useFollowingLazyQuery>;
export type FollowingQueryResult = Apollo.QueryResult<FollowingQuery, FollowingQueryVariables>;
export const FollowingCountDocument = gql`
    query followingCount($_id: String!) {
  followingCount(_id: $_id)
}
    `;

/**
 * __useFollowingCountQuery__
 *
 * To run a query within a React component, call `useFollowingCountQuery` and pass it any options that fit your needs.
 * When your component renders, `useFollowingCountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFollowingCountQuery({
 *   variables: {
 *      _id: // value for '_id'
 *   },
 * });
 */
export function useFollowingCountQuery(baseOptions: Apollo.QueryHookOptions<FollowingCountQuery, FollowingCountQueryVariables>) {
        return Apollo.useQuery<FollowingCountQuery, FollowingCountQueryVariables>(FollowingCountDocument, baseOptions);
      }
export function useFollowingCountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FollowingCountQuery, FollowingCountQueryVariables>) {
          return Apollo.useLazyQuery<FollowingCountQuery, FollowingCountQueryVariables>(FollowingCountDocument, baseOptions);
        }
export type FollowingCountQueryHookResult = ReturnType<typeof useFollowingCountQuery>;
export type FollowingCountLazyQueryHookResult = ReturnType<typeof useFollowingCountLazyQuery>;
export type FollowingCountQueryResult = Apollo.QueryResult<FollowingCountQuery, FollowingCountQueryVariables>;
export const FollowingIdsDocument = gql`
    query followingIds($_id: String!) {
  followingIds(_id: $_id)
}
    `;

/**
 * __useFollowingIdsQuery__
 *
 * To run a query within a React component, call `useFollowingIdsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFollowingIdsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFollowingIdsQuery({
 *   variables: {
 *      _id: // value for '_id'
 *   },
 * });
 */
export function useFollowingIdsQuery(baseOptions: Apollo.QueryHookOptions<FollowingIdsQuery, FollowingIdsQueryVariables>) {
        return Apollo.useQuery<FollowingIdsQuery, FollowingIdsQueryVariables>(FollowingIdsDocument, baseOptions);
      }
export function useFollowingIdsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FollowingIdsQuery, FollowingIdsQueryVariables>) {
          return Apollo.useLazyQuery<FollowingIdsQuery, FollowingIdsQueryVariables>(FollowingIdsDocument, baseOptions);
        }
export type FollowingIdsQueryHookResult = ReturnType<typeof useFollowingIdsQuery>;
export type FollowingIdsLazyQueryHookResult = ReturnType<typeof useFollowingIdsLazyQuery>;
export type FollowingIdsQueryResult = Apollo.QueryResult<FollowingIdsQuery, FollowingIdsQueryVariables>;
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(user: {email: $email, password: $password}) {
    accessToken
    user {
      email
      _id
      admin
    }
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, baseOptions);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const MeDocument = gql`
    query me {
  me {
    email
    _id
    admin
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const PostDocument = gql`
    query Post($id: String!) {
  post(postId: $id) {
    _id
    title
    content
    author {
      name
      _id
    }
  }
}
    `;

/**
 * __usePostQuery__
 *
 * To run a query within a React component, call `usePostQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function usePostQuery(baseOptions: Apollo.QueryHookOptions<PostQuery, PostQueryVariables>) {
        return Apollo.useQuery<PostQuery, PostQueryVariables>(PostDocument, baseOptions);
      }
export function usePostLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostQuery, PostQueryVariables>) {
          return Apollo.useLazyQuery<PostQuery, PostQueryVariables>(PostDocument, baseOptions);
        }
export type PostQueryHookResult = ReturnType<typeof usePostQuery>;
export type PostLazyQueryHookResult = ReturnType<typeof usePostLazyQuery>;
export type PostQueryResult = Apollo.QueryResult<PostQuery, PostQueryVariables>;
export const PostsDocument = gql`
    query posts {
  posts {
    title
    author {
      name
      _id
    }
    _id
  }
}
    `;

/**
 * __usePostsQuery__
 *
 * To run a query within a React component, call `usePostsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostsQuery({
 *   variables: {
 *   },
 * });
 */
export function usePostsQuery(baseOptions?: Apollo.QueryHookOptions<PostsQuery, PostsQueryVariables>) {
        return Apollo.useQuery<PostsQuery, PostsQueryVariables>(PostsDocument, baseOptions);
      }
export function usePostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostsQuery, PostsQueryVariables>) {
          return Apollo.useLazyQuery<PostsQuery, PostsQueryVariables>(PostsDocument, baseOptions);
        }
export type PostsQueryHookResult = ReturnType<typeof usePostsQuery>;
export type PostsLazyQueryHookResult = ReturnType<typeof usePostsLazyQuery>;
export type PostsQueryResult = Apollo.QueryResult<PostsQuery, PostsQueryVariables>;
export const RecentBlogPostsDocument = gql`
    query recentBlogPosts($_id: String!, $amount: Int!) {
  recentBlogPosts(_id: $_id, amount: $amount) {
    title
    content
  }
}
    `;

/**
 * __useRecentBlogPostsQuery__
 *
 * To run a query within a React component, call `useRecentBlogPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useRecentBlogPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRecentBlogPostsQuery({
 *   variables: {
 *      _id: // value for '_id'
 *      amount: // value for 'amount'
 *   },
 * });
 */
export function useRecentBlogPostsQuery(baseOptions: Apollo.QueryHookOptions<RecentBlogPostsQuery, RecentBlogPostsQueryVariables>) {
        return Apollo.useQuery<RecentBlogPostsQuery, RecentBlogPostsQueryVariables>(RecentBlogPostsDocument, baseOptions);
      }
export function useRecentBlogPostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RecentBlogPostsQuery, RecentBlogPostsQueryVariables>) {
          return Apollo.useLazyQuery<RecentBlogPostsQuery, RecentBlogPostsQueryVariables>(RecentBlogPostsDocument, baseOptions);
        }
export type RecentBlogPostsQueryHookResult = ReturnType<typeof useRecentBlogPostsQuery>;
export type RecentBlogPostsLazyQueryHookResult = ReturnType<typeof useRecentBlogPostsLazyQuery>;
export type RecentBlogPostsQueryResult = Apollo.QueryResult<RecentBlogPostsQuery, RecentBlogPostsQueryVariables>;
export const RegisterDocument = gql`
    mutation Register($email: String!, $password: String!) {
  registerUser(user: {email: $email, password: $password}) {
    success
    message
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, baseOptions);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const UnapprovedPostsDocument = gql`
    query unapprovedPosts {
  posts(approved: false) {
    _id
    content
    title
    approved
    author {
      name
    }
  }
}
    `;

/**
 * __useUnapprovedPostsQuery__
 *
 * To run a query within a React component, call `useUnapprovedPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useUnapprovedPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUnapprovedPostsQuery({
 *   variables: {
 *   },
 * });
 */
export function useUnapprovedPostsQuery(baseOptions?: Apollo.QueryHookOptions<UnapprovedPostsQuery, UnapprovedPostsQueryVariables>) {
        return Apollo.useQuery<UnapprovedPostsQuery, UnapprovedPostsQueryVariables>(UnapprovedPostsDocument, baseOptions);
      }
export function useUnapprovedPostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UnapprovedPostsQuery, UnapprovedPostsQueryVariables>) {
          return Apollo.useLazyQuery<UnapprovedPostsQuery, UnapprovedPostsQueryVariables>(UnapprovedPostsDocument, baseOptions);
        }
export type UnapprovedPostsQueryHookResult = ReturnType<typeof useUnapprovedPostsQuery>;
export type UnapprovedPostsLazyQueryHookResult = ReturnType<typeof useUnapprovedPostsLazyQuery>;
export type UnapprovedPostsQueryResult = Apollo.QueryResult<UnapprovedPostsQuery, UnapprovedPostsQueryVariables>;
export const UserIdDocument = gql`
    query UserId {
  userId
}
    `;

/**
 * __useUserIdQuery__
 *
 * To run a query within a React component, call `useUserIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserIdQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserIdQuery(baseOptions?: Apollo.QueryHookOptions<UserIdQuery, UserIdQueryVariables>) {
        return Apollo.useQuery<UserIdQuery, UserIdQueryVariables>(UserIdDocument, baseOptions);
      }
export function useUserIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserIdQuery, UserIdQueryVariables>) {
          return Apollo.useLazyQuery<UserIdQuery, UserIdQueryVariables>(UserIdDocument, baseOptions);
        }
export type UserIdQueryHookResult = ReturnType<typeof useUserIdQuery>;
export type UserIdLazyQueryHookResult = ReturnType<typeof useUserIdLazyQuery>;
export type UserIdQueryResult = Apollo.QueryResult<UserIdQuery, UserIdQueryVariables>;
export const UsersDocument = gql`
    query Users {
  users {
    email
  }
}
    `;

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useUsersQuery(baseOptions?: Apollo.QueryHookOptions<UsersQuery, UsersQueryVariables>) {
        return Apollo.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, baseOptions);
      }
export function useUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>) {
          return Apollo.useLazyQuery<UsersQuery, UsersQueryVariables>(UsersDocument, baseOptions);
        }
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersQueryResult = Apollo.QueryResult<UsersQuery, UsersQueryVariables>;
export const UsersPublicDocument = gql`
    query UsersPublic {
  users {
    email
  }
}
    `;

/**
 * __useUsersPublicQuery__
 *
 * To run a query within a React component, call `useUsersPublicQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersPublicQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersPublicQuery({
 *   variables: {
 *   },
 * });
 */
export function useUsersPublicQuery(baseOptions?: Apollo.QueryHookOptions<UsersPublicQuery, UsersPublicQueryVariables>) {
        return Apollo.useQuery<UsersPublicQuery, UsersPublicQueryVariables>(UsersPublicDocument, baseOptions);
      }
export function useUsersPublicLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UsersPublicQuery, UsersPublicQueryVariables>) {
          return Apollo.useLazyQuery<UsersPublicQuery, UsersPublicQueryVariables>(UsersPublicDocument, baseOptions);
        }
export type UsersPublicQueryHookResult = ReturnType<typeof useUsersPublicQuery>;
export type UsersPublicLazyQueryHookResult = ReturnType<typeof useUsersPublicLazyQuery>;
export type UsersPublicQueryResult = Apollo.QueryResult<UsersPublicQuery, UsersPublicQueryVariables>;