import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function Layout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex max-md:flex-col min-w-full min-h-full">
      <div className="h-full bg-brand-primary items-center justify-center max-md:flex-[0] flex-1 grid grid-rows-3 grid-cols-1 max-md:grid-cols-3 max-md:grid-rows-1 p-5">
        <div className="w-full h-full flex max-md:items-center">
          <Link href="/" className="flex gap-1 text-brand-primary-complement">
            <ArrowLeft />
            Back
          </Link>
        </div>
        <div className="w-full h-full row-span-2 col-span-2 justify-center items-center grid grid-rows-2 grid-cols-1 max-md:grid-rows-1 max-md:grid-cols-2 max-md:items-center">
          <div className="w-full flex justify-center">
            <Image
              src="/assets/logo-sm-a.svg"
              alt="greenr"
              width={383}
              height={134}
            />
          </div>
        </div>
      </div>
      <div className="flex-1 p-5">{children}</div>
    </div>
  );
}
