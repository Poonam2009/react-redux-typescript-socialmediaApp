import { Link, useParams } from 'react-router';
import { useAppSelector } from '../../app/hooks';
import { selectPostById } from './postsSlice';
import { PostAuthor } from './PostAuthor';
import { TimeAgo } from '../../components/TimeAgo';
import { ReactionButtons } from './ReactionButtons';
import { selectCurrentUsername } from '../auth/authSlice';
export const SinglePostPage = () => {
  const { postId } = useParams();

  const post = useAppSelector((state) => selectPostById(state, postId!));
  const currentUsername = useAppSelector(selectCurrentUsername)!;

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    );
  }

  const canEdit = currentUsername === post.user;

  return (
    <section className="post">
      <h2>{post.title}</h2>
      <div>
        <PostAuthor userId={post.user} />
        <TimeAgo timestamp={post.date} />
      </div>
      <p className="post-content">{post.content}</p>
      <ReactionButtons post={post} />
      {canEdit && (
        <Link to={`/editPost/${post.id}`} className="button">
          Edit Post
        </Link>
      )}
    </section>
  );
};
