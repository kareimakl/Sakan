import Footer from "@/components/Footer";
import Header from "@/components/Header";
import React from "react";

export default function Map() {
  return (
    <main className="">
      <Header />
      <div className="flex w-full h-[90vh] justify-center items-center ">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d55467.16216847684!2d31.299664078863948!3d30.0595563169158!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14583fa60b21beeb%3A0x79dfb296e8423bba!2z2KfZhNmC2KfZh9ix2KnYjCDZhdit2KfZgdi42Kkg2KfZhNmC2KfZh9ix2KnigKw!5e1!3m2!1sar!2seg!4v1752245053343!5m2!1sar!2seg"
          width="600"
          height="450"
          style={{ border: "0" }}
          allowFullScreen=""
          loading="lazy"
          className="w-full h-full"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      <Footer />
    </main>
  );
}
