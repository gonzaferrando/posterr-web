import { FunctionComponent, useEffect, useState } from "react"
import postsApi from "../api/postsApi"
import { PostListResponse } from "../types"
import useDebounce from "../hooks/useDebounce"
import InfiniteScroll from "react-infinite-scroll-component"
import AddPost from "../components/AddPost"

const PAGE_INITIAL_SIZE = 15
const PAGE_ONSCROLL_SIZE = 20
const PAGE_NUMBER = 1

const Posts: FunctionComponent = (): JSX.Element => {
    const [searchKeywordValue, setSearchKeywordValue] = useState<
        string | undefined
    >()
    const [hasMore, setHasMore] = useState(true)
    const [pageSize, setPageSize] = useState<number>(PAGE_INITIAL_SIZE)
    const [pageNumber, setPageNumber] = useState<number>(PAGE_NUMBER)

    const debouncedKeyword = useDebounce<string | undefined>(
        searchKeywordValue,
        1000
    )

    const [result, setResult] = useState<PostListResponse[]>([])

    const fetchPosts = () => {
        const getPostsList = async () => {
            const response = await postsApi.search<PostListResponse[]>({
                pageSize: pageSize,
                pageNumber: pageNumber,
                keyword: debouncedKeyword
            })
            setHasMore(response.data.length > 0)
            setResult((prev) => [...prev, ...response.data])
        }
        getPostsList()
    }

    useEffect(() => {
        fetchPosts()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageSize, pageNumber])

    useEffect(() => {
        setPageSize(PAGE_INITIAL_SIZE)
        setPageNumber(PAGE_NUMBER)
        setResult([])
    }, [debouncedKeyword])

    return (
        <section className="p-5 bg-gray-100">
            <div>
                <AddPost
                    onPostCreated={() => {
                        setResult([])
                        fetchPosts()
                    }}
                />
            </div>
            <div className="my-4">
                <label
                    htmlFor="search_keyword"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                    Filter posts by this
                </label>
                <input
                    type="text"
                    id="search_keyword"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Doe"
                    required
                    onChange={(e) => setSearchKeywordValue(e.target.value)}
                    value={searchKeywordValue}
                />
            </div>
            <div className="grid grid-cols-1 mt-2">
                <InfiniteScroll
                    dataLength={result.length}
                    next={() => {
                        setPageNumber((prev) => prev + 1)
                        if (pageSize === PAGE_INITIAL_SIZE) {
                            setPageSize(PAGE_ONSCROLL_SIZE)
                        }
                    }}
                    hasMore={hasMore}
                    loader={<h4>Loading...</h4>}
                >
                    {result.map((post) => {
                        return (
                            <div
                                key={post.id}
                                className="border rounded-lg bg-white text-center m-2 md:mx-4 md:mb-4"
                            >
                                <div className="p-4">
                                    <p className="mb-4 text-xl text-neutral-600 dark:text-neutral-200">
                                        {post.content}
                                    </p>
                                </div>
                                <div className="border-t-2 text-sm border-neutral-100 px-6 py-3 dark:border-neutral-600 dark:text-neutral-50">
                                    <p>
                                        Posted on{" "}
                                        {new Date(
                                            post.createdAt
                                        ).toLocaleDateString("en-us", {
                                            year: "numeric",
                                            month: "short",
                                            day: "numeric",
                                            hour: "numeric",
                                            minute: "numeric"
                                        })}
                                    </p>
                                    <p>{post.author}</p>
                                </div>
                            </div>
                        )
                    })}
                </InfiniteScroll>
            </div>
        </section>
    )
}

export default Posts
