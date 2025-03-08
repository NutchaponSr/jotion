import { protectServer } from "@/modules/auth/utils";

const HomePage = async () => {
  await protectServer();

  return (
    <div>
      Home Page
    </div>
  );
}

export default HomePage;