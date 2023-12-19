import logo1 from "../assets/logo1.png";
import logo2 from "../assets/logo2.png";

const Features = () => {
  return (
    <div className="hidden lg:block">
      <div className="diff aspect-[12/4]">
        <div className="diff-item-1">
          <div className="bg-primary text-primary-content text-9xl font-black grid place-content-center">
            <img src={logo1} alt="hh" />
            DevTalk
          </div>
        </div>
        <div className="diff-item-2">
          <div className="bg-base-200 text-9xl font-black grid place-content-center">
            <img src={logo2} alt="hh" />
            DevTalk
          </div>
        </div>
        <div className="diff-resizer"></div>
      </div>
    </div>
  );
};

export default Features;
