import { Link } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchPosts, selectAllPosts, selectPostsError, selectPostsStatus } from './postsSlice';
import { PostAuthor } from './PostAuthor';
import { TimeAgo } from '../../components/TimeAgo';
import { ReactionButtons } from './ReactionButtons';
import React, { useEffect } from 'react';
import {Spinner} from '../../components/Spinner'
import type { Post } from './postsSlice';


interface PostExcerptProps {
  post: Post
}

function PostExcerpt({ post }: PostExcerptProps) {
  return (
    <article className="post-excerpt" key={post.id}>
      <h3>
        <Link to={`/posts/${post.id}`}>{post.title}</Link>
      </h3>
      <div>
        <PostAuthor userId={post.user} />
        <TimeAgo timestamp={post.date} />
      </div>
      <p className="post-content">{post.content.substring(0, 100)}</p>
      <ReactionButtons post={post} />
    </article>
  )
}

export const PostsList = () => {
  const posts = useAppSelector(selectAllPosts);
  const dispatch = useAppDispatch();
  const postStatus = useAppSelector(selectPostsStatus);
  const postsError = useAppSelector(selectPostsError);
  

  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchPosts())
    }
  }, [postStatus, dispatch])

  let content: React.ReactNode

  if (postStatus === 'pending') {
    content = <Spinner text="Loading..." />
  } else if (postStatus === 'succeeded') {
    const orderedPosts = posts
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date))

    content = orderedPosts.map(post => (
      <PostExcerpt key={post.id} post={post} />
    ))
  } else if (postStatus === 'rejected') {
    content = <div>{postsError}</div>
  }

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {content}
    </section>
  );
};







// import { Link } from 'react-router';
// import { useAppDispatch, useAppSelector } from '../../app/hooks';
// import { fetchPosts, selectAllPosts, selectPostsError, selectPostsStatus, type Post } from './postsSlice';
// import { PostAuthor } from './PostAuthor';
// import { TimeAgo } from '../../components/TimeAgo';
// import { ReactionButtons } from './ReactionButtons';
// import React, { useEffect } from 'react';
// import { Spinner } from '../../components/Spinner';

// interface PostExcerptProps {
//   post: Post
// }

// function PostExcerpt({ post }: PostExcerptProps) {
//   return (
//     <article className="post-excerpt" key={post.id}>
//       <h3>
//         <Link to={`/posts/${post.id}`}>{post.title}</Link>
//       </h3>
//       <div>
//         <PostAuthor userId={post.user} />
//         <TimeAgo timestamp={post.date} />
//       </div>
//       <p className="post-content">{post.content.substring(0, 100)}</p>
//       <ReactionButtons post={post} />
//     </article>
//   )
// }

// export const PostsList = () => {
//   const dispatch = useAppDispatch()
//   const posts = useAppSelector(selectAllPosts)
//   const postStatus = useAppSelector(selectPostsStatus)
//   const postsError = useAppSelector(selectPostsError)

//   useEffect(() => {
//     if (postStatus === 'idle') {
//       dispatch(fetchPosts())
//     }
//   }, [postStatus, dispatch])

//   let content: React.ReactNode

//   if (postStatus === 'pending') {
//     content = <Spinner text="Loading..." />
//   } else if (postStatus === 'succeeded') {
//     // Sort posts in reverse chronological order by datetime string
//     const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))

//     content = orderedPosts.map((post) => <PostExcerpt key={post.id} post={post} />)
//   } else if (postStatus === 'rejected') {
//     content = <div>{postsError}</div>
//   }

//   return (
//     <section className="posts-list">
//       <h2>Posts</h2>
//       {content}
//     </section>
//   )
// }
