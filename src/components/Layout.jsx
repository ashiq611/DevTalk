
import Nav from './Nav';
import Footer from './Footer';

const Layout = ({children}) => {
    return (
      <div>
        {/* Navbar  */}
        <Nav />
        {/* main Content  */}
        <div className="content min-h-screen">{children}</div>
        {/* Footer  */}
        <Footer />
      </div>
    );
};

export default Layout;