const Home = () => {
    return<body className="padding" style={{"background": "linear-gradient(to right, #FFEEEE, #ffffff)","height": "881px"}}>
        <div className="p-md-5 mb-4 text-white rounded bg-dark col-8 d-flex ">
            <div className="col-md-12 px-0">
                <h1 className="display-6 fst-italic">“This above all: to thine own self be true, And it must follow, as the night the day,
                    Thou canst not then be false to any man.”</h1>
                <p className="lead my-3">― William Shakespeare, Hamlet</p>
            </div>

        </div>
        <div className="row ">
            <div className=" p-md-5 mb-4 text-danger rounded bg-warning col-4">
                <div className="col-md-12 px-0">
                    <h1 className="display-4 fst-italic">“I love you like a fat kid loves cake!”</h1>
                    <p className="lead my-3">― Scott Adams</p>
                </div>
            </div>
            <div className=" p-md-5 mb-4 text-info rounded bg-success col-7" style={{"margin-left":"20px"}}>
                <div className="col-md-12 px-0">
                    <h1 className="display-4 fst-italic">
                        Do You love food? So do I!!!</h1>
                    <p className="lead my-3">― M.e.</p>
                </div>
            </div>
        </div>
    </body>
}
export default Home;