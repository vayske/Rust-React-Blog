import type { PostSummary } from '../types'
import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import Profile from './Profile'

export default function PostList() {
  const [posts, setPosts] = useState<PostSummary[]>([])

  useEffect(() => {
    fetch('/api/posts')
      .then(res => res.json())
      .then(data => setPosts(data))
  }, [])

  if (posts.length === 0) {
    return <p className="text-slate-500 text-center mt-20">还没有发布任何文章...</p>
  }

  return (
    <div className="space-y-12">
      <Profile />

      {posts.map((post) => (
        <Link to={`/post/${post.slug}`} key={post.slug} className="block group">
          <article>
            <h2 className="text-2xl font-semibold text-stone-900 group-hover:text-amber-600 transition-colors mb-3">
              {post.metadata.title}
            </h2>
            <div className="flex items-center gap-4 text-sm font-mono text-stone-500 mb-3">
              <span>{post.metadata.date}</span>
            </div>
            {post.metadata.tags && post.metadata.tags.length > 0 && (
              <div className="flex gap-2">
                {post.metadata.tags.map(tag => (
                  <span key={tag} className="text-xs text-stone-600 bg-stone-200/50 px-2 py-1 rounded">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </article>
        </Link>
      ))}
    </div>
  )
}
