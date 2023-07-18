import React, { useState } from "react";
import { Input } from "antd";
import { Button, Space } from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { Router, useRouter } from "next/router";
import Loader from "../../component/loader";

const Login = () => {
  const [Email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [showOtp, setShowOtp] = useState(false);
  const [showeOtpInput, setShowOtpInput] = useState(false);
  const [loading, setLoading] = useState();

  const router = useRouter();
  const sendData = () => {
    setLoading(true)
    axios
      .post("https://api.adboost.dev/v1f/users/login", {
        username: Email,
        password: password,
      })
      .then((response) => {
        if (response.data.success === true) {
          setLoading(false)
          toast.success(response.data.msg);
          console.log(response.data);
          Cookies.set("token", response.data.data);
          localStorage.setItem("token", JSON.stringify(response?.data?.data));
          router.push("/campaign");
        } else {
          setLoading(false)
          
          toast.error(response.data.msg);
        }
      });
  };

  const sendOtp = () => {
    setLoading(true)
    axios
      .post("https://api.adboost.dev/v1f/users/otp", {
        username: Email,
        token: password,
      })
      .then((response) => {
        if (response.data.success === true) {
          setLoading(false)
          toast.success(response.data.msg);
          router.push({
            pathname: "/login/LoginOtp",
            query: { phone: Email },
          });
        } else {
          setLoading(false)

          toast.error(response.data.msg);
        }
      });
  };

  return (
    <>
      {loading ? (
        <div className="w-full h-screen ">

        <div className="absolute z-40 top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]">
          <Loader />
        </div>
        </div>
      ) : (
    <div className="max-w-[90rem] mx-auto md:p-10">

        <div
          className="grid grid-cols-12 border rounded-[8px] !h-[55rem]  md:!h-auto md:py-4 mt-10 "
          style={{
            boxShadow: "0px 2px 12px 0px rgba(0, 84, 214, 0.15)",
          }}
        >
          <div className="flex flex-col items-start justify-center col-span-6 md:col-span-12">
            {!showOtp ? (
              <div className="w-7/12 mx-auto md:w-full md:p-3">
                <div className="flex flex-row-reverse items-start justify-center gap-2 py-4">
                  <img
                    src="/icons/Vector.svg"
                    className="!w-[40px] !h-[30px]"
                  />
                  <h2
                    className="text-[#DC3545] text-[20px] font-bold !font-Roboto "
                    style={{
                      fontFamily: "Roboto",
                    }}
                  >
                    LOGO
                  </h2>
                </div>
                <h3 className="text-center text-[25px] text-black40">
                  ورود به ADDBOOST
                </h3>
                <div className="flex items-center justify-center gap-1 py-1">
                  <h3 className="text-center text-grayA5">
                    ثبت نام نکرده اید؟
                  </h3>
                  <h3
                    className="cursor-pointer text-yellow07"
                    onClick={() => {
                      router.push("/signup");
                    }}
                  >
                    ثبت نام
                  </h3>
                </div>

                <div>
                  <div className="mt-4">
                    <label>شماره تلفن/ایمیل</label>
                    <Input
                      placeholder="شماره تلفن/ایمیل  خود را وارد کنید"
                      style={{
                        borderRadius: "2px",
                      }}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="w-full mt-4">
                    <label> رمز عبور</label>
                    <Input
                      type="password"
                      placeholder="رمز عبور خود را وارد کنید"
                      style={{
                        borderRadius: "2px",
                      }}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <h3 className="text-left text-yellow07">فراموشی رمز عبور</h3>
                </div>

                <div className="w-full mt-4">
                  <Button
                    style={{
                      backgroundColor: "#DC3545",
                      width: "100%",
                    }}
                    onClick={sendData}
                  >
                    <p className="text-white">ورود/ثبت نام</p>
                  </Button>
                </div>

                <div>
                  <p
                    onClick={() => setShowOtp(true)}
                    className="underline cursor-pointer text-yellow07 text-[17px] text-center pt-2"
                  >
                    ورد با رمز یکبار مصرف
                  </p>
                </div>

                <div className="w-full mt-4">
                  <Button
                    style={{
                      backgroundColor: "white",
                      border: "1px solid #1890FF",
                      width: "100%",
                    }}
                  >
                    <div className="flex items-center">
                      <img
                        src="/icons/image 7.png"
                        className="!w-[18px] !h-[18px]"
                      />
                      <p className="text-[#1890FF] mx-auto font-thin">
                        ورود با گوگل{" "}
                      </p>
                    </div>
                  </Button>
                </div>

                <div className="w-full mt-4">
                  <div className="w-10/12 mx-auto text-center ">
                    <p className="leading-6 text-[16px] text-grayA5">
                      با ایجاد یک حساب کاربری، با سیاست{" "}
                      <span className="text-yellow07">حفظ حریم خصوصی </span>
                      <span className="text-black">
                        و خط مشی های ارتباط الکترونیکی ما
                        <br />
                        موافقت می کنید.
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-7/12 mx-auto md:w-full md:p-3">
                <div className="flex flex-row-reverse items-start justify-center gap-2 py-4">
                  <img
                    src="/icons/Vector.svg"
                    className="!w-[40px] !h-[30px]"
                  />
                  <h2
                    className="text-[#DC3545] text-[20px] font-bold !font-Roboto "
                    style={{
                      fontFamily: "Roboto",
                    }}
                  >
                    LOGO
                  </h2>
                </div>
                <h3 className="text-center text-[25px] text-black40">
                  ورود به ADDBOOST
                </h3>
                <div className="flex items-center justify-center gap-1 py-1">
                  <h3 className="text-center text-grayA5">
                    ثبت نام نکرده اید؟
                  </h3>
                  <h3
                    className="cursor-pointer text-yellow07"
                    onClick={() => {
                      router.push("/signup");
                    }}
                  >
                    ثبت نام
                  </h3>
                </div>

                <div>
                  <div className="mt-4">
                    <label>شماره تلفن/ایمیل</label>
                    <Input
                      placeholder="شماره تلفن/ایمیل  خود را وارد کنید"
                      style={{
                        borderRadius: "2px",
                      }}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="w-full mt-4">
                  <Button
                    style={{
                      backgroundColor: "#DC3545",
                      width: "100%",
                    }}
                    onClick={sendOtp}
                  >
                    <p className="text-white">ارسال کد</p>
                  </Button>
                </div>

                <div className="w-full mt-4">
                  <Button
                    style={{
                      backgroundColor: "white",
                      border: "1px solid #1890FF",
                      width: "100%",
                    }}
                  >
                    <div className="flex items-center">
                      <img
                        src="/icons/image 7.png"
                        className="!w-[18px] !h-[18px] md:!invisible"
                      />
                      <p className="text-[#1890FF] mr-[8.5rem] font-thin md:mr-16">
                        ورود با گوگل{" "}
                      </p>
                    </div>
                  </Button>
                </div>
              </div>
            )}
          </div>

          <div className="col-span-6 md:col-span-12">
            <img
              src="/images/newLogin.svg"
              className="!h-[55rem] rounded-[8px] md:hidden"
            />
          </div>
        </div>
    </div>

      )}
    </>

  );
};

export default Login;
