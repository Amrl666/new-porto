import { createClient } from '@sanity/client'
import { config } from 'dotenv'
import { resolve } from 'path'

// Load .env.local file
config({ path: resolve(process.cwd(), '.env.local') })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2023-11-22',
  token: process.env.SANITY_API_SEEDER,
  useCdn: false,
})

console.log('Configuration:')
console.log('   Project ID:', process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'NOT FOUND')
console.log('   Dataset:', process.env.NEXT_PUBLIC_SANITY_DATASET || 'NOT FOUND')
console.log('   Token:', process.env.SANITY_API_SEEDER ? 'Loaded' : 'NOT FOUND')
console.log('')

if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || !process.env.SANITY_API_SEEDER) {
  console.error('Error: Missing  required environment variables')
  console.error('   Make sure .env.local contains:')
  console.error('   - NEXT_PUBLIC_SANITY_PROJECT_ID')
  console.error('   - SANITY_API_SEEDER')
  process.exit(1)
}

async function seed() {
  try {
    console.log('Starting seeding process...\n')

    // 1. Create Author
    console.log('Creating author...')
    const author = await client.create({
      _type: 'author',
      name: 'Amirul Mabruri',
      slug: {
        _type: 'slug',
        current: 'amirul-mabruri',
      },
      bio: [
        {
          _type: 'block',
          _key: 'bio1',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'span1',
              text: 'Frontend Engineer dengan 2+ tahun pengalaman membangun aplikasi web modern.',
              marks: [],
            },
          ],
          markDefs: [],
        },
      ],
    })
    console.log('Author created:', author.name)

    // 2. Create Categories
    console.log('\nCreating categories...')
    const categoryWeb = await client.create({
      _type: 'category',
      title: 'Web Development',
      description: 'Articles about web development and modern frameworks',
    })
    const categoryJS = await client.create({
      _type: 'category',
      title: 'JavaScript',
      description: 'Tips and tricks about JavaScript and TypeScript',
    })
    console.log('Categories created')

    // 3. Create Technologies
    console.log('\nCreating technologies...')
    const techReact = await client.create({
      _type: 'technology',
      name: 'React',
      icon: '',
      category: 'Frontend Framework',
    })
    const techNext = await client.create({
      _type: 'technology',
      name: 'Next.js',
      icon: '',
      category: 'Frontend Framework',
    })
    const techTS = await client.create({
      _type: 'technology',
      name: 'TypeScript',
      icon: '',
      category: 'Programming Language',
    })
    const techTailwind = await client.create({
      _type: 'technology',
      name: 'Tailwind CSS',
      icon: '',
      category: 'CSS Framework',
    })
    console.log('Technologies created')

    // 4. Create UserInfo
    console.log('\nCreating user info...')
    void await client.create({
      _type: 'userInfo',
      name: 'Amirul',
      surname: 'Mabruri',
      title: 'Frontend Engineer',
      summary: 'Hi, I\'m a Frontend Engineer with 2+ years of experience building fast, reliable, and modern web applications with Next.js & TypeScript.',
      githubUrl: 'https://github.com/amiruldev20',
      linkedInUrl: 'https://linkedin.com/in/amirulmabruri',
    })
    console.log('User info created')

    // 5. Create Experience
    console.log('\nCreating experience entries...')
    await client.create({
      _type: 'experience',
      company: 'Tech Startup Indonesia',
      position: 'Frontend Engineer',
      location: 'Jakarta, Indonesia',
      startDate: '2022-01-01',
      workType: 'WFO',
      summary: 'Membangun dan maintain aplikasi web dengan Next.js, React, dan TypeScript. Bekerja dalam tim agile untuk mengembangkan fitur-fitur baru dan meningkatkan performa aplikasi.',
    })
    await client.create({
      _type: 'experience',
      company: 'Freelance Developer',
      position: 'Full Stack Developer',
      location: 'Remote',
      startDate: '2021-06-01',
      workType: 'Freelance',
      summary: 'Mengembangkan berbagai proyek web untuk klien lokal dan internasional. Menangani full-stack development dari frontend hingga backend.',
    })
    console.log('Experience entries created')

    // 6. Create Projects
    console.log('\nCreating projects...')
    await client.create({
      _type: 'project',
      name: 'E-Commerce Platform',
      slug: {
        _type: 'slug',
        current: 'ecommerce-platform',
      },
      description: 'Platform e-commerce modern dengan Next.js dan Stripe integration',
      longDescription: [
        {
          _type: 'block',
          _key: 'proj1',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'span1',
              text: 'Full-featured e-commerce platform dengan shopping cart, payment gateway, dan admin dashboard.',
              marks: [],
            },
          ],
          markDefs: [],
        },
      ],
      images: [],
      technologies: [
        { _type: 'reference', _ref: techNext._id },
        { _type: 'reference', _ref: techTS._id },
        { _type: 'reference', _ref: techTailwind._id },
      ],
      githubUrl: 'https://github.com/amiruldev20/ecommerce',
      liveUrl: 'https://ecommerce-demo.vercel.app',
      featured: true,
      completedAt: '2024-12-01',
    })
    await client.create({
      _type: 'project',
      name: 'Portfolio Website',
      slug: {
        _type: 'slug',
        current: 'portfolio-website',
      },
      description: 'Personal portfolio dengan Sanity CMS dan Next.js',
      longDescription: [
        {
          _type: 'block',
          _key: 'proj2',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'span2',
              text: 'Modern portfolio website dengan blog, project showcase, dan contact form.',
              marks: [],
            },
          ],
          markDefs: [],
        },
      ],
      images: [],
      technologies: [
        { _type: 'reference', _ref: techNext._id },
        { _type: 'reference', _ref: techReact._id },
        { _type: 'reference', _ref: techTailwind._id },
      ],
      githubUrl: 'https://github.com/amiruldev20/portfolio',
      liveUrl: 'https://amirulmabruri.dev',
      featured: true,
      completedAt: '2024-11-15',
    })
    console.log('Projects created')

    // 7. Create Blog Posts
    console.log('\nCreating blog posts...')
    await client.create({
      _type: 'post',
      title: 'Getting Started with Next.js 14',
      slug: {
        _type: 'slug',
        current: 'getting-started-nextjs-14',
      },
      author: {
        _type: 'reference',
        _ref: author._id,
      },
      categories: [
        { _type: 'reference', _ref: categoryWeb._id },
      ],
      publishedAt: '2024-01-15T10:00:00Z',
      body: [
        {
          _type: 'block',
          _key: 'block1',
          style: 'h2',
          children: [
            {
              _type: 'span',
              _key: 'span1',
              text: 'Introduction',
              marks: [],
            },
          ],
          markDefs: [],
        },
        {
          _type: 'block',
          _key: 'block2',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'span2',
              text: 'Next.js 14 membawa banyak fitur baru yang powerful untuk membangun aplikasi web modern. Dalam artikel ini, kita akan explore fitur-fitur utamanya.',
              marks: [],
            },
          ],
          markDefs: [],
        },
        {
          _type: 'block',
          _key: 'block3',
          style: 'h2',
          children: [
            {
              _type: 'span',
              _key: 'span3',
              text: 'Server Components',
              marks: [],
            },
          ],
          markDefs: [],
        },
        {
          _type: 'block',
          _key: 'block4',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'span4',
              text: 'React Server Components adalah game changer untuk performance. Dengan RSC, kita bisa fetch data langsung di component tanpa perlu client-side JavaScript.',
              marks: [],
            },
          ],
          markDefs: [],
        },
      ],
    })
    await client.create({
      _type: 'post',
      title: 'Mastering TypeScript for React',
      slug: {
        _type: 'slug',
        current: 'mastering-typescript-react',
      },
      author: {
        _type: 'reference',
        _ref: author._id,
      },
      categories: [
        { _type: 'reference', _ref: categoryJS._id },
      ],
      publishedAt: '2024-02-01T10:00:00Z',
      body: [
        {
          _type: 'block',
          _key: 'block1',
          style: 'h2',
          children: [
            {
              _type: 'span',
              _key: 'span1',
              text: 'Why TypeScript?',
              marks: [],
            },
          ],
          markDefs: [],
        },
        {
          _type: 'block',
          _key: 'block2',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'span2',
              text: 'TypeScript memberikan type safety yang membuat code kita lebih maintainable dan less error-prone. Mari kita pelajari best practices untuk React + TypeScript.',
              marks: [],
            },
          ],
          markDefs: [],
        },
      ],
    })
    console.log('Blog posts created')

    console.log('\nSeeding completed successfully!')
    console.log('\nSummary:')
    console.log('   - 1 Author')
    console.log('   - 2 Categories')
    console.log('   - 4 Technologies')
    console.log('   - 1 User Info')
    console.log('   - 2 Experience entries')
    console.log('   - 2 Projects')
    console.log('   - 2 Blog posts')
    console.log('\nData seeded successfully!')
  } catch (error) {
    console.error('Error seeding data:', error)
    process.exit(1)
  }
}

seed()
