import DesignTest from "../components/DesignTest";
import Features from "../components/Features";
import Layout from "../components/Layout";
import UserList from "../components/UserList";
import Blog from "./Blog";

const home = () => {
  return (
    <Layout>
      {/* <DesignTest/> */}
      {/* <Features /> */}
      <div className="container mx-auto flex justify-between">
        <div className="lg:w-2/4 m-5">
          <Blog />
        </div>
        <div className="divider lg:divider-horizontal"></div>
        <div className="w-1/4 h-screen hidden lg:block sticky top-16">
          {/* Adjust top value based on your design */}
          <h2 className="font-semibold text-lg">If You Want to Follow!</h2>
          <UserList />
        </div>
      </div>
    </Layout>
  );
};

export default home;
