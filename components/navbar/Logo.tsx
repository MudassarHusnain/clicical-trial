import { VscCode } from "react-icons/vsc";
import { Button } from "../ui/button";
import Link from "next/link";

function Logo() {
  return (
    <Button size="icon" asChild className="m-5 ms-5 bg-white w-32 hover:white">
      <Link href="/">
        <div className="flex items-center ">
          <span className="text-[40px] pe-3 font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
            &gt;
          </span>
          <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400">
            Logo
          </h1>
        </div>
      </Link>
    </Button>
  );
}

export default Logo;
