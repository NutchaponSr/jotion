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
    <Link href="/">
      <div className="flex items-center space-x-1">
        <Image src="/logo.svg" alt="Logo" width={28} height={28} />
        <div className="text-lg font-bold text-primary">
          Jotion
        </div>
      </div>
    </Link>
  );
}