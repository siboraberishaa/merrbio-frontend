import { Link } from "react-router-dom"


const Checkout = () => {
    return (
        <>
          <section className="py-120">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-md-8 text-center">
                  <h1 className="mb-4 text-heading">Page Under Construction</h1>
                  <p className="mb-4 text-gray-500">
                    The checkout page is currently under construction. Please check back later.
                  </p>
                  <Link to="/" className="btn btn-main">
                    Back to Home
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </>
    )
}

export default Checkout