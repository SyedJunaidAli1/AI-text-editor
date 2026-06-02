import { Metadata } from "next";
import AboutComponent from "@/app/(otherroutes)/about/aboutcomponent";

export const metadata: Metadata = {
  title: "AI Text Editor | About",
  description: "about page of AI Text Editor",
};
const Page = () => {
  return (
    <>
      <AboutComponent />
    </>
  );
};

export default Page;
