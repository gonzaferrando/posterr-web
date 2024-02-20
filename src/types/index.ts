export type EntityId = {
    id: string
}

export type Post = EntityId & {
    author: string
    content: string
    createdAt: string
}

export type PostListResponse = Post;

export type PostFormData = {
    content: string
}