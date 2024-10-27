import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Home.css';
import AppBar from "./AppBarComponent.jsx";
import stocknyu from "../assets/images/stocknyu.png";
import studentfeedback from "../assets/images/feedbacksys.png";
import sems from "../assets/images/sems.png";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { googleLogout } from "@react-oauth/google";
import { useCookies } from 'react-cookie';

function Home() {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [redirectPath, setRedirectPath] = useState("");
    const [cookies, setCookie, removeCookie] = useCookies(["user_token"]);
    const [popularPosts, setPopularPosts] = useState([]);
    const [openPostDialog, setOpenPostDialog] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);

    useEffect(() => {
        // Fetch popular posts from the API
        axios.get("http://localhost/nud-hub/API/apiCalls/read/readPosts.php")
            .then(response => {
                console.log(response.data);
                setPopularPosts(response.data.data.slice(0, 3)); // Limit to 3 posts
            })
            .catch(error => {
                console.error("Error fetching popular posts:", error);
            });
    }, []);

    const handleCardClick = (path) => {
        navigate(path);
    };

    const handlePostClick = (post) => {
        setSelectedPost(post);
        setOpenPostDialog(true);
    };

    const handlePostDialogClose = (confirmed) => {
        setOpenPostDialog(false);
        if (confirmed && selectedPost) {
            navigate('/ViewAllNewsPage', { state: { post: selectedPost } });
        }
    };

    const handleLoginClick = (path) => {
        setRedirectPath(path);
        setOpen(true);
    };

    const handleClose = (confirmed) => {
        setOpen(false);
        if (confirmed) {
            handleLogoutClick();
            console.log("User logged out");
        }
    };

    const handleLogoutClick = () => {
        googleLogout();
        removeCookie("user_token");
        navigate('/');
    };

    return (
        <div>
            <div className="home-nav">
                <AppBar />
            </div>

            <div className="home-body">
                <h1 className="title">HOME</h1>
                <div className="row row-cols-1 row-cols-md-3 g-4">
                    <div className="col">
                        <div className="card h-100" onClick={() => handleCardClick('/nud-hub/ViewAllNewsPage')}>
                            <i className="fas fa-newspaper card-img-top"></i>
                            <div className="card-body">
                                <h5 className="card-title">News</h5>
                                <p className="card-text">Stay updated with the latest news and events happening around the campus.</p>
                            </div>
                            <div className="card-footer">
                                <small className="text-body-secondary">
                                    View All News <i className="fas fa-arrow-right"></i>
                                </small>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card h-100" onClick={() => handleCardClick('/nud-hub/BulldogExchange')}>
                            <i className="fas fa-exchange-alt card-img-top"></i>
                            <div className="card-body">
                                <h5 className="card-title">Bulldogs Exchange</h5>
                                <p className="card-text">View goods and services available in the university easily and securely.</p>
                            </div>
                            <div className="card-footer">
                                <small className="text-body-secondary">
                                    View All Products <i className="fas fa-arrow-right"></i>
                                </small>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card h-100" onClick={() => handleCardClick('/nud-hub/ViewAllEventPage')}>
                            <i className="fas fa-calendar-alt card-img-top"></i>
                            <div className="card-body">
                                <h5 className="card-title">Calendar</h5>
                                <p className="card-text">Keep track of important dates and events with our comprehensive calendar.</p>
                            </div>
                            <div className="card-footer">
                                <small className="text-body-secondary">
                                    View All Events <i className="fas fa-arrow-right"></i>
                                </small>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card h-100" onClick={() => handleCardClick('/nud-hub/UniversityMap')}>
                            <i className="fas fa-map-marker-alt card-img-top"></i>
                            <div className="card-body">
                                <h5 className="card-title">Map</h5>
                                <p className="card-text">Navigate the campus with ease using our detailed and interactive map.</p>
                            </div>
                            <div className="card-footer">
                                <small className="text-body-secondary">
                                    View All Offices <i className="fas fa-arrow-right"></i>
                                </small>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card h-100" onClick={() => handleCardClick('/nud-hub/FeedbackPage')}>
                            <i className="fas fa-comments card-img-top"></i>
                            <div className="card-body">
                                <h5 className="card-title">Feedback</h5>
                                <p className="card-text">Share your thoughts and suggestions to help us improve.</p>
                            </div>
                            <div className="card-footer">
                                <small className="text-body-secondary">
                                    Give Feedback <i className="fas fa-arrow-right"></i>
                                </small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="popular-posts-body">
                <h1 className="title">POPULAR POSTS IN TINIG NATIONALIAN</h1>
                <div className="row row-cols-1 row-cols-md-3 g-4">
                    {popularPosts.map((post, index) => (
                        <div className="col" key={index}>
                            <div className="card h-100" onClick={() => handlePostClick(post)}>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-3">
                                            <img src={post.image_url || "https://dummyimage.com/150"} className="img-fluid" alt="..." />
                                        </div>
                                        <div className="col-9">
                                            <h5 className="card-title">{post.title}</h5>
                                            <p className="card-text">{post.content}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-footer">
                                    <small className="text-body-secondary d-flex justify-content-between">
                                        <div>
                                            <i className="fas fa-thumbs-up"></i> 10 <i className="fas fa-comments"></i> {post.comment_count}
                                        </div>
                                        <span className="date">{new Date(post.date).toLocaleDateString()}</span>
                                    </small>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="other-systems-body">
                <h1 className="title">OTHER SYSTEMS</h1>
                    <div className="row row-cols-1 row-cols-md-3 g-4">
                        <div className="col">
                            <div className="card mb-3">
                                <div className="row g-0">
                                    <div className="col-md-4">
                                        <img src={stocknyu} className="img-fluid rounded-start" alt="..."/>
                                    </div>
                                    <div className="col-md-8">
                                        <div className="card-body">
                                            <h5 className="card-title">StockNYU</h5>
                                            <p className="card-text">Efficiently track, manage, and optimize stock levels of Bulldogs Exchange to ensure smooth operations and availability of essential resources.</p>
                                            <div className="button-container">
                                                <button className="btn btn-primary" onClick={() => handleLoginClick('/')}>Login</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col">
                            <div className="card mb-3">
                                <div className="row g-0">
                                    <div className="col-md-4">
                                        <img src={sems} className="img-fluid rounded-start" alt="..."/>
                                    </div>
                                    <div className="col-md-8">
                                        <div className="card-body">
                                            <h5 className="card-title">SEMS</h5>
                                            <p className="card-text">Manage and streamline all student events effortlessly with Student Event Management System.</p>
                                            <div className="button-container">
                                                <button className="btn btn-primary" onClick={() => handleLoginClick('/')}>Login</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col">
                            <div className="card mb-3">
                                <div className="row g-0">
                                    <div className="col-md-4">
                                        <img src={studentfeedback} className="img-fluid rounded-start" alt="..."/>
                                    </div>
                                    <div className="col-md-8">
                                        <div className="card-body">
                                            <h5 className="card-title">Tinig Nationalian</h5>
                                            <p className="card-text">Empower students to voice their opinions and improve the learning experience with the Student Feedback System.</p>
                                            <div className="button-container">
                                                <button className="btn btn-primary" onClick={() => handleLoginClick('/')}>Login</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>

            <Dialog open={open} onClose={() => handleClose(false)}>
                <DialogTitle sx={{fontFamily: 'ClanOT-Black'}}>Logout Confirmation</DialogTitle>
                <DialogContent>
                    Are you sure you want to log out and redirect to the selected system?
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleClose(false)} color="primary" sx={{fontFamily: 'ClanOT-Bold'}}>
                        Cancel
                    </Button>
                    <Button onClick={() => handleClose(true)} color="primary" sx={{fontFamily: 'ClanOT-Bold'}}>
                        OK
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openPostDialog} onClose={() => handlePostDialogClose(false)}>
                <DialogTitle sx={{fontFamily: 'ClanOT-Black'}}>Redirect Confirmation</DialogTitle>
                <DialogContent>
                    Do you want to redirect to Tinig Nationalian to interact with this post?
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handlePostDialogClose(false)} color="primary" sx={{fontFamily: 'ClanOT-Bold'}}>
                        Cancel
                    </Button>
                    <Button onClick={() => handleClose(true)} color="primary" sx={{fontFamily: 'ClanOT-Bold'}}>
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default Home;