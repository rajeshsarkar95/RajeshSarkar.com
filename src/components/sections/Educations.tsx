export const educations = [
  {
    id: '1',
    institution: 'Uttarakhand University',
    degree: 'Bachelor of Computer Applications (BCA)',
    status: 'Currently pursuing',
    current: true,
    description:
      'Building a strong foundation in computer science and full-stack engineering, with a focus on scalable, high-performance web applications. I care about clean architecture, optimized backend systems, responsive interfaces, and code that stays maintainable as projects grow.',
    highlights: [
      'Practicing data structures & algorithms weekly in C++ and JavaScript',
      'Studying system design: scalability, caching, load balancing, database design',
      'Building full-stack projects with React, Node.js, REST APIs, SQL and NoSQL',
      'Learning how operating systems, networks, and databases work under the hood',
    ],
    subjects: [
      'Data Structures & Algorithms',
      'System Design',
      'DBMS & SQL',
      'Operating Systems',
      'Computer Networks',
      'OOP',
      'Software Engineering',
      'Web Technologies',
    ],
  },
  {
    id: '2',
    institution: 'AK Inter College',
    degree: 'Intermediate, Class 12th (Science Stream)',
    status: 'Completed',
    description:
      'Completed the Science stream with a strong base in Physics, Chemistry, and Mathematics. Built a lasting interest in numerical problem-solving and analytical thinking, performing consistently well in Mathematics and Physics.',
    highlights: [
      'Developed strong logical reasoning through advanced Mathematics',
      'Applied theory in laboratory experiments and assignments',
      'Discovered programming and chose a career in software',
    ],
    subjects: ['Physics', 'Chemistry', 'Mathematics', 'English', 'Computer Basics'],
  },
  {
    id: '3',
    institution: 'CGS Inter College',
    degree: 'High School, Class 10th (Science Stream)',
    status: 'Completed',
    description:
      'Completed High School in the Science stream with a solid academic foundation. Built analytical and problem-solving skills through consistent work in Mathematics and Physics, and took an active part in laboratory work.',
    highlights: [
      'Built conceptual clarity in core science and mathematics',
      'Participated in lab experiments and school academic activities',
    ],
    subjects: ['Physics', 'Chemistry', 'Mathematics', 'Science', 'English'],
  },
]

export const stats = [
  { value: '8', label: 'Key Class 12 math chapters' },
  { value: '3', label: 'Academic stages' },
  { value: '4', label: 'Core focus areas' },
  { value: 'Daily', label: 'Practice habit' },
]

// progress is a rough self-assessment (0–100). Edit to match your real level.
export const focusAreas = [
  {
    title: 'Data Structures & Algorithms',
    desc: 'Arrays, linked lists, stacks, queues, trees, graphs, heaps, hashing, recursion, dynamic programming, sorting and searching, with Big-O analysis.',
    tags: ['Trees & Graphs', 'Dynamic Programming', 'Hashing', 'Big-O'],
    progress: 60,
    featured: true,
  },
  {
    title: 'System Design',
    desc: 'Designing scalable systems: load balancing, caching, sharding and replication, message queues, rate limiting, and API design.',
    tags: ['Scalability', 'Caching', 'Sharding', 'Queues'],
    progress: 40,
    featured: true,
  },
  {
    title: 'Databases',
    desc: 'Relational modelling, normalization, indexing, transactions, query optimization, and choosing between SQL and NoSQL.',
    tags: ['SQL', 'Indexing', 'ACID', 'MongoDB'],
    progress: 65,
  },
  {
    title: 'Core CS Fundamentals',
    desc: 'Operating systems, computer networks, OOP principles, and design patterns that keep code reliable and easy to extend.',
    tags: ['OS', 'Networking', 'OOP', 'Patterns'],
    progress: 55,
  },
]

// importance: 1 = basic, 2 = important, 3 = very important (high exam weightage)
export const mathChapters = [
  { title: 'Matrices', importance: 1, topics: ['Types of matrices', 'Matrix operations', 'Transpose', 'Inverse of matrix'] },
  { title: 'Determinants', importance: 3, topics: ['Properties', 'Area of triangle', 'Solving linear equations'] },
  { title: 'Continuity & Differentiability', importance: 3, topics: ['Continuity', 'Differentiation', 'Chain rule', 'Implicit differentiation'] },
  { title: 'Applications of Derivatives', importance: 3, topics: ['Increasing/decreasing functions', 'Maxima & minima', 'Tangents and normals'] },
  { title: 'Integrals', importance: 3, topics: ['Indefinite integration', 'Integration methods', 'Definite integrals'] },
  { title: 'Vector Algebra', importance: 2, topics: ['Vectors', 'Dot product', 'Cross product'] },
  { title: 'Three-Dimensional Geometry', importance: 3, topics: ['Direction cosines', 'Lines', 'Planes', 'Angles and distances'] },
  { title: 'Probability', importance: 3, topics: ['Conditional probability', "Bayes' theorem", 'Random variables', 'Probability distributions'] },
]

const importanceLabel = ['Standard', 'Basic', 'Important', 'Very important']

function Stars({ level }: { level: number }) {
  if (!level) return null
  return (
    <span
      className="inline-flex gap-0.5 shrink-0"
      role="img"
      aria-label={`Importance: ${level} of 3 stars`}
    >
      {[1, 2, 3].map((n) => (
        <svg
          key={n}
          width="13"
          height="13"
          viewBox="0 0 20 20"
          aria-hidden="true"
          className={n <= level ? 'text-[var(--accent)]' : 'text-[var(--border)]'}
          fill="currentColor"
        >
          <path d="M10 1.5l2.6 5.5 6 .8-4.4 4.2 1.1 6-5.3-2.9-5.3 2.9 1.1-6L1.4 7.8l6-.8L10 1.5z" />
        </svg>
      ))}
    </span>
  )
}

export default function EducationSection() {
  return (
    <section id="education" aria-labelledby="edu-heading" className="c-section">
      <style>{`
        .edu-card{position:relative;border-radius:.875rem;background:var(--surface);
          border:1px solid var(--border);transition:border-color .25s}
        .edu-card:hover{border-color:var(--accent)}
        .edu-current{border-top:3px solid var(--accent)}
        .edu-bar{height:4px;border-radius:999px;background:var(--border);overflow:hidden}
        .edu-bar > i{display:block;height:100%;border-radius:inherit;background:var(--accent)}
        .edu-card{overflow-wrap:anywhere}
        .edu-line{position:absolute;left:14px;top:8px;bottom:8px;width:1px;background:var(--border)}
        @media (min-width:640px){.edu-line{left:22px}}
      `}</style>

      <div className="c-container">
        <div className="text-center mb-10 sm:mb-14 reveal">
          <h2 id="edu-heading" className="c-section-title">
            My <span className="c-gradient-text">Education</span>
          </h2>
          <p className="c-section-desc">
            My academic background and continuous learning journey.
          </p>
        </div>

        {/* Stats strip */}
        <div className="max-w-[800px] mx-auto mb-12 sm:mb-16 reveal">
          <div
            className="grid grid-cols-2 sm:grid-cols-4 gap-px rounded-[.875rem] overflow-hidden border border-[var(--border)]"
            style={{ background: 'var(--border)' }}
          >
            {stats.map((s) => (
              <div key={s.label} className="py-4 sm:py-5 px-3 sm:px-4 text-center bg-[var(--surface)]">
                <div className="font-syne text-xl sm:text-2xl font-bold text-[var(--text)]">{s.value}</div>
                <div className="text-[11px] sm:text-xs text-[var(--text2)] mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="relative max-w-[800px] mx-auto" role="list" aria-label="Education timeline">
          <div className="edu-line" aria-hidden="true" />

          {educations.map((e, i) => (
            <div
              key={e.id}
              role="listitem"
              className={`relative pl-[40px] sm:pl-[70px] mb-8 sm:mb-10 last:mb-0 reveal reveal-d${i + 1}`}
            >
              <div
                className={`absolute left-[5px] sm:left-[14px] top-3 w-[18px] h-[18px] rounded-full border-2 border-[var(--accent)] flex items-center justify-center ${
                  e.current ? 'bg-[var(--accent)]' : 'bg-[var(--bg)]'
                }`}
                aria-hidden="true"
              >
                {e.current && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
              </div>

              <div className={`edu-card p-5 sm:p-7 ${e.current ? 'edu-current' : ''}`}>
                <div className="flex flex-wrap justify-between items-start gap-3 mb-1">
                  <h3 className="font-syne text-lg sm:text-xl font-bold text-[var(--text)]">{e.institution}</h3>
                </div>

                <div className="flex flex-wrap items-center gap-3 mb-5">
                  <p className="text-sm text-[var(--accent)] font-medium">{e.degree}</p>
                  <span
                    className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${
                      e.current
                        ? 'bg-[var(--accent)] text-white'
                        : 'border border-[var(--border)] text-[var(--text2)]'
                    }`}
                  >
                    {e.status}
                  </span>
                </div>

                <p className="text-sm text-[var(--text2)] leading-relaxed mb-5 max-w-[62ch]">
                  {e.description}
                </p>

                <ul className="mb-5 sm:mb-6 space-y-2.5 border-t border-[var(--border)] pt-4 sm:pt-5">
                  {e.highlights.map((h) => (
                    <li key={h} className="flex gap-3 text-sm text-[var(--text2)] leading-relaxed">
                      <svg
                        className="mt-[3px] shrink-0 text-[var(--accent)]"
                        width="14"
                        height="14"
                        viewBox="0 0 16 16"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path
                          d="M3 8.5l3.2 3L13 4.5"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      {h}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2" aria-label="Key subjects">
                  {e.subjects.map((s) => (
                    <span
                      key={s}
                      className="text-xs px-3 py-1.5 rounded-md border border-[var(--border)] text-[var(--text)]"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Class 12th important mathematics (single card) */}
        <div className="max-w-[800px] mx-auto mt-16 sm:mt-24 reveal">
          <h3 className="font-syne text-xl sm:text-2xl font-bold text-[var(--text)] text-center mb-2">
            Class 12th <span className="c-gradient-text">Important Math</span>
          </h3>
          <p className="text-sm text-[var(--text2)] text-center mb-6 sm:mb-8 px-2">
            The most important Class 12th mathematics chapters. Stars show how heavily each one
            counts in exams.
          </p>

          <div className="edu-card edu-current p-5 sm:p-7">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 sm:pb-5 border-b border-[var(--border)]">
              <div>
                <h4 className="font-syne text-lg font-bold text-[var(--text)]">Mathematics</h4>
                <p className="text-xs text-[var(--text2)] mt-0.5">
                  {mathChapters.length} key chapters
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs text-[var(--text2)]">
                <Stars level={3} />
                <span>= highest weightage</span>
              </div>
            </div>

            <ul className="divide-y divide-[var(--border)]">
              {mathChapters.map((c) => (
                <li key={c.title} className="py-4 sm:py-5 last:pb-0">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <h5 className="font-syne text-[15px] font-bold text-[var(--text)] leading-snug">
                      {c.title}
                    </h5>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="hidden sm:inline text-[11px] text-[var(--text2)]">
                        {importanceLabel[c.importance]}
                      </span>
                      <Stars level={c.importance} />
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {c.topics.map((t) => (
                      <span
                        key={t}
                        className="text-xs px-2.5 py-1 rounded-md border border-[var(--border)] text-[var(--text2)]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Learning focus */}
        <div className="max-w-[800px] mx-auto mt-16 sm:mt-24 reveal">
          <h3 className="font-syne text-xl sm:text-2xl font-bold text-[var(--text)] text-center mb-2">
            Beyond the <span className="c-gradient-text">Classroom</span>
          </h3>
          <p className="text-sm text-[var(--text2)] text-center mb-8 sm:mb-10 px-2">
            What I study every week to grow as an engineer.
          </p>

          <div className="grid grid-cols-1 gap-4 sm:gap-5 sm:grid-cols-2">
            {focusAreas.map((f) => (
              <div key={f.title} className={`edu-card p-5 sm:p-6 ${f.featured ? 'edu-current' : ''}`}>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h4 className="font-syne text-base font-bold text-[var(--text)]">{f.title}</h4>
                  {f.featured && (
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[var(--accent)] text-white shrink-0">
                      Priority
                    </span>
                  )}
                </div>
                <p className="text-sm text-[var(--text2)] leading-relaxed mb-4">{f.desc}</p>

                <div className="flex flex-wrap gap-2 mb-5">
                  {f.tags.map((t) => (
                    <span
                      key={t}
                      className="font-mono text-[11px] px-2.5 py-1 rounded-md border border-[var(--border)] text-[var(--text2)]"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-xs text-[var(--text2)] mb-1.5">
                  <span>Learning progress</span>
                  <span className="font-mono">{f.progress}%</span>
                </div>
                <div
                  className="edu-bar"
                  role="progressbar"
                  aria-valuenow={f.progress}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={`${f.title} progress`}
                >
                  <i style={{ width: `${f.progress}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}