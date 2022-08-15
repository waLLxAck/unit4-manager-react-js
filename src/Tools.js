import React from 'react';
import ToolComponent from './components/ToolComponent';

import CSVImage from './img/mika-baumeister-Wpnoqo2plFA-unsplash.jpg';
import Base64Image from './img/base64 - encode, decode.png';

const Tools = () => {
    // state for tools
    const [tools, setTools] = React.useState([
        {
            title: "CSV Handler",
            description: "Creates Liquid code by assigning header elements to variables.",
            image: CSVImage,
            link: "/tools/csv-handler"
        },
        {
            title: "Base64 Converter",
            description: "Converts files to base64 strings and vice versa.",
            image: Base64Image,
            link: "/tools/base64-converter"
        }]);


    return (
        <main role="main">

            {/* <div id="myCarousel" className="carousel slide" data-ride="carousel">
                <ol className="carousel-indicators">
                    <li data-target="#myCarousel" data-slide-to="0" className=""></li>
                    <li data-target="#myCarousel" data-slide-to="1" className=""></li>
                    <li data-target="#myCarousel" data-slide-to="2" className="active"></li>
                </ol>
                <div className="carousel-inner">
                    <div className="carousel-item">
                        <img className="first-slide" src="" alt="First slide" />
                        <div className="container">
                            <div className="carousel-caption text-left">
                                <h1>Example headline.</h1>
                                <p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p>
                                <p><a className="btn btn-lg btn-primary keychainify-checked" href="#" role="button">Sign up today</a></p>
                            </div>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img className="second-slide" src="" alt="Second slide" />
                        <div className="container">
                            <div className="carousel-caption">
                                <h1>Another example headline.</h1>
                                <p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p>
                                <p><a className="btn btn-lg btn-primary keychainify-checked" href="#" role="button">Learn more</a></p>
                            </div>
                        </div>
                    </div>
                    <div className="carousel-item active">
                        <img className="third-slide" src="" alt="Third slide" />
                        <div className="container">
                            <div className="carousel-caption text-right">
                                <h1>One more for good measure.</h1>
                                <p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p>
                                <p><a className="btn btn-lg btn-primary keychainify-checked" href="#" role="button">Browse gallery</a></p>
                            </div>
                        </div>
                    </div>
                </div>
                <a className="carousel-control-prev keychainify-checked" href="#myCarousel" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next keychainify-checked" href="#myCarousel" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </a>
            </div> */}


            {/* <!-- Marketing messaging and featurettes
      ================================================== -->
      <!-- Wrap the rest of the page in another container to center all the content. --> */}

            <div className="container marketing">

                {/* <!-- Three columns of text below the carousel --> */}
                <div className="row">
                    <div className="card-deck mb-3 text-center">

                        <div className="card mb-4 shadow-sm">
                            <div className="card-header">
                                <h4 className="my-0 font-weight-normal">Tools</h4>
                            </div>
                            <div className="card-body row">
                                {tools.map((tool, index) => {
                                    // check if 3 tools are already displayed in a row, if so, create a new row
                                    if (index % 4 === 0) {
                                        return (
                                            <>
                                                <div className="w-100"></div>
                                                <ToolComponent key={index} title={tool.title} description={tool.description} image={tool.image} link={tool.link} />
                                            </>
                                        )
                                    }
                                    return (
                                        <ToolComponent key={index} title={tool.title} description={tool.description} image={tool.image} link={tool.link} />
                                    )

                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {/* <!-- START THE FEATURETTES --> */}

            {/* <hr className="featurette-divider" />

                <div className="row featurette">
                    <div className="col-md-7">
                        <h2 className="featurette-heading">First featurette heading. <span className="text-muted">It'll blow your mind.</span></h2>
                        <p className="lead">Donec ullamcorper nulla non metus auctor fringilla. Vestibulum id ligula porta felis euismod semper. Praesent commodo cursus magna, vel scelerisque nisl consectetur. Fusce dapibus, tellus ac cursus commodo.</p>
                    </div>
                    <div className="col-md-5">
                        <img className="featurette-image img-fluid mx-auto" alt="500x500" src={SPLogo} />
                    </div>
                </div>

                <hr className="featurette-divider" />

                <div className="row featurette">
                    <div className="col-md-7 order-md-2">
                        <h2 className="featurette-heading">Oh yeah, it's that good. <span className="text-muted">See for yourself.</span></h2>
                        <p className="lead">Donec ullamcorper nulla non metus auctor fringilla. Vestibulum id ligula porta felis euismod semper. Praesent commodo cursus magna, vel scelerisque nisl consectetur. Fusce dapibus, tellus ac cursus commodo.</p>
                    </div>
                    <div className="col-md-5 order-md-1">
                        <img className="featurette-image img-fluid mx-auto" alt="500x500" src={SPLogo} />
                    </div>
                </div>

                <hr className="featurette-divider" />

                <div className="row featurette">
                    <div className="col-md-7">
                        <h2 className="featurette-heading">And lastly, this one. <span className="text-muted">Checkmate.</span></h2>
                        <p className="lead">Donec ullamcorper nulla non metus auctor fringilla. Vestibulum id ligula porta felis euismod semper. Praesent commodo cursus magna, vel scelerisque nisl consectetur. Fusce dapibus, tellus ac cursus commodo.</p>
                    </div>
                    <div className="col-md-5">
                        <img className="featurette-image img-fluid mx-auto" alt="500x500" src={SPLogo} />
                    </div>
                </div>

                <hr className="featurette-divider" /> */}

            {/* <!-- /END THE FEATURETTES --> */}
        </main >
    );
}

export default Tools;