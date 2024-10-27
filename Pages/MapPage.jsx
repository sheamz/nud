import React, { useState, useEffect } from "react";
import logo from "../assets/NULogo.png";
import "../assets/css/MapPage.css";
import Footer from "../Homepage/Footer";
import map1 from "../assets/images/4th FLOOR BLUEPRINT.png";
import map2 from "../assets/images/5th FLOOR BLUEPRINT.png";
import sideImage from "../assets/map-side.jpg";

const MapPage = () => {
    const [selectedFloor, setSelectedFloor] = useState("4th Floor");
    const [searchTerm, setSearchTerm] = useState("");
    const [zoomLevel, setZoomLevel] = useState(1);
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

    const floorOptions = {
        "4th Floor": [
            { title: "Restrooms", description: "Three available restrooms for students, faculty, and staff." },
            { title: "Accountancy & Registrar", description: "Offices handling student records, registration, and financial inquiries." },
            { title: "Disciplinary Office (DO)", description: "Handles disciplinary cases and maintains student conduct policies." },
            { title: "Student Development & Activities Office (SDAO)", description: "Oversees student organizations, events, and leadership programs." },
            { title: "NU-D Bulldogs Exchange", description: "A marketplace where students can exchange or purchase goods." },
            { title: "Functional Hall", description: "A large space used for events, seminars, and gatherings." },
            { title: "Engineer Room", description: "A facility for maintenance and technical support on campus." },
            { title: "Classrooms/Rooms", description: "Regularly scheduled rooms for classes and academic purposes." },
        ],
        "5th Floor": [
            { title: "Multifunctional Gym", description: "A versatile gymnasium for sports, fitness, and large events." },
            { title: "Two Canteens", description: "Cafeterias offering a variety of food and beverages to students and staff." },
            { title: "Library", description: "A resource hub for academic books, research materials, and study spaces." },
            { title: "Computer Laboratories", description: "Dedicated spaces with computers for IT and academic work." },
            { title: "Faculty", description: "Offices for teachers and professors where students can seek academic guidance." },
            { title: "ITSO", description: "Provides support for technological innovation and intellectual property." },
            { title: "Clinic", description: "A healthcare facility offering basic medical services to students and staff." },
        ],
    };

    const filteredContent = floorOptions[selectedFloor].filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleZoomIn = () => setZoomLevel((prevZoom) => Math.min(prevZoom + 0.2, 2));
    const handleZoomOut = () => setZoomLevel((prevZoom) => Math.max(prevZoom - 0.2, 0.8));

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setDragStart({ x: e.clientX - dragOffset.x, y: e.clientY - dragOffset.y });
    };

    const handleMouseMove = (e) => {
        if (isDragging) {
            setDragOffset({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    useEffect(() => {
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, [isDragging, dragStart]);

    return (
        <>
            <div className="mapPage-container">
                {/* Sidebar */}
                <div className="sidebar">
                    <div className="inputRow">
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="searchInput"
                        />
                        <select
                            className="floorSelect"
                            value={selectedFloor}
                            onChange={(e) => setSelectedFloor(e.target.value)}
                        >
                            <option value="4th Floor">4th Floor</option>
                            <option value="5th Floor">5th Floor</option>
                        </select>
                    </div>
                    <div className="cardContainer">
                        {filteredContent.map((item, index) => (
                            <div key={index} className="card">
                                <div className="cardContent">
                                    <img src={sideImage} alt="Room" className="cardImage" />
                                    <div className="cardText">
                                        <h3>{item.title}</h3>
                                        <p>{item.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Main content */}
                <div className="mainContent">
                    <h1 className="mapTitle">UNIVERSITY MAP</h1>
                    <div className="mapContainer">
                        <img
                            src={selectedFloor === "4th Floor" ? map1 : map2}
                            alt="University Map"
                            className="mapImage"
                            style={{
                                transform: `scale(${zoomLevel}) translate(${dragOffset.x}px, ${dragOffset.y}px)`,
                                cursor: isDragging ? "grabbing" : "grab",
                            }}
                            onMouseDown={handleMouseDown}
                        />
                    </div>
                    <div className="zoomControls">
                        <button onClick={handleZoomIn} className="zoomButton">+</button>
                        <button onClick={handleZoomOut} className="zoomButton">-</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MapPage;