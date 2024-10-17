"use client"; 
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, UserCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import "./globals.css";

export default function Page() {
  const newdivs = useRef<(HTMLDivElement | null)[]>([]);
  const dynamicdiv = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const divtracker = new IntersectionObserver(
      (entries) => {
        entries.forEach((popitem) => {
          if (popitem.isIntersecting) {
            popitem.target.classList.add("slidetovisible");
            divtracker.unobserve(popitem.target);
          }
        });
      },
      { threshold: 0.1 }
    );
  
    if (dynamicdiv.current) {
      divtracker.observe(dynamicdiv.current);
    }
  
    newdivs.current.forEach((difref) => {
      if (difref) divtracker.observe(difref);
    });

    return () => {
      if (dynamicdiv.current) {
        divtracker.unobserve(dynamicdiv.current);
      }
      newdivs.current.forEach((difref) => {
        if (difref) divtracker.unobserve(difref);
      });
    };
  }, []);

  const tempArticles = [
    { image: "solar-future.png", title: "The Future of Solar Energy" },
    { image: "solar-myths.png", title: "Top 5 Myths about Solar Energy" },
    { image: "solar-worth.png", title: "Is Solar Energy really worth it?" },
  ];

  return (
    <div className="w-full max-w-[1080px] py-5 flex flex-col gap-20">
      <nav className="flex items-center justify-between w-full h-10">
        <Image
          src="/assets/logo-sm.svg"
          className="max-h-[100%] w-min"
          alt="greenr"
          width={383}
          height={134}
        />
        <div className="flex gap-10 items-center text-brand-tertiary">
          <Link href="/about">About</Link>
          <Link href="/help">Help</Link>
          <Link
            className="border-[1px] border-border py-2 px-4 rounded-full flex gap-2"
            href="/auth/login"
          >
            <UserCircle strokeWidth={1} />
            <p>Sign In</p>
          </Link>
        </div>
      </nav>
      <main className="grid grid-cols-3 flex-col gap-10">
        <div className="flex flex-col gap-5 col-span-2">
          <h1 className="text-6xl">Welcome</h1>
          <p className="font-light text-lg">
            Explore our innovative products, discover the benefits of solar
            energy, and join us in creating a brighter, sustainable future. Your
            journey to clean energy starts here!
          </p>
        </div>
        <div className="relative col-span-2">
          <Image
            className="absolute -z-10 w-full h-full"
            src="/assets/cdn/solar-stock.png"
            alt="solar"
            width={806}
            height={537}
          />
          <div className="p-5 flex justify-between h-full">
            <div
              ref={dynamicdiv}
              className="max-w-96 bg-foreground/50 backdrop-blur-sm p-10 flex flex-col h-full justify-between rounded-sm slidefromright"
            >
              <h3 className="text-3xl text-brand-primary-complement font-bold">
                Creating a <span className="text-brand-accent">brighter</span>{" "}
                future with solar-powered solutions
              </h3>
              <p className="text-xl font-light text-brand-primary-complement">
                Consider pure, renewable energy that enters your home directly
                from the sun. An endless supply that is available for the taking.
              </p>
              <Link href={"/auth/register"} className="w-full">
                <Button className="w-full bg-transparent border-primary-foreground border-[1px] text-primary-foreground shadow hover:bg-primary-foreground/10 rounded-none">
                  Join Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col gap-5">
          <div className="flex items-center w-full justify-between">
            <h1 className="text-2xl">Articles</h1>
            <Link href={"/community/articles"} className="text-sm">
              See More
            </Link>
          </div>
          <div className="flex flex-col gap-10">
            {tempArticles.map((article, index) => (
              <div
                key={article.title}
                ref={(el) => {
                  newdivs.current[index] = el;
                }}
                className="articlefrombottom"
              >
                <Image
                  className="w-full"
                  src={`/assets/cdn/${article.image}`}
                  alt={article.title}
                  width={500}
                  height={500}
                />
                <Link
                  className="flex justify-between px-2 cursor-pointer"
                  href={`/community/articles/${article.title}`}
                >
                  {article.title} <ArrowRight />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </main>
      <footer className="w-full bg-gray-100 py-6 mt-10">
        <div className="max-w-[1080px] mx-auto flex justify-between items-center">
          <span className="text-sm text-gray-600">© 2024 Greenr. All rights reserved.</span>
          <div className="flex gap-4">
            <Link href="/privacy-policy" className="text-sm text-gray-600 hover:text-gray-800">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="text-sm text-gray-600 hover:text-gray-800">
              Terms of Service
            </Link>
            <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <Image src="/assets/icons/facebookIcon.png" alt="Facebook" width={24} height={24} />
            </Link>
            <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <Image src="/assets/icons/twittericon.svg" alt="Twitter" width={24} height={24} />
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
