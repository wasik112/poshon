import { useEffect, useState } from 'react';
import { subscribePosts } from '../services/posts.js';

// Live blog posts from the `posts` collection.
export function usePosts() {
  const [posts, setPosts] = useState([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let unsubscribe = () => {};
    try {
      unsubscribe = subscribePosts(
        (list) => { setPosts(list); setReady(true); },
        () => setReady(true)
      );
    } catch {
      setReady(true);
    }
    return () => unsubscribe();
  }, []);

  return { posts, ready };
}
