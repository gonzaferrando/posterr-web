import { FormEvent, FunctionComponent, useState } from "react"
import postsApi from "../api/postsApi"
import { PostFormData } from "../types"

type Props = {
    onPostCreated: () => void
}

const AddPost: FunctionComponent<Props> = ({
    onPostCreated
}: Props): JSX.Element => {
    const [postContent, setPostContent] = useState<string>("")

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        postsApi
            .create<PostFormData>({ content: postContent })
            .then(() => {
                alert("Post created!")
                setPostContent("")
                onPostCreated()
            })
            .catch((e: Error) => {
                alert("Error ocurred: " + e.message)
            })
        event.preventDefault()
    }

    return (
        <div>
            Form to create a post. User information is hardcoded.
            <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
                <div className="mb-5">
                    <label>
                        Content:
                        <input
                            type="text"
                            value={postContent}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required
                            onChange={(e) => setPostContent(e.target.value)}
                        />
                    </label>
                </div>
                <div className="mb-5">
                    <button
                        type="submit"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        disabled={postContent.length === 0}
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )
}

export default AddPost
