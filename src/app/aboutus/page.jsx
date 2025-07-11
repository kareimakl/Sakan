"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Image from "next/image";

const AboutUsBadge = () => {
  return (
    <main>
      <Header />

      <div className="space-y-12 px-6 py-12 max-w-7xl mx-auto">
        {/* About Us */}
        <section>
          <h2 className="text-sm text-blue-600 font-semibold mb-2">About Us</h2>
          <h3 className="text-2xl font-bold mb-4">
            Erasmus Life Housing – your go-to hub for finding the perfect home
            for students, by students
          </h3>
          <p className="text-gray-600 mb-2">
            Whether you are coming to Lisbon for Erasmus, Exchange, Traineeship,
            Full Master’s or Work...
          </p>
          <p className="text-gray-600">
            Our ultimate goal is to make Lisbon the number one destination...
          </p>
          <button className="mt-2 text-blue-600 text-sm underline">
            Show more +
          </button>
        </section>

        {/* Achievements */}
        <section className="bg-white border  m-auto rounded-lg shadow p-6 flex flex-col md:flex-row gap-6 items-center">
          <Image
            src="/assets/images/image.png"
            alt="Room"
            width={400}
            height={300}
            className="rounded-md object-cover"
          />
          <div>
            <h4 className="text-blue-600 font-semibold text-lg mb-2">
              Our Achievements
            </h4>
            <p className="text-gray-600 text-sm mb-4 max-w-md">
              Since 2013, our team has helped tons of students discover their
              ideal place...
            </p>
            <div className="flex gap-6 text-center">
              <div>
                <p className="text-xl font-bold">550+</p>
                <p className="text-sm text-gray-500">Rooms</p>
              </div>
              <div>
                <p className="text-xl font-bold">255+</p>
                <p className="text-sm text-gray-500">Reservation/Semester</p>
              </div>
              <div>
                <p className="text-xl font-bold">2000+</p>
                <p className="text-sm text-gray-500">Students</p>
              </div>
            </div>
          </div>
        </section>

        {/* Team */}
        <section>
          <h3 className="text-2xl font-bold mb-2 text-center">Meet our team</h3>
          <p className="text-center text-gray-500 mb-6 text-sm max-w-2xl mx-auto">
            Our philosophy is simple – hire a team of diverse, passionate
            people...
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 text-center">
            {[
              { name: "Olivia Rhye", role: "Founder & CEO" },
              { name: "Phoenix Baker", role: "Engineering Manager" },
              { name: "Lana Steiner", role: "Product Manager" },
              { name: "Demi Wilkinson", role: "Frontend Developer" },
              { name: "Candice Wu", role: "Backend Developer" },
              { name: "Natali Craig", role: "Product Designer" },
              { name: "Drew Cano", role: "UX Researcher" },
              { name: "Orlando Diggs", role: "Customer Success" },
            ].map((member, index) => (
              <div key={index}>
                <div className="w-16 h-16 bg-gray-300 mx-auto rounded-full">
                  <img src="/assets/images/Avatar (1).png" alt="" />
                </div>
                <h4 className="mt-2 font-medium">{member.name}</h4>
                <p className="text-sm text-blue-600">{member.role}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section>
          <h4 className="text-sm text-blue-600 text-center mb-1">
            Testimonials
          </h4>
          <h3 className="text-2xl font-bold text-center mb-6">
            That’s What Our Clients Say
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 border bg-white rounded-lg shadow-sm">
              <p className="text-gray-600 text-sm mb-4">
                Highly recommended. I came across this platform during my
                Erasmus program...
              </p>
              <p className="font-semibold">Serena Johnson</p>
            </div>
            <div className="p-6 border bg-white rounded-lg shadow-sm">
              <div className=" flex gap-2">
                <img
                  src="/assets/images/Avatar-1.png"
                  alt=""
                  className=" h-12"
                />
                <p className="font-semibold">Ilias Elfhassi</p>
              </div>

              <p className="text-gray-600 text-sm pl-12">
                Erasmus Life Housing deserves a huge shoutout...
              </p>
            </div>
            <div className="p-6 border bg-white rounded-lg shadow-sm">
              <div className=" flex gap-2">
                <img
                  src="/assets/images/Avatar-1.png"
                  alt=""
                  className=" h-12"
                />
                <p className="font-semibold">Ilias Elfhassi</p>
              </div>

              <p className="text-gray-600 text-sm pl-12">
                Erasmus Life Housing deserves a huge shoutout...
              </p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
};

export default AboutUsBadge;
