import React, { useState } from "react";
import { Input } from "antd";
import { Button, Space } from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { Router, useRouter } from "next/router";
import Loader from "../../component/loader";
import { BiChevronDown } from "react-icons/bi";
import Select from '../../component/CusotmSelect'
import CustomSelect from "../../component/CustomSelectTag";

const Signup = () => {
  const arr = [
    {
      parentId: 1,
      id: 1,
      label: "نوع کاربر خود را انتخاب کنید",
      value: "نوع کاربر خود را انتخاب کنید",
    },
    {
      parentId: 2,
      id: 2,
      label: "تبلیغ دهنده",
      value: "تبلیغ دهنده",
    },
    {
      parentId: 3,
      id: 3,
      label: "ناشر تبلیغات",
      value: "ناشر تبلیغات",
    },
    {
      parentId: 4,
      id: 4,
      label: "هردو",
      value: "هردو",
    }
  ]
  const router = useRouter();
  const [userRole, setUserRole] = useState("");
  const [name, setName] = useState("");
  const [lname, setlname] = useState("");
  const [phone, setPhone] = useState("");
  const [mail, setMail] = useState("");
  const [pass, setPass] = useState("");
  const [repeatpass, setRepeatPass] = useState("");
  const [loading, setLoading] = useState();

  const sendData = () => {
    setLoading(true);

    axios
      .post(`${process.env.NEXT_PUBLIC_MAIN_URL}users/sign-up`, {
        first_name: name,
        last_name: lname,
        username: phone,
        email: mail,
        password: pass,
        uac: userRole,
      })
      .then((response) => {
        if (response.data.success === true) {
          setLoading(false);

          toast.success(response.data.msg);
          console.log(response.data);
          router.push({
            pathname: "/login/LoginOtp",
            query: { phone: response.data.phone },
          });
        } else {
          setLoading(false);
          toast.error(response.data.msg);
        }
        setLoading(false);
      });
  };
  const handleSentSelect = (e) => {
    console.log(e);
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
            className="grid grid-cols-12 border rounded-[8px] !h-[66rem] mt-10  md:!h-auto md:py-4"
            style={{
              boxShadow: "0px 2px 12px 0px rgba(0, 84, 214, 0.15)",
            }}
          >
            <div className="flex flex-col items-start justify-center col-span-6 md:col-span-12">
              <div className="w-7/12 mx-auto md:w-full md:p-3">
                <div className="flex flex-row-reverse items-start justify-center gap-2 py-5 pt-10">
                  <img src="/images/launch9_copy.png" className="!w-[50%] " />
                </div>
                <div className="flex items-center justify-center gap-2">
                  <h3 className="text-center text-[28px] font-IRANYekan font-[600] text-black40">
                    {" "}
                    ورود به{" "}
                  </h3>
                  <h3
                    className="text-center text-[28px] font-IRANYekan font-[600] text-black40"
                    style={{
                      fontFamily: "sans-serif",
                    }}
                  >
                    Launcho
                  </h3>
                </div>
                <div className="flex items-center justify-center gap-1 py-1">
                  <h3 className="text-center text-grayA5">
                    ثبت نام نکرده اید؟
                  </h3>
                  <h3
                    className="cursor-pointer text-yellow07"
                    onClick={() => {
                      router.push("/login");
                    }}
                  >
                    {" "}
                    ورود
                  </h3>
                </div>

                <div>
                  <div className="mt-4">
                    <label>نام</label>
                    <Input
                      placeholder="نام خود را وارد کنید"
                      style={{
                        borderRadius: "2px",
                      }}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div className="mt-4">
                    <label>نام خانوادگی</label>
                    <Input
                      placeholder="نام خانوادگی خود را وارد کنید"
                      style={{
                        borderRadius: "2px",
                      }}
                      onChange={(e) => setlname(e.target.value)}
                    />
                  </div>

                  <div className="mt-4">
                    <label>شماره تلفن</label>
                    <Input
                      placeholder="شماره تلفن خود را وارد کنید"
                      style={{
                        borderRadius: "2px",
                      }}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>

                  <div className="mt-4">
                    <label>ایمیل</label>
                    <Input
                      placeholder="ایمیل خود را وارد کنید"
                      style={{
                        borderRadius: "2px",
                      }}
                      onChange={(e) => setMail(e.target.value)}
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
                      onChange={(e) => setPass(e.target.value)}
                    />
                  </div>

                  <div className="w-full mt-4">
                    <label>تکرار رمز عبور</label>
                    <Input
                      type="password"
                      placeholder="رمز عبور خود را وارد کنید"
                      style={{
                        borderRadius: "2px",
                      }}
                      onChange={(e) => setRepeatPass(e.target.value)}
                    />
                  </div>
                </div>

                <div className="w-full mt-4">

                  <label>نوع کاربر</label>
                  <div className="bg-white text-[#BFBFBF] border border-gray-300 rounded-[2px] w-full">

                  <CustomSelect options={arr} onChange={(e) => handleSentSelect(e)}/>
                  </div>

              
                  {/* <select
                    value={userRole}
                    className="bg-white text-[#BFBFBF] border border-gray-300 rounded-[2px] p-[.6rem] w-full"
                    onChange={(e) => {
                      setUserRole(e.target.value);
                    }}
                  >
                    <option className="!text-gray-100 ">
                      نوع کاربر خود را انتخاب کنید
                    </option>
                    <option value="1">تبلیغ دهنده</option>
                    <option value="2">ناشر تبلیغات</option>
                    <option value="3">هردو</option>
                  </select> */}
                </div>

                <div className="w-full mt-4">
                  <Button
                    type="primary"
                    style={{
                      backgroundColor: "#DC3545",
                      width: "100%",
                    }}
                    onClick={sendData}
                  >
                    <p className="font-thin text-white">ورود/ثبت نام</p>
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
                        className="!w-[18px] !h-[18px]"
                      />
                      <p className="text-[#1890FF] mx-auto font-thin ">
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
            </div>

            <div className="col-span-6 md:col-span-12 bg-[#FEFBFF] h-full">
              <img
                src="/images/newLogin.svg"
                className="!h-full rounded-[8px] md:hidden"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Signup;
