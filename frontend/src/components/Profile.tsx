export default function Profile() {
  return (
    <section className="mb-16 flex flex-col sm:flex-row items-center sm:items-start gap-8 border-b border-stone-200 pb-12 mt-4">
      <img
        src="/avatar.jpg"
        alt="SinceL"
        className="w-28 h-28 rounded-full object-cover shadow-sm border-4 border-white shrink-0"
      />

      <div className="flex-1 text-center sm:text-left">
        <h1 className="text-3xl font-bold text-stone-900 mb-3 tracking-wide">
          SinceL
        </h1>
        <p className="text-amber-600 font-mono text-sm mb-4 font-semibold uppercase tracking-wider">
          Freelance Programmer // DevOps & Fullstack
        </p>

        <div className="text-stone-600 space-y-2 mb-6">
          <p>
            Hardcore gamer at heart. I spend my time building automated wonders in <strong>Minecraft (Create mod)</strong>,
            dying in <strong>Dark Souls</strong>, and chasing high scores in rhythm games.
          </p>
          <p>
            Japanese Music Lover. My favorite singer is <strong>Isekaijoucho (ヰ世界情緒)</strong>.
          </p>
        </div>

        <div className="flex justify-center sm:justify-start gap-6 text-sm font-medium font-mono mt-2">
          {/* GitHub */}
          <a href="https://github.com/vayske" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-stone-400 hover:text-amber-600 transition-colors">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
            GitHub
          </a>

          {/* Twitter (小鸟图标) */}
          <a href="https://twitter.com/Rumina_L" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-stone-400 hover:text-amber-600 transition-colors">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
            </svg>
            Twitter
          </a>

          {/* Bilibili */}
          <a href="https://space.bilibili.com/2481719" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-stone-400 hover:text-amber-600 transition-colors">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M17.813 4.653h.854c1.51.054 2.769.578 3.773 1.574 1.004.995 1.524 2.249 1.56 3.76v7.36c-.036 1.51-.556 2.769-1.56 3.773s-2.262 1.524-3.773 1.56H5.333c-1.51-.036-2.769-.556-3.773-1.56S.036 18.858 0 17.347v-7.36c.036-1.511.556-2.765 1.56-3.76 1.004-.996 2.262-1.52 3.773-1.574h.774l-1.174-1.12a1.234 1.234 0 0 1-.373-.906c0-.356.124-.658.373-.907l.027-.027c.267-.249.573-.373.92-.373.347 0 .653.124.92.373L9.653 4.44c.071.071.134.142.187.213h4.267a.836.836 0 0 1 .16-.213l2.853-2.747c.267-.249.573-.373.92-.373.347 0 .662.124.947.373.284.249.426.551.426.907s-.142.658-.426.906l-1.174 1.147zm-8.693 7.146c-1.191 0-2.16.974-2.16 2.174 0 1.191.969 2.16 2.16 2.16 1.191 0 2.16-.969 2.16-2.16 0-1.2-.969-2.174-2.16-2.174zm5.76 0c-1.191 0-2.16.974-2.16 2.174 0 1.191.969 2.16 2.16 2.16 1.191 0 2.16-.969 2.16-2.16 0-1.2-.969-2.174-2.16-2.174z" />
            </svg>
            Bilibili
          </a>
        </div>
      </div>
    </section>
  )
}
