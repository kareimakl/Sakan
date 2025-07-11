"use client";
import React, { useState } from "react";
import Link from "next/link";
import "../styles/header.css";

const Header = () => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => setShowModal((prev) => !prev);

  return (
    <header>
      <div className=" justify-center items-center m-auto  flex navbur">
        <div
          className="flex"
          style={{ justifyCoƒntent: "space-between", gap: "10rem" }}
        >
          {/* Logo */}
          <div className="img-class">
            <Link href="/">
              <img src="./Frame.svg" alt="Logo" className="logo" />
            </Link>
          </div>

          {/* Navigation Links */}
          <nav>
            <ul className="flex">
              <Link href="/">
                <li>Home </li>
              </Link>
              <Link href="/map">
                <li> Map </li>
              </Link>
              <Link href="/aboutus">
                <li> About us </li>
              </Link>
            </ul>
          </nav>
        </div>

        <div className="flex gap-2">
          <Link href="/login" className="text-[#fff] min-w-[50px]">Log In</Link>
          <Link href="/contact">
            <button className="contact-but">List Your Property</button>
          </Link>
          <button className="menu" onClick={toggleModal}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="3" y="6" width="18" height="2" fill="black" />
              <rect x="3" y="11" width="18" height="2" fill="black" />
              <rect x="3" y="16" width="18" height="2" fill="black" />
            </svg>
          </button>
        </div>
        {showModal && (
          <div className="fixed">
            <ul className="modal">
              <li>
                <button className="icon-x" onClick={toggleModal}>
                  x
                </button>
              </li>
              <li>
                <Link href="/">Home </Link>
              </li>
              <li>
                <Link href="/map">Map</Link>
              </li>
              <li>
                <Link href="/aboutus"> About us</Link>
              </li>
            </ul>
          </div>
        )}
      </div>

      
    </header>
  );
};

export default Header;
