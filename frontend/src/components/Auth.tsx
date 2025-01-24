import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { signupInput } from "@novastorm/medium-common"
import { BACKEND_URL } from "../config";
import axios from "axios";


export const Auth = ({ type }: { type: "signup" | "signin" }) => {
    const navigate = useNavigate()
    const [postInputs, setpostInputs] = useState<signupInput>({
        name: "",
        username: "",
        password: ""
    })

    async function sendRequest() {
        try{
        const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type==="signup"?"signup":"signin"}`, postInputs)
        const jwt = response.data;
        localStorage.setItem("token", jwt)
        navigate("/blogs")
        } catch(e){
            alert("Invalid Credentials")
            console.log(e)
        }
    }
    return (
        <div className=" h-screen flex justify-center flex-col">
            <div className="flex justify-center">
                <div>
                    <div className="px-8">
                        <div className="text-3xl font-extrabold" >
                            Create An Account
                        </div>
                        <div className="text-slate-400">
                            {type === "signin"? "Don't have an account?": "Already have an account?"}
                            <Link className="pl-2 underline" to={type ==="signin"? "/signup" : "/signin"}>{type === "signin"? "Sign Up": "Sign In"}</Link>
                        </div>
                    </div>
                    <div className="pt-8">
                        { type === "signup"?
                        <LabelledInput label="Name" placeholder="John Doe" onChange={(e) => {
                            setpostInputs({
                                ...postInputs,
                                name: e.target.value
                            })
                        }} /> : null}
                        <LabelledInput label="Username" placeholder="username" onChange={(e) => {
                            setpostInputs({
                                ...postInputs,
                                username: e.target.value
                            })
                        }} />
                        <LabelledInput label="Password" type={"password"} placeholder="Password" onChange={(e) => {
                            setpostInputs({
                                ...postInputs,
                                password: e.target.value
                            })
                        }} />
                        <button onClick={sendRequest} type="button" className="mt-8 w-full text-white bg-gray-800 hover:bg-gray-900 
                        focus:outline-none focus:ring-4 focus:ring-gray-300 
                        font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
                            {type === "signup" ? "Sign Up" : "Sign In"}
                        </button>

                    </div>
                </div>
            </div>
        </div>
    )
}

interface LabelledInputTypes {
    label: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string;
}

function LabelledInput({ label, placeholder, onChange, type }: LabelledInputTypes) {
    return (
        <div>
            <label className="block mb-2 text-sm font-semibold pt-4 ">{label}</label>
            <input onChange={onChange} type={type || "text"} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder={placeholder} required />
        </div>
    )
}
