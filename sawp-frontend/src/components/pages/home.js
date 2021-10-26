import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars-2';
import intro from '../../static/img/intro.svg';
// import banner from '../../static/img/banner.png';

export default function Home() {
    return (
        <div className="home">
            <Scrollbars
                autoHeight
                autoHeightMax={"89vh"}
                className="custom-scrollbars">
                {/* <section className="container-fluid col-12" style={{background: "#000022",minHeight: '581.006px'}}>
                    <div className="row">
                        <div className="col-8 m-auto">
                            <div className="intro">
                                Hi how are you
                            </div>
                        </div>
                    </div>
                </section> */}
                <section class="view intro-2 rgba-gradient">
                    <div class="mask">
                        <div class="container h-100 d-flex justify-content-center align-items-center">
                            <div class="row flex-center pt-5 mt-3">
                                <div class="col-md-12 col-lg-6 text-center text-md-left margins">
                                    <div class="white-text">
                                        <h1 class="h1-responsive font-weight-bold wow fadeInLeft" data-wow-delay="0.3s">Suitability Analysis</h1>
                                        <hr class="hr-light wow fadeInLeft" data-wow-delay="0.3s" />
                                        <p className="text-justify">
                                            Suitability Analysis allows you to qualify, compare, and rank candidate sites based on how closely they adhere to criteria that you select and define. Suitability Analysis is performed on polygonal inputs that are formatted as your Suitability Analysis layer. These can represent sales regions, standard geographies such as counties, or candidate site trade areas.The analyses of suitability layer candidates are ranked and scored based on criteria that you select and control. Suitability scores are calculated by comparing criteria across all candidate sites. Each criterion receives a score and weighted score, which are returned as new attributes. A final score is also returned. It summarizes individual weighted scores into an overall ranking.
                                        </p>
                                    </div>
                                </div>
                                <div class="col-md-12 col-lg-6">
                                <img src={intro} className="img-fluid" alt="intro" style={{ height: "60vh", width: "30vw" }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="container-fluid pl-5 pr-5">
                    <div className="row mt-5">
                        <div className="col">
                            <h5 className="text-center">Analytic Hierarchy Process</h5>
                            <p className="text-justify">
                                The Analytic Hierarchy Process (AHP) is a method for organizing and analyzing complex decisions, using math and psychology. It was developed by Thomas L. Saaty in the 1970s and has been refined since then. It contains three parts: the ultimate goal or problem you're trying to solve, all of the possible solutions, called alternatives, and the criteria you will judge the alternatives on. AHP provides a rational framework for a needed decision by quantifying its criteria and alternative options, and for relating those elements to the overall goal.Stakeholders compare the importance of criteria, two at a time, through pair-wise comparisons. Example, do you care about job benefits or having a short commute more, and by how much more? AHP converts these evaluations into numbers, which can be compared to all of the possible criteria. This quantifying capability distinguishes the AHP from other decision making techniques.In the final step of the process, numerical priorities are calculated for each of the alternative options.
                            </p>
                        </div>
                    </div>
                </div>
            </Scrollbars>
        </div>
    )
}
