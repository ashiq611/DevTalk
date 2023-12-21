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
      <div className="container mx-auto flex gap-10">
        <div className="lg:w-3/4">
          <Blog />
        </div>
        <div className="w-1/4 hidden lg:block sticky top-0">
          {/* Adjust top value based on your design */}
          <h2 className="font-semibold text-lg">If You Want to Follow!</h2>
          <UserList />
        </div>
      </div>
    </Layout>
  );
};

export default home;
