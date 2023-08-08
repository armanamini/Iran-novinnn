import React, { useEffect, useState } from "react";
import { Input } from "antd";
import { Button, Space } from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { BsArrowLeft } from "react-icons/bs";
import { BiChevronDown } from "react-icons/bi";
import { useFarsi } from "../../helper/useFarsiDigits";

const LoginOtp = () => {
  const [Email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [otp, setOtp] = useState(new Array(5).fill(""));
  const [checkOtp, setCheckOtp] = useState(null);
  const router = useRouter();
  const [isResendEnabled, setResendEnabled] = useState(false);

  const [seconds, setSeconds] = useState(60);

  useEffect(() => {
    if (seconds > 0) {
      const interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);

      return () => clearInterval(interval);
    } else {
      setResendEnabled(true);
    }
  }, [seconds]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const handleResendOTP = () => {
    setSeconds(60);
    setResendEnabled(false);
    if (isResendEnabled === true) {
      axios
        .post(`${process.env.NEXT_PUBLIC_MAIN_URL}users/otp`, {
          username: router.query.phone,
          token: otp.join(""),
          again: 1,
        })
        .then((response) => {
          if (response.data.success === true) {
            toast.success(response.data.msg);
          } else {
            toast.error(response.data.msg);
          }
        });
    }
  };

  const sendOtp = () => {
    console.log(otp);
    if (checkOtp != null) {
      axios
        .post(`${process.env.NEXT_PUBLIC_MAIN_URL}users/otp`, {
          username: router.query.phone,
          token: otp.join(""),
          again: 0,
        })
        .then((response) => {
          if (response.data.success === true) {
            toast.success(response.data.msg);
            if (response.data.data) {
              console.log();
              Cookies.set("token", response.data.user_token);
              localStorage.setItem(
                "token",
                JSON.stringify(response?.data?.data)
              );
              if (Cookies.get("token")) {
                router.push("/campaign");
              }
            }
          } else {
            toast.error(response.data.msg);
          }
        });
    }
  };

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;
    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);
    setCheckOtp(true);
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };
  useEffect(() => {
    if (otp.join("").length == 5) {
      sendOtp();
    }
  }, [otp]);

  return (
    <div className="flex items-center justify-center !w-full !h-screen">
      <div className="max-w-[90rem] mx-auto md:p-10">
        <div
          className="grid grid-cols-12 border rounded-[8px] !h-[55rem] mt-10  md:!h-auto md:py-4"
          style={{
            boxShadow: "0px 2px 12px 0px rgba(0, 84, 214, 0.15)",
          }}
        >
          <div className="flex flex-col items-start justify-center col-span-6 md:col-span-12">
            <div className="w-7/12 mx-auto md:w-full md:p-3">
              <div
                className="flex items-end justify-end w-full cursor-pointer"
                onClick={() => router.back()}
              >
                <BsArrowLeft color="black" size={"20px"} />
              </div>
              <div className="flex flex-row-reverse items-start justify-center gap-2 px-4 py-10">
                <img src="/images/launch9_copy.png" className="!w-[50%]" />
              </div>
              <h3 className="text-center text-[28px] text-black40 font-bold">
                تایید حساب کاربری
              </h3>
              <p className="text-center text-[14px] text-grayA5">
                ما یک کد به{" "}
                <span className="text-[#FFC107]">
                  {useFarsi(router.query.phone)}
                </span>{" "}
                ارسال کردیم
              </p>

              <div className="flex flex-row-reverse justify-center pt-4">
                {otp.map((data, index) => {
                  return (
                    <input
                      className="m-2 !w-[60px] !h-[60px] text-[28px] text-center rounded-[8px] bg-[#FCF1F5] focus:border-b-2"
                      type="text"
                      name="otp"
                      maxLength="1"
                      key={index}
                      value={useFarsi(data)}
                      onChange={(e) => handleChange(e.target, index)}
                      onFocus={(e) => e.target.select()}
                    />
                  );
                })}
              </div>

              <div className="flex justify-between gap-1 px-4 pb-4">
                <div className="flex gap-1">
                  <p>کد دریافت نکرده اید؟</p>
                  <p
                    className={
                      isResendEnabled
                        ? "text-yellow07 cursor-pointer"
                        : "text-gray-300 cursor-pointer"
                    }
                    onClick={handleResendOTP}
                    disabled={!isResendEnabled}
                  >
                    دریافت مجدد
                  </p>
                </div>
                <div>
                  <p>{formatTime(seconds)}</p>
                </div>
              </div>

              <div className="w-full">
                <Button
                type="primary"
                  style={{
                    backgroundColor: "#DC3545",
                    width: "100%",
                  }}
                  onClick={sendOtp}
                >
                  <p className="font-thin text-white">تایید</p>
                </Button>
              </div>
            </div>
          </div>

          <div className="col-span-6 md:col-span-12 bg-[#FEFBFF] ">
            <img
              src="/images/newLogin.svg"
              className="!h-[55rem] rounded-[8px] md:hidden"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginOtp;
