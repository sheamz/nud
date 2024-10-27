import React from "react";
import logo from '../assets/images/NU White Full Logo.png'

import '../assets/css/NavigationBar.css'
import search from '../assets/images/Search.png'

function NavigationBar(){


    
    return (
        <>
        {/* Navigation Bar */}
  <nav class="navbar sticky-top navbar-expand-lg">
  <div class="container-fluid">
  <a class="navbar-brand" href="/nud-hub/homepage">
      <img src={ logo } alt="Logo" width="242" height="42.35" class="d-inline-block align-text-top"></img>
    </a>
    <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link" aria-current="page" href="#Home">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#News">News</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#Shop">Shop</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#Calendar">Calendar</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#Map">Map</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#Contact">Contact Us</a>
        </li>
      </ul>

      {/* Search Bar  */}
      <div class="d-flex">
      <div class="input-group">
      <input type="text" class="form-control" placeholder="Search"></input>
      <span class="input-group-text">
        <img src={ search } height="20" width="20" alt="Search Icon"></img>
      </span>
    </div>
        </div>
    </div>
  </div>
</nav>

{/* OffCanvas */}
<div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="offcanvasNavbarLabel">NUD Hub</h5>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body">
        <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="PHome">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="">News</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Shop</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Calendar</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Map</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Contact Us</a>
          </li>
        </ul>
        <form class="d-flex mt-3" role="search">
          <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"></input>
          <button class="btn btn-outline-success" type="submit">Search</button>
        </form>
      </div>
    </div>
    </>
    )
}

export default NavigationBar;