import Api from "./Api"

const postsApi = {
    search: async <T>({pageSize, pageNumber, keyword} : { pageSize: number, pageNumber: number, keyword?: string }) => Api.get<T>('/posts',  { pageSize, pageNumber, keyword }),
    create: async <T>(body: T) => Api.post('/posts',  body)
}

export default postsApi