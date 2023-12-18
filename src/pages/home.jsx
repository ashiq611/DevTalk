

import Features from "../components/Features";
import Layout from "../components/Layout";
import Blog from "./Blog";




const home = () => {
    return (
      <Layout>
        <Features/>
       <Blog/>
      </Layout>
    );
};

export default home;