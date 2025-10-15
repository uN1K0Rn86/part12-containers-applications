db = db.getSiblingDB('the_database')

console.log(db)

db.createUser({
  user: 'the_username',
  pwd: 'the_password',
  roles: [
    {
      role: 'dbOwner',
      db: 'the_database',
    },
  ],
})

try {
  db.createCollection('users')
  db.createCollection('blogs')
  console.log('collections')
} catch (e) {
  console.log(e)
}

const userId = db.users.insertOne({
  username: 'testuser',
  name: 'Test User',
  passwordHash: '$2b$10$abcdefghijklmnopqrstuv', // dummy hash
  blogs: [],
}).insertedId
console.log('user created', userId)

const blogs = [
  {
    title: 'Understanding Docker Compose',
    author: 'Test User',
    url: 'https://example.com/docker-compose',
    likes: 15,
    user: userId,
  },
  {
    title: 'A Deep Dive into MongoDB',
    author: 'Test User',
    url: 'https://example.com/mongodb-guide',
    likes: 20,
    user: userId,
  },
  {
    title: 'Node.js Tips for Beginners',
    author: 'Test User',
    url: 'https://example.com/nodejs-tips',
    likes: 12,
    user: userId,
  },
  {
    title: 'Mastering Express Middleware',
    author: 'Test User',
    url: 'https://example.com/express-middleware',
    likes: 8,
    user: userId,
  },
  {
    title: 'Deploying Apps with Nginx and Docker',
    author: 'Test User',
    url: 'https://example.com/nginx-docker-deploy',
    likes: 25,
    user: userId,
  },
]

const blogInsert = db.blogs.insertMany(blogs)
if (blogInsert) {
  console.log('blogs inserted')
}

const blogIds = blogInsert.insertedIds ? Object.values(blogInsert.insertedIds) : []
console.log('blog ids', blogIds)

try {
  db.users.updateOne(
    { _id: userId },
    { $set: { blogs: blogIds } }
  )
  console.log('user bloglist updated')
} catch (e) {
  console.log(e)
}
