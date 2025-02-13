import { Header } from "@/components";
import avatar1 from "@/assets/images/avatar1.png";
import { Logo } from "@/assets/icons";

const AboutUsPage = () => {
  return (
    <div className="flex flex-col items-center h-full w-full">
      <Header />
      <div className="flex w-full h-full overflow-hidden">
        <div className="flex flex-col w-full h-full overflow-y-scroll">
          <div className="w-full flex items-center justify-center bg-[#FFE852] mobile:aspect-[1/1.8] sm:aspect-[7/9] lg:aspect-video px-4 py-10">
            <div className="flex flex-col bg-white w-fit h-fit gap-5 sm:gap-10 px-10 py-[30px] lg:px-20 lg:py-[60px] justify-center items-center border-4 border-black rounded-2xl">
              <i className="w-32 h-32">
                <img className="w-32 h-32" src={avatar1} />
              </i>
              <div className="max-w-[600px] flex flex-col items-center gap-5 sm:gap-10">
                <Logo className="w-[200px] h-[25px] sm:w-[430px] sm:h-[54px]" />
                <p className="text-xl leading-7">
                  Lorem ipsum dolor sit amet consectetur. Tincidunt mattis
                  facilisis tincidunt non iaculis ut vel erat pretium. Magna
                  ipsum ipsum sed viverra. At sit faucibus ipsum in in lacus id.
                  Felis cursus scelerisque nisl laoreet sit. Scelerisque dui
                  auctor pellentesque massa lorem egestas sit elementum.
                  Suscipit sed faucibus quam massa in. Convallis congue a sit
                  semper eu ac viverra. Porta sed.
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full justify-center items-center px-4 py-7 gap-7 sm:py-20 sm:gap-10">
            <p className="text-[32px] leading-[39px] sm:text-[64px] sm:leading-[77px] font-bold">
              Our Team
            </p>
            <div className="flex flex-col gap-7 sm:flex-row sm:gap-10">
              <div className="flex flex-col gap-5 max-w-[324px] lg:w-[480px]">
                <div className="max-w-[324px] h-[243px] lg:w-[480px] lg:h-[360px] bg-[#CCCCCC] rounded-2xl" />
                <div className="flex flex-col gap-2.5">
                  <h2 className="font-bold text-xl leading-6 sm:text-[28px] sm:leading-8">
                    Huigeun
                  </h2>
                  <p className="leading-5">
                    Lorem ipsum dolor sit amet consectetur. Nisi neque faucibus
                    a urna natoque enim sed dolor viverra. Ut purus vitae massa
                    etiam neque quis. Sit eget in malesuada cursus enim eget ac.
                    Sed sed quis ipsum turpis pharetra erat diam tincidunt.
                    Aliquam lobortis eu aliquam semper sed.
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-5 max-w-[324px] lg:w-[480px]">
                <div className="max-w-[324px] h-[243px] lg:w-[480px] lg:h-[360px] bg-[#CCCCCC] rounded-2xl" />
                <div className="flex flex-col gap-2.5">
                  <h2 className="font-bold text-xl leading-6 sm:text-[28px] sm:leading-8">
                    Juha
                  </h2>
                  <p className="leading-5">
                    Lorem ipsum dolor sit amet consectetur. Nisi neque faucibus
                    a urna natoque enim sed dolor viverra. Ut purus vitae massa
                    etiam neque quis. Sit eget in malesuada cursus enim eget ac.
                    Sed sed quis ipsum turpis pharetra erat diam tincidunt.
                    Aliquam lobortis eu aliquam semper sed.
                  </p>
                </div>
              </div>
            </div>

            <div className="w-full flex flex-col items-center font-bold text-xl leading-6 mt-10 sm:text-5xl sm:leading-[58px] sm:mt-20">
              <p>Have questions?</p>
              <p>Feel free to send us an email!</p>
            </div>

            <button className="bg-[#FFE852] px-8 py-4 rounded-full font-semibold text-base leading-5 sm:text-xl sm:leading-6">
              hello@whoozmap.com
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
