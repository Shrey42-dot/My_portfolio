import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <section className="space-y-12">
      <div className="grid items-center gap-8 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 shadow-[0_0_40px_-28px_rgba(34,211,238,0.8)] md:grid-cols-[300px_1fr] md:p-8">
        <div className="mx-auto">
          <Image
            src="/assets/profile.jpeg"
            width={300}
            height={300}
            alt="Shrey Pandey"
            className="rounded-xl border border-zinc-700 object-cover"
            priority
          />
        </div>

        <div className="space-y-5 text-center md:text-left">
          <p className="font-mono text-sm tracking-wider text-cyan-300">
            SYSTEM ONLINE
          </p>
          <h1 className="text-3xl font-semibold leading-tight text-zinc-100 sm:text-4xl">
            Hi, I&apos;m Shrey Pandey. Security Researcher | AI &amp; ML
            Enthusiast | Fullstack Developer.
          </h1>
          <div className="space-y-2 text-zinc-300">
            <p>
              Email:{" "}
              <a
                href="mailto:shrey42pandey@gmail.com"
                className="text-cyan-300 underline-offset-4 hover:underline"
              >
                shrey42pandey@gmail.com
              </a>
            </p>
            <p className="flex flex-wrap justify-center gap-4 md:justify-start">
              <Link
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md border border-zinc-700 px-3 py-1.5 text-cyan-300 transition hover:border-cyan-300/70 hover:text-cyan-200"
              >
                GitHub
              </Link>
              <Link
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md border border-zinc-700 px-3 py-1.5 text-cyan-300 transition hover:border-cyan-300/70 hover:text-cyan-200"
              >
                LinkedIn
              </Link>
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 md:p-8">
        <h2 className="mb-3 font-mono text-xl text-cyan-300">About Me</h2>
        <p className="leading-7 text-zinc-300">
          I am a 3rd Year B.Tech CSE (AIML) student at AKGEC, Ghaziabad,
          currently working on Bio-Sentinel-Core.
        </p>
      </div>
    </section>
  );
}
