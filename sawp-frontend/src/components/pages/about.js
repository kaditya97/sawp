import React from 'react'

export default function About() {
    return (
        <div>
            <div className="container-fluid mt-5">
                <h3 className="text-center heading">About Platform</h3>
                <div className="row mx-5" style={{ textAlign: "justify", textAlignLast: "justify" }}>
                    <p>For the proper analysis, conduction and completion of project in most appropriate and sustainable ways, suitability analysis of the particular project is the very important. One of the major reasons behind the failure of the projects conducted in Nepal is due to the lack of proper study and analysis of project before and during the project conduction. This project develops the Web based platform for suitability analysis taking electric vehicle charging station as case study in some areas of Pokhara. On the basis of availability of different facilities in the city, office, parking, economic hub, recreational center, service center, educational institutions, health center, fuel stations and road network are taken as the parameter in our project. The data required for the project is extracted from openstreetmap using QuickOSM in QGIS. The system integrates GIS techniques, AHP and MCDM methods for finding suitable locations of the electric vehicle charging stations in Pokhara. For accuracy assessment, the output obtained from web-platform is compared with the output obtained from QGIS. The obtained accuracy from analysis was 100%. </p>
                </div>
                <div className="row mx-5">
                    <h3 className="text-center heading"><u>Developed By</u></h3><br />
                </div>
                <div className="row mx-5">
                    Aakriti Lamichhane<br />
                    Aditya Kushwaha<br />
                    Arjun Kandel<br />
                    Bishow Saran Baral<br />
                    Keshav Prasad Chaulagain<br />
                    Tilisha Poudel<br />
                </div>
            </div>
        </div>
    )
}
