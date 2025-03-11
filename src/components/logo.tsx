import Link from "next/link";
import Image from "next/image";

export const Logo = () => {
  return (
    <Link href="/">
      <div className="flex items-center space-x-1">
        <Image src="/logo.svg" alt="Logo" width={28} height={28} />
      </div>
    </Link>
  );
}

Logo.Text = function LogoText() {
  return (
    <Link href="/" className="w-fit shrink-0">
      <div className="flex items-center space-x-1">
        <Image src="/logo.svg" alt="Logo" width={28} height={28} className="dark:hidden block" />
        <Image src="/logo-dark.svg" alt="Logo" width={28} height={28} className="dark:block hidden" />
        <div className="text-lg font-bold text-primary">
          Jotion
        </div>
      </div>
    </Link>
  );
}