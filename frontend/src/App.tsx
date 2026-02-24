import PostList from './components/PostList'
import PostDetail from './components/PostDetail'
import { Routes, Route, Link } from 'react-router'

function App() {
  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 p-8 flex justify-center font-sans">
      <div className="w-full max-w-3xl">

        <nav className="mb-12 flex items-center justify-between border-b border-stone-200 pb-4">
          <Link
            to="/"
            className="text-2xl font-bold text-stone-900 tracking-widest hover:text-amber-600 transition-colors"
          >
            SinceL
          </Link>
        </nav>

        <Routes>
          <Route path="/" element={<PostList />} />
          <Route path="/post/:slug" element={<PostDetail />} />
        </Routes>

      </div>
    </div>
  )
}

export default App
