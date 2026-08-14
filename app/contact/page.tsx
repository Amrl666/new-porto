"use client";
import Navbar from "@/components/shared/navbar";
import React from "react";
import Footer from "@/components/shared/footer";
import Letters from "@/components/home/letters";

function Contact() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-paper">
      <Navbar />
      <main className="w-full flex-grow">
        <Letters />
      </main>
      <Footer />
    </div>
  );
}

export default Contact;
