import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars-2';
import intro from '../../static/img/video.jpg';
import { Link } from 'react-router-dom'

export default function Home() {
    return (
        <div className="home">
            <Scrollbars
                autoHeight
                autoHeightMax={"91vh"}
                className="custom-scrollbars">
                <section className="main-banner">
                    <div className="container-fluid col-12">
                        <div className="col-xl-6 clo-sm-12 banner-content">
                            <div className="intro py-auto">
                                <h4>Online Suitability Analysis</h4>
                                <p>Suitability Analysis allows you to qualify, compare, and rank candidate sites based on how closely they adhere to criteria that you select and define.</p>
                                <a href="/">Get Started</a>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="about-section">
                    <div className="container-fluid py-5">
                        <div className="row mx-5 my-5">
                            <div class="col-md-12 col-lg-6 text-center text-md-left m-auto px-5">
                                <h1>About The Platform</h1>
                                <p>The Analytic Hierarchy Process (AHP) is a method for organizing and analyzing complex decisions, using math and psychology. It was developed by Thomas L. Saaty in the 1970s and has been refined since then. It contains three parts: the ultimate goal or problem you're trying to solve, all of the possible solutions, called alternatives, and the criteria you will judge the alternatives on. AHP provides a rational framework for a needed decision by quantifying its criteria and alternative options, and for relating those elements to the overall goal.Stakeholders compare the importance of criteria, two at a time, through pair-wise comparisons. Example, do you care about job benefits or having a short commute more, and by how much more? AHP converts these evaluations into numbers, which can be compared to all of the possible criteria.</p>
                                <a href="/">Know More</a>
                            </div>
                            <div class="col-md-12 col-lg-6 text-center text-md-left m-auto">
                                <div className="about-image">
                                    <img src={intro} alt="intro" className="img-fluid pr-5" />
                                    <i className="fa fa-play-circle" title="Play Video"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="features-section">
                    <div className="container-fluid py-5">
                        <div className="row feature-top">
                            <h1>Features</h1>
                        </div>
                        <div className="row mx-5 my-5">
                            <div className="col-md-3 mt-3 mb-3">
                                <div className="card">
                                    <div className="card-body">
                                        <i className="fas fa-address-card"></i>
                                        <h5 className="card-title">Data Management</h5>
                                        <p className="card-text">
                                            Data preparation is the process of cleaning, transforming, and transforming data into a form that is useful for analysis.
                                        </p>
                                        <Link to="/mergeVector" className="d-flex justify-content-center">
                                            <span className="btn btn-primary">Start Tool</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3 mt-3 mb-3">
                                <div className="card">
                                    <div className="card-body">
                                        <i className="fas fa-address-card"></i>
                                        <h5 className="card-title">Data Processing</h5>
                                        <p className="card-text">
                                            Data preparation is the process of cleaning, transforming, and transforming data into a form that is useful for analysis.
                                        </p>
                                        <Link to="/mergeVector" className="d-flex justify-content-center">
                                            <span className="btn btn-primary">Start Tool</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3 mt-3 mb-3">
                                <div className="card">
                                    <div className="card-body">
                                        <i className="fas fa-address-card"></i>
                                        <h5 className="card-title">Suitability Calculation</h5>
                                        <p className="card-text">
                                            Data preparation is the process of cleaning, transforming, and transforming data into a form that is useful for analysis.
                                        </p>
                                        <Link to="/mergeVector" className="d-flex justify-content-center">
                                            <span className="btn btn-primary">Start Tool</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3 mt-3 mb-3">
                                <div className="card">
                                    <div className="card-body">
                                        <i className="fas fa-address-card"></i>
                                        <h5 className="card-title">Full Control Visualization</h5>
                                        <p className="card-text">
                                            Data preparation is the process of cleaning, transforming, and transforming data into a form that is useful for analysis.
                                        </p>
                                        <Link to="/mergeVector" className="d-flex justify-content-center">
                                            <span className="btn btn-primary">Start Tool</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <footer>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="footer-content m-2">
                                    <p>Copyright © {new Date().getFullYear()} Suitability Analysis. All rights reserved.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            </Scrollbars>
        </div>
    )
}
