import Image from "next/image";

export const AboutMe = () => {
  return (
    <>
      <div className="about-me flex items-center justify-center bg-zinc-950 w-full h-auto">
        <div className="text-left w-1/2">
          <Image src="/me.jpg" alt="My Photo" width={200} height={200} />
        </div>
        <div className="about-me__description">
          <h2 className="text-2xl font-bold mb-4 text-white">About Me</h2>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            euismod, nunc id aliquet ullamcorper, elit nunc lacinia nunc, vitae
            tincidunt nunc metus vel nunc.
          </p>
        </div>
      </div>
      <div className="about-me__tech-stack">
        <h3 className="text-xl font-bold mb-2">Tech Stack</h3>
        <div className="tech-stack__logos">
          {/* Add your tech stack logos here */}
        </div>
      </div>
    </>
  );
};

export default AboutMe;
