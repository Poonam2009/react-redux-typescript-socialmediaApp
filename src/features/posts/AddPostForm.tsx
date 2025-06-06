import type React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
// import { nanoid } from '@reduxjs/toolkit';
// import { postAdded } from './postsSlice';
// import type { HtmlHTMLAttributes } from 'react';
// import { selectAllUsers } from '../users/usersSlice';
import { selectCurrentUsername } from '../auth/authSlice';
// import { selectAllUsers } from '../users/usersSlice';

interface AddPostFormFields extends HTMLFormControlsCollection {
  postTitle: HTMLInputElement;
  postContent: HTMLTextAreaElement;
  postAuthor: HTMLElement;
}

interface AddPostFormElements extends HTMLFormElement {
  readonly elements: AddPostFormFields;
}

export const AddPostForm = () => {
  const dispatch = useAppDispatch();
  // const users = useAppSelector(selectAllUsers);
  const userId = useAppSelector(selectCurrentUsername)!;

  const handleSubmit = (e: React.FormEvent<AddPostFormElements>) => {
    e.preventDefault();
    const { elements } = e.currentTarget;
    const title = elements.postTitle.value;
    const content = elements.postContent.value;
    console.log('Values: ', { title, content });
    // const newPost = {
    //   id: nanoid(),
    //   title,
    //   content,
    // };
    // dispatch(postAdded(newPost));
    dispatch(postAdded(title, content, userId));
    e.currentTarget.reset();
  };

  // const usersOptions = users.map((user) => (
  //   <option key={user.id} value={user.id}>
  //     {user.name}
  //   </option>
  // ));
  return (
    <section>
      <h2>Add a New Post</h2>
      <form className="post-form" onSubmit={handleSubmit}>
        <label htmlFor="postTitle">Post Title:</label>
        <input type="text" id="postTitle" defaultValue="" required />
        {/* <label htmlFor="postAuthor">Author:</label>
        <select id="postAuthor" name="postAuthor" required>
          <option value=""></option>
          {usersOptions}
        </select> */}
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          defaultValue=""
          required
        />
        <button className="">Save Post</button>
      </form>
    </section>
  );
};
