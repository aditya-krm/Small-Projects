import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const Home = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [responseMessage, setResponseMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const allowedDomains = ["gmail.com", "yahoo.com", "outlook.com"];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const isValidEmail = (email) => {
    if (!validEmailRegex.test(email)) {
      return false;
    }
    const domain = email.split("@")[1];
    return allowedDomains.includes(domain);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValidEmail(formData.email)) {
      setResponseMessage("Please enter a valid email address.");
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await fetch("https://formspree.io/f/mnnadjkj", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setResponseMessage(
          "Thank you for your message! I'll get back to you soon."
        );
        setFormData({ name: "", email: "", message: "" });
      } else {
        setResponseMessage("Something went wrong. Please try again later.");
      }
    } catch (error) {
      setResponseMessage("Something went wrong. Please try again later.");
    }
    setIsSubmitting(false);
  };

  function a(href, text) {
    return (
      <>
        <a
          href={href}
          className="text-blue-600 hover:text-blue-500"
          target="_blank"
          rel="noopener noreferrer"
        >
          {text}
        </a>
      </>
    );
  }

  const dependencies = [
    { name: "React", link: "https://reactjs.org/" },
    { name: "Tailwind CSS", link: "https://tailwindcss.com/" },
    { name: "Vite", link: "https://vitejs.dev/" },
    { name: "Node.js", link: "https://nodejs.org/" },
    { name: "Express.js", link: "https://expressjs.com/" },
    { name: "MongoDB", link: "https://www.mongodb.com/" },
    { name: "Socket.IO", link: "https://socket.io/" },
    { name: "framer-motion", link: "https://www.framer.com/" },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-between p-4">
      <section className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome! 👋</h1>
        <p className="text-xl text-start mx-9">
          Hi, I'm Aditya Karmakar, a passionate MERN stack developer currently
          pursuing a BTech in Computer Science and Engineering at the University
          of Engineering and Management, Jaipur. I love to build web
          applications. <br /> 👈 This are the Links where you can find all the
          small projects I am building. Each project is crafted with care to
          demonstrate various coding skills and concepts. 🚀
        </p>
        <div className="flex flex-col">
          <p className="text-lg mt-4">
            You can reach me at:{" "}
            <a
              href="mailto:adkarmakar521@gmail.com"
              className="text-blue-600 hover:text-blue-500"
            >
              adkarmakar521@gmail.com
            </a>
          </p>{" "}
          OR
          <Card className="w-[350px] mx-auto my-2">
            <CardHeader>
              <CardTitle>Contact me</CardTitle>
              <CardDescription>
                Fill some details so that I can reach you
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your name"
                  className="mb-4"
                />
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  className="mb-4"
                  required
                />
                <Input
                  type="textarea"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Enter your message"
                  className="mb-4"
                />
              </CardContent>
              <CardFooter>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md mx-auto"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </CardFooter>
            </form>
            {responseMessage && <p className="mt-4">{responseMessage}</p>}
          </Card>
        </div>
      </section>

      <section className="text-center mt-12">
        <h2 className="text-3xl font-bold mb-4">
          Technologies I Used so Far 🛠️
        </h2>
        <ul className="flex flex-wrap justify-center gap-4 text-lg">
          {dependencies.map((dependency) => (
            <li key={dependency.name}>{a(dependency.link, dependency.name)}</li>
          ))}
        </ul>
      </section>

      <footer className="bg-gray-800 text-white py-6 w-full mt-12">
        <div className="text-center">
          <p>
            &copy; {new Date().getFullYear()} Small Projects. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
