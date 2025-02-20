import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className='flex justify-center items-center h-screen'>
      <Link href={"/forms"}>
        <button className='bg-green-500 py-5 px-12 '>
          Create New Form
        </button>
      </Link>
    </div>
  );
}
