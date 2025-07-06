import { Header } from "@/components";
import avatar1 from "@/assets/images/avatar1.png";
import huiguen from "@/assets/images/huigeun.jpg";
import juha from "@/assets/images/juha.jpg";
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
              <div className="max-w-[600px] flex flex-col items-center gap-6 sm:gap-10">
                <Logo className="w-[200px] h-[25px] sm:w-[430px] sm:h-[54px]" />
                <div className="text-base sm:text-xl leading-7">
                  <p>
                    Whooz Map started with a simple idea. Sharing places we love
                    shouldn't be complicated. We kept sending restaurant links
                    and saved pins to friends one at a time, and it felt a bit
                    all over the place. So we built something better.
                  </p>
                  <br />
                  <p>
                    With Whooz Map, you can create your own map filled with your
                    favourite spots. Think go-to restaurants, date night picks,
                    or weekend hangout places. You can keep everything in one
                    place and share it easily with friends.
                  </p>
                  <br />
                  <p>
                    We're here to make sharing more personal, more visual, and a
                    lot more fun.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full justify-center items-center px-4 py-7 gap-7 sm:py-20 sm:gap-10">
            <p className="text-[32px] leading-[39px] sm:text-[64px] sm:leading-[77px] font-bold">
              Our Team
            </p>
            <div className="flex flex-col gap-7 sm:flex-row sm:gap-10">
              <div className="flex flex-col gap-5 max-w-[324px] lg:w-[480px]">
                <div className="flex justify-center items-center max-w-[324px] h-[324px] lg:w-[480px] lg:max-h-[480px] bg-[#CCCCCC] rounded-2xl overflow-hidden">
                  <img className="object-cover w-full h-full" src={huiguen} />
                </div>
                <div className="flex flex-col gap-2.5">
                  <h2 className="font-bold text-xl leading-6 sm:text-[28px] sm:leading-8">
                    Huigeun
                  </h2>
                  <p className="leading-5">
                    Hey, thanks for using Whooz Map. I’m so excited to see all
                    the places you love and can’t wait to explore them too!
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-5 max-w-[324px] lg:w-[480px]">
                <div className="flex justify-center items-center max-w-[324px] h-[324px] lg:w-[480px] lg:max-h-[480px] bg-[#CCCCCC] rounded-2xl overflow-hidden">
                  <img className="object-cover w-full h-full" src={juha} />
                </div>
                <div className="flex flex-col gap-2.5">
                  <h2 className="font-bold text-xl leading-6 sm:text-[28px] sm:leading-8">
                    Juha
                  </h2>
                  <p className="leading-5">
                    I hope this service helps make your life more convenient.
                    Please continue to show your love and support for our
                    service!
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
