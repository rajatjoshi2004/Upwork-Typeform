import React, { useState, useEffect } from "react";
import { useI18n } from "./context/i18n";
import { useTranslation } from "react-i18next";
import Images from "./images";
import { Row } from "react-bootstrap";
import {
  IoChevronDown,
  IoChevronUp,
  IoEarthSharp,
  IoEye,
  IoEyeOff,
} from "react-icons/io5"; // Import eye icons
import { MdKeyboardArrowDown } from "react-icons/md";

const App = () => {
  const { language, changeLanguage } = useI18n();
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [terms, setTerms] = useState("");
  const [optionToggle, setOptionToggle] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  // const [err, setErr] = useState(false);
  // const [msg, setMsg] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [termError, setTermError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [tips, setTips] = useState();
  const [checkTerms, setCheckTerms] = useState(false);
  const [tailorTypeform, setTailorTypeform] = useState();
  const [thirdParty, setThirdParty] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  // useEffect to reset errors when language changes
  useEffect(() => {
    setEmailError("");
    setPasswordError("");
    setTermError("");
  }, [language]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    const valid = validateEmail(e.target.value);
   language==="en" ? setEmailError(valid ? "" : "Enter a valid email address"): setEmailError(valid ? "" : "Introduzca una dirección de correo electrónico válida")
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    const valid = validatePassword(e.target.value);
    setPasswordError(
      valid
        ? ""
        : "Use 8 or more characters with a mix of letters, numbers, and symbols"
    );
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const validatePassword = (password) => {
    const regex =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const validateEmail = (email) => {
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleAgreeTerms = () => {
    if (!checkTerms) {
      setTips("Yes");
      setTailorTypeform("Yes");
      setThirdParty("Yes");
      setCheckTerms(true);
      return true; // Return true if terms are agreed upon
    } else {
      setTerms(true);
      setCheckTerms(false);
      return true; // Return true if terms are agreed upon
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Reset errors
    setEmailError("");
    setPasswordError("");
    setTermError("");

    // if (email == "" || password == "" || checkTerms == false) {
    //   setMsg("Please enter all required fields");
    //   setErr(true);
    // } else {
    //   setMsg("");
    //   setErr(false);
    // }

    // Email validation
    if (!email.trim()) {
      language==="en" ? setEmailError("This field cannot be left blank") :setEmailError("Este campo no puede quedar en blanco.");
    } else if (!validateEmail(email)) {
      language==="en" ? setEmailError("Enter a valid email address") : setEmailError("Introduzca una dirección de correo electrónico válida")
    }

    // Password validation
    if (!password.trim()) {
      language==="en" ? setPasswordError("This field cannot be left blank") :setPasswordError("Este campo no puede quedar en blanco.");

    } else if (!validatePassword(password)) {
      language==="en" ? setPasswordError(
        "Use 8 or more characters with a mix of letters, numbers and symbols" ) : setPasswordError("Utiliza 8 o más caracteres con una combinación de letras, números y símbolos")
    }
    if (!checkTerms) {
    language==="en" ?  setTermError(
        "Please accept the terms and conditions to finish the signup"
      ) : setTermError("Por favor, acepte los términos y condiciones para finalizar el registro")
    }
  };

  return (
    <div className="bg-theme h-screen  flex w-full">
      {/* left side section content start */}
      <div className="w-[44.5%] lg:flex items-center flex-col justify-center hidden">
        <div className="mt-10 ">
          <div className=" text-gray-100 mb-4 text-center ">
            <h2 className="text-4xl ">{t("Sign up")}</h2>
            <h2 className="text-4xl ">{t("and come on in")}</h2>
          </div>
          <div className="w-[450px] mt-6 mb-8 p-4">
            <img src={Images.sample} alt="sample" className="" />
          </div>
        </div>
        <div className="text-center mt-20 text-gray-100 text-[16px]">
          © Typeform
        </div>
      </div>
      {/* right side section content start */}
      <div className="w-[100%] lg:w-[55.5%] bg-secondary pb-3 lg:rounded-s-2xl  overflow-auto ">
        <div className="text-gray-500">
          <Row className="flex justify-between items-center px-3 py-3">
            <div>
              <div className="px-1 hover:text-black duration-300 gap-[2px] flex justify-center items-center">
                <IoEarthSharp className="text-gray-500" />
                <select
                  value={language}
                  onChange={(e) => changeLanguage(e.target.value)}
                  className="cursor-pointer text-[14px] text-gray-700 rounded-md py-1 md:px-1 focus:outline-none "
                >
                  <option value="en" className="py-4 cursor-pointer">
                    English
                  </option>
                  <option value="es" className="py-4 cursor-pointer">
                    Español
                  </option>
                </select>
              </div>
            </div>
            <div className="">
              <button className="mr-2 hover:text-black duration-300 text-[14px]">
                {t("Already have an account?")}
              </button>
              <button className="border hover:text-black duration-300  text-xs border-theme py-1 px-2 md:px-4 rounded-md">
               <a href="https://admin.typeform.com/login" target="_blank"> {t("Log in")} </a>
              </button>
            </div>
          </Row>
          <div className="flex flex-col items-center  justify-center mt-[70px] md:mt-[50px]">
            <div className="w-[165px] flex justify-center">
              <img src={Images.Logo} className="w-full h-full" />
            </div>
            <h2 className=" text-[18px] px-6 md:text-[24px] font-[400]  text-black opacity-65  md:leading-9 mb-[24px] text-center">
              {t("Get better data with conversational forms, surveys")}
              <br /> {t("quizzes & more.")}
            </h2>

            <div className="flex items-center mb-20 w-full m-auto justify-items-center justify-center ">
              <form
                onSubmit={handleSubmit}
                className="flex flex-col space-y-4 max-w-[256px]"
              >
                <input
                  type="text"
                  value={email}
                  onChange={handleEmailChange}
                  className={`border hover:border-black border-gray-300 rounded-sm py-2 px-2 focus:outline-none  focus:ring-theme  max-w-[256px] ${
                    emailError ? "border-red-500" : ""
                  }`}
                  placeholder="Email"
                />
                {emailError && (
                  <div>
                    <div
                      className="flex items-center text-[13px] text-red-500"
                      role="alert"
                    >
                      <svg
                        className=" w-4 h-4 me-1  rotate-180"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                      </svg>
                      <div>
                        <span className="">{emailError}</span>
                      </div>
                    </div>
                  </div>
                )}
                <div
                  className={`border relative hover:border-black border-gray-300 rounded-sm py-2focus:outline-none focus:ring-2 focus:ring-theme focus:border-transparent max-w-[256px] ${
                    emailError ? "border-red-500" : ""
                  }`}
                >
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={handlePasswordChange}
                    className={` py-2 px-2  outline-none max-w-[256px] ${
                      passwordError ? "border-red-500" : ""
                    }`}
                    placeholder="Password"
                  />
                  <div
                    className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <IoEyeOff /> : <IoEye />}
                  </div>
                </div>
                {passwordError && (
                  <div className="flex items-center text-[13px] text-red-500">
                    <div className=" flex  items-center ">
                      {" "}
                      <svg
                        className=" w-4 h-4  rotate-360"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                      </svg>{" "}
                      <span className="mt-[2px] ps-1"> {passwordError}</span>
                    </div>
                  </div>
                )}
                <div className="max-w-[250px]">
                  <div className="flex mb-4">
                    <input
                      id="default-checkbox"
                      type="checkbox"
                      checked={checkTerms}
                      onChange={() => {
                        handleAgreeTerms();
                      }}
                      className="w-10 h-10 text-theme checked:bg-white  bg-gray-100 border-gray-300 rounded color-theme cursor-pointer"
                    />
                    <label
                      htmFor="default-checkbox"
                      className="ms-2 mt-1.5 text-sm font-medium text-theme dark:text-theme text-left cursor-pointer"
                    >
                      <span className="text-[13px] font-normal">
                        {t("I agree to Typeform’s")}
                        <a href="https://www.typeform.com/es/terms-service/?tid=c32403a6-1c25-4bd0-81fd-29d264e9d788" target="_blank" className="underline cursor-pointer">
                          {t(" Terms of Service")}
                        </a>
                        ,
                        <a href="https://admin.typeform.com/to/dwk6gt?tid=c32403a6-1c25-4bd0-81fd-29d264e9d788" target="_blank" className="underline cursor-pointer">
                          {t(" Privacy Policy")}
                        </a>
                        {t(" and")}
                        <a href="https://admin.typeform.com/to/dwk6gt?tid=c32403a6-1c25-4bd0-81fd-29d264e9d788" target="_blank" className="underline cursor-pointer">
                          {t(" Data Processing Agreement")}
                        </a>
                        {t(".")}
                      </span>
                    </label>
                  </div>
                  {termError && (
                    <div className="flex items-center text-[13px] text-red-500">
                      <div className=" flex ">
                        {" "}
                        <svg
                          className=" w-6 h-6  rotate-360"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                        </svg>{" "}
                        <span className="mt-[2px] ps-1"> {termError}</span>
                      </div>
                    </div>
                  )}
                  <div className="mb-1 text-left max-w-[220px] ms-5">
                    <div
                      className={`flex justify-between  items-center max-w-[220px] cursor-pointer ${
                        optionToggle ? "mb-[10px]" : ""
                      }`}
                      onClick={() => {
                        setOptionToggle((prv) => !prv);
                      }}
                    >
                      <span className="text-[14px] text-[#191919] cursor-pointer">
                        {t("See options")}
                      </span>
                      {optionToggle ? (
                        <IoChevronDown className=" cursor-pointer" />
                      ) : (
                        <IoChevronUp className=" cursor-pointer" />
                      )}
                    </div>

                    {optionToggle && (
                      <div
                        className={`overflow-hidden transition-all duration-500 ease-in-out ${
                          optionToggle ? "h-[100%]" : "h-0"
                        }`}
                      >
                        <div className="flex mt-2 mb-2">
                          <label className="text-[14px] text-[#191919]">
                            {t(
                              "Get useful tips, inspiration, and offers via e-communication."
                            )}
                          </label>
                        </div>
                        <div className="flex items-center px-3 mb-[10px] ">
                          <input
                            checked={tips === "Yes"}
                            id="disabled-radio-1"
                            type="radio"
                            onChange={() => setTips("Yes")}
                            value={tips}
                            name="tips"
                            className="appearance-none border w-5 h-5 checked:border-[6px] rounded-full focus:outline-none checked:bg-white checked:border-black bo cursor-pointer"
                          />
                          <label
                            htmFor="disabled-radio-1"
                            className="ms-2 text-[14px] text-theme mr-[35px] cursor-pointer"
                          >
                            {t("Yes")}
                          </label>
                          <input
                            checked={tips === "No"}
                            id="disabled-radio-2"
                            type="radio"
                            onChange={() => setTips("No")}
                            value={tips}
                            name="tips"
                            className="appearance-none border w-5 h-5 checked:border-[6px] rounded-full focus:outline-none checked:bg-white checked:border-black bo cursor-pointer"
                          />
                          <label
                            htmFor="disabled-radio-2"
                            className="ms-2 text-[14px] text-theme cursor-pointer"
                          >
                            {t("No")}
                          </label>
                        </div>
                        <div className="flex mb-2 text-[#191919] text-[14px]">
                          <label className="">
                            {t(
                              "Tailor Typeform to my needs based on my activity."
                            )}

                            <a href="https://admin.typeform.com/to/dwk6gt?tid=c32403a6-1c25-4bd0-81fd-29d264e9d788" target="_blank" className="inline-block hover:underline text-gray-500 ml-[4px] cursor-pointer">
                              {t("See Privacy Policy")}
                            </a>
                          </label>
                        </div>
                        <div className="flex items-center px-3 mb-[10px]">
                          <input
                            checked={tailorTypeform === "Yes"}
                            id="tailorTypeformYes"
                            type="radio"
                            onChange={() => setTailorTypeform("Yes")}
                            value={tailorTypeform}
                            name="tailorTypeform"
                            className="appearance-none border w-5 h-5 checked:border-[6px] rounded-full focus:outline-none checked:bg-white checked:border-black bo cursor-pointer"
                          />
                          <label
                            htmFor="tailorTypeformYes"
                            className="ms-2 text-[14px] text-theme mr-[35px] cursor-pointer"
                          >
                            {t("Yes")}
                          </label>
                          <input
                            checked={tailorTypeform === "No"}
                            id="tailorTypeformNo"
                            type="radio"
                            onChange={() => setTailorTypeform("No")}
                            value={tailorTypeform}
                            name="tailorTypeform"
                            className="appearance-none border w-5 h-5 checked:border-[6px] rounded-full focus:outline-none checked:bg-white checked:border-black bo cursor-pointer"
                          />
                          <label
                            htmFor="tailorTypeformNo"
                            className="ms-2 text-[14px] text-theme cursor-pointer"
                          >
                            {t("No")}
                          </label>
                        </div>
                        <div className="flex mb-2 text-[#191919] text-[14px]">
                          <label>
                            {t(
                              "Enrich my data with select third parties for more relevant content."
                            )}
                            <a href="https://admin.typeform.com/to/dwk6gt?tid=c32403a6-1c25-4bd0-81fd-29d264e9d788" target="_blank" className="inline-block hover:underline text-gray-500 cursor-pointer">
                              {t("See Privacy Policy")}
                            </a>
                          </label>
                        </div>
                        <div className="flex items-center px-3 text-[14px] mb-[10px]">
                          <input
                            checked={thirdParty === "Yes"}
                            id="thirdPartyyes"
                            type="radio"
                            onChange={() => setThirdParty("Yes")}
                            value={thirdParty}
                            name="thirdParty"
                            className="appearance-none border w-5 h-5 checked:border-[6px] rounded-full focus:outline-none checked:bg-white checked:border-black bo cursor-pointer"
                          />
                          <label
                            htmFor="thirdPartyyes"
                            className="ms-2 text-[14px] text-theme mr-[35px] cursor-pointer"
                          >
                            {t("Yes")}
                          </label>
                          <input
                            checked={thirdParty === "No"}
                            id="thirdPartyNo"
                            type="radio"
                            onChange={() => setThirdParty("No")}
                            value={thirdParty}
                            name="thirdParty"
                            className="appearance-none border w-5 h-5 checked:border-[6px] rounded-full focus:outline-none checked:bg-white checked:border-black bo cursor-pointer"
                          />
                          <label
                            htmFor="thirdPartyNo"
                            className="ms-2 text-[14px] text-theme cursor-pointer"
                          >
                            {t("No")}
                          </label>
                        </div>
                        <div className="text-[14px] text-[#7f7f7f]">
                          {t("You can update your preferences in your Profile at any time")}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className=" flex justify-center">
                  <button
                    type="submit"
                    className="bg-theme text-white py-2.5 px-10 text-[15px] rounded-sm hover:bg--theme "
                  >
                    {t("Create my free account")}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
