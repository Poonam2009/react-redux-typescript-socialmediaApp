import { createSlice, nanoid, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import { userLoggedOut } from '../auth/authSlice';
import {createAppAsyncThunk} from '../../app/withTypes'
import { client } from '../../api/client';


export const fetchPosts = createAppAsyncThunk('posts/fetchPosts', async () => {
  const response = await client.get<Post[]>('/fakeApi/posts');
  return response.data;
},
{
  condition(argument, thunkApi) {
    const postsStatus = selectPostsStatus(thunkApi.getState())
    if (postsStatus !== 'idle') {
      return false
    }
  }
}
)

export interface Reactions {
  thumbsUp: number;
  tada: number;
  heart: number;
  rocket: number;
  eyes: number;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  user: string;
  date: string;
  reactions: Reactions;
}

export type ReactionName = keyof Reactions;

type PostUpdate = Pick<Post, 'id' | 'title' | 'content'>;
type NewPost = Pick<Post, 'title' | 'content' | 'user'>

export const addNewPost = createAppAsyncThunk(
  'posts/addNewPost',
  async (initialPost: NewPost) => {
    const response = await client.post<Post>('/fakeApi/posts', initialPost)
    return response.data
  }
)

const initialReactions: Reactions = {
  thumbsUp: 0,
  tada: 0,
  heart: 0,
  rocket: 0,
  eyes: 0,
};

export interface PostsState {
  posts: Post[];
  status: 'idle' | 'pending' | 'succeeded' | 'rejected';
  error: string | null
}

const initialState: PostsState = {
  posts: [],
  status: 'idle',
  error: null
}


export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    // postAdded: {
    //   reducer(state, action: PayloadAction<Post>) {
    //     state.posts.push(action.payload)
    //   },
    //   prepare(title: string, content: string, userId: string) {
    //     return {
    //       payload: {
    //         id: nanoid(),
    //         title,
    //         content,
    //         user: userId,
    //         date: new Date().toISOString(),
    //         reactions: initialReactions,
    //       },
    //     };
    //   },
    // },
    // postUpdated(state, action: PayloadAction<PostUpdate>) {
    //   const { id, title, content } = action.payload;
    //   const existingPost = state.posts.find((post) => post.id === id);
    //   if (existingPost) {
    //     existingPost.title = title;
    //     existingPost.content = content;
    //   }
    // },
    // reactionAdded(
    //   state,
    //   action: PayloadAction<{ postId: string; reaction: ReactionName }>
    // ) {
    //   const { postId, reaction } = action.payload;
    //   const existingPost = state.posts.find((post) => post.id === postId);
    //   if (existingPost) {
    //     existingPost.reactions[reaction]++;
    //   }
    // },
    postUpdated(state, action: PayloadAction<PostUpdate>) {
      const { id, title, content } = action.payload
      const existingPost = state.posts.find((post) => post.id === id)
      if (existingPost) {
        existingPost.title = title
        existingPost.content = content
      }
    },
    reactionAdded(state, action: PayloadAction<{ postId: string; reaction: ReactionName }>) {
      const { postId, reaction } = action.payload
      const existingPost = state.posts.find((post) => post.id === postId)
      if (existingPost) {
        existingPost.reactions[reaction]++
      }
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(userLoggedOut, () => {
      return initialState;
    })
    .addCase(fetchPosts.pending, (state) => {
      state.status = 'pending'
    })
    .addCase(fetchPosts.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.posts.push(...action.payload)
    })
    .addCase(fetchPosts.rejected, (state, action) => {
      state.status = 'rejected'
      state.error = action.error.message ?? 'Unknown Error'
    })
    .addCase(addNewPost.fulfilled, (state, action) => {
      state.posts.push(action.payload)
    })
  },
});
export const { postUpdated, reactionAdded } = postsSlice.actions;
export default postsSlice.reducer;

export const selectAllPosts = (state: RootState) => state.posts.posts;
export const selectPostById = (state: RootState, postId: string) =>
  state.posts.posts.find((post) => post.id === postId);

export const selectPostsStatus = (state: RootState) => state.posts.status;
export const selectPostsError = (state: RootState) => state.posts.error;

