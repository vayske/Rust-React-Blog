import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import ReactMarkdown from 'react-markdown'
import type { PostMetadata } from '../types'

export default function PostDetail() {
  const { slug } = useParams<{ slug: string }>()
  const [content, setContent] = useState('')
  const [metadata, setMetadata] = useState<PostMetadata | null>(null)

  // 当组件挂载或 slug 变化时，自己去拉取数据
  useEffect(() => {
    window.scrollTo(0, 0); // 切换文章时自动回到顶部
    fetch(`/api/posts/${slug}`)
      .then(res => res.json())
      .then(data => {
        setContent(data.content)
        setMetadata(data.metadata)
      })
  }, [slug])

  if (!metadata) {
    return <div className="text-center text-slate-500 mt-20">加载中...</div>
  }

  return (
    <div className="animate-in fade-in duration-500">
      <header className="mb-14 border-b border-stone-200 pb-10 mt-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-stone-900 mb-6 tracking-wide">
          {metadata.title}
        </h1>
        <div className="flex justify-center items-center gap-6 text-stone-500 font-mono text-sm">
          <span>{metadata.date}</span>
        </div>
        {metadata.tags && metadata.tags.length > 0 && (
          <div className="flex justify-center gap-3 mt-6">
            {metadata.tags.map(tag => (
              <span key={tag} className="px-3 py-1 bg-stone-100 text-stone-600 text-xs rounded-full border border-slate-700/50">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </header>

      <ReactMarkdown
        components={{
          h2: ({ node, ...props }) => <h2 className="text-2xl font-semibold text-stone-800 mt-12 mb-6" {...props} />,
          h3: ({ node, ...props }) => <h3 className="text-xl font-medium text-stone-700 mt-8 mb-4" {...props} />,
          p: ({ node, ...props }) => <p className="mb-6 text-lg leading-loose text-stone-700 font-light" {...props} />,
          a: ({ node, ...props }) => <a className="text-amber-600 hover:text-amber-500 underline underline-offset-4 decoration-amber-600/30" {...props} />,
          strong: ({ node, ...props }) => <strong className="font-semibold text-stone-900 bg-stone-200/30 px-1 rounded" {...props} />,
          blockquote: ({ node, ...props }) => (
            <blockquote
              className="border-l-4 border-amber-500 bg-stone-100 px-6 py-4 my-8 rounded-r-lg shadow-sm [&>p]:m-0 [&>p]:text-stone-500 [&>p]:italic [&>p]:text-base"
              {...props}
            />
          ),
          code: ({ node, className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || '')
            return !match ? (
              <code className="bg-stone-200/60 text-amber-700 px-1.5 py-0.5 rounded font-mono text-sm" {...props}>
                {children}
              </code>
            ) : (
              <code className={className} {...props}>{children}</code>
            )
          },
          img: ({ node, ...props }) => (
            <img
              {...props}
              className="block max-h-[70vh] w-auto mx-auto rounded-lg shadow-xl border border-stone-200 my-10 object-contain"
              loading="lazy"
            />
          )
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
