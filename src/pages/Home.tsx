import { FunctionComponent } from "react"

const Home: FunctionComponent = (): JSX.Element => {
    return (
        <section className="pt-10">
            <h1 className="text-center text-2xl">Welcome!</h1>
            <div className="text-center my-10 mx-10">
                <p className="text-lg">
                    Please feel free to explore posts by using our amazing
                    navigation bar!
                </p>
            </div>
        </section>
    )
}

export default Home
