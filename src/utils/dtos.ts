export interface Category {
  forums: string[]
  name: string
  slug: string
  id: string
}

export interface Forum {
  categoryId: string
  description: string
  lastPostId?: string
  name: string
  slug: string
  threads?: string[]
  id: string
}

export interface Post {
  edited?: Edited
  publishedAt: number
  text: string
  threadId: string
  userId: string
  id?: string
  reactions?: Reactions
}

export type AddPost = Omit<Post, 'id' | 'userId' | 'publishedAt'>

export interface Edited {
  at: number
  by: string
  moderated: boolean
}

export interface Reactions {
  '❤️'?: Empty
  '\ud83d\udc4e'?: ReactionsClass
  '\ud83d\udc4d'?: Class
  '\ud83d\udca9'?: Purple
  '\ud83d\ude04'?: Fluffy
}

export interface Empty {
  Miej9zSGMRZKDvMXzfxjVOyv3RF3?: string
  '7uVPJS9GHoftN58Z2MXCYDqmNAh2'?: string
  jUjmgCurRRdzayqbRMO7aTG9X1G2?: string
}

export interface Class {
  NnooaWj4KHVxbhKwO1pEdfaQDsD2?: string
  f5xvKdIPQdSrUtT6i3UiHYttRXO2?: string
  Miej9zSGMRZKDvMXzfxjVOyv3RF3?: string
}

export interface ReactionsClass {
  Miej9zSGMRZKDvMXzfxjVOyv3RF3?: string
  VXjpr2WHa8Ux4Bnggym8QFLdv5C3?: string
}

export interface Purple {
  NnooaWj4KHVxbhKwO1pEdfaQDsD2: string
}

export interface Fluffy {
  jUjmgCurRRdzayqbRMO7aTG9X1G2: string
}

export interface Stats {
  postsCount: number
  threadsCount: number
  usersCount: number
  usersOnline: number
}

export interface Thread {
  contributors?: string[]
  firstPostId: string
  forumId: string
  lastPostAt: number
  lastPostId: string
  posts: string[]
  publishedAt: number
  slug: string
  title: string
  userId: string
  id: string
}

export interface AddThread {
  id: string
  forumId: string
  title: string
  userId: string
  publishedAt: number
}

export interface UpdateThread {
  id: string
  title: string
  text: string
}

export interface User {
  avatar: string
  email: string
  lastVisitAt: number
  name: string
  isModerator?: boolean
  registeredAt: number
  username: string
  usernameLower: string
  id: string
  bio?: string
  twitter?: string
  website?: string
  threads?: string[]
}
