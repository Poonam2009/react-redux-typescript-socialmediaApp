import { Navbar } from './components/Navbar';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router';
import { PostsMainPage } from './features/posts/PostsMainPage';
import { SinglePostPage } from './features/posts/SinglePostPage';
import { EditPostForm } from './features/posts/EditPostForm';
import { useAppSelector } from './app/hooks';
import { selectCurrentUsername } from './features/auth/authSlice';
import { LoginPage } from './features/auth/LoginPage';
import React from 'react';
import { UsersList } from './features/users/UsersList';
import { UserPage } from './features/users/UserPage';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const username = useAppSelector(selectCurrentUsername);
  if (!username) {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <Routes>
                  <Route path="/posts" element={<PostsMainPage />} />
                  <Route path="/posts/:postId" element={<SinglePostPage />} />
                  <Route path="/editPost/:postId" element={<EditPostForm />} />
                  <Route path="/users" element={<UsersList />} />
                  <Route path="/users/:userId" element={<UserPage />} />
                </Routes>
              </ProtectedRoute>
            }
          ></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
