import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { asyncRegister, authState } from "../redux/reducers/authSlice";

export default function Register() {
    const dispatch = useDispatch();

    const formRef = useRef();
    const { loadingAsyncRegister } = useSelector(authState);

    const handleSubmit = () => {
        const formData = new FormData(formRef.current);

        dispatch(asyncRegister({ name: formData.get('name'), email: formData.get('email'), password: formData.get('password') }))
    }

    return (
        <section className="flex items-center justify-center h-[70vh]">
            <div className="p-10 py-16 shadow-lg shadow-slate-500/15 min-w-[330px] sm:max-w-[600px] sm:min-w-[600px]">
                <div className="flex flex-col gap-3">
                    <h1 className="m-0 text-xl font-semibold uppercase text-slate-500">register</h1>
                    <form
                        ref={formRef}
                        className="flex flex-col gap-4"
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSubmit()
                        }}
                    >
                        <input
                            type="text"
                            name="name"
                            className="p-2 text-xs duration-500 bg-transparent outline-none ring-1 ring-slate-400 focus:ring-green-500 sm:text-sm"
                            placeholder="Name"
                        />
                        <input
                            type="text"
                            name="email"
                            className="p-2 text-xs duration-500 bg-transparent outline-none ring-1 ring-slate-400 focus:ring-green-500 sm:text-sm"
                            placeholder="Email"
                        />
                        <input
                            type="password"
                            name="password"
                            className="p-2 text-xs duration-500 bg-transparent outline-none ring-1 ring-slate-400 focus:ring-green-500 sm:text-sm"
                            placeholder="Password"
                        />
                        <button
                            type="submit"
                            className="p-2 text-sm font-semibold uppercase duration-500 bg-green-600 sm:text-base hover:bg-green-500/50 text-slate-100 ring-1 ring-green-500"
                        >
                            {loadingAsyncRegister ? 'loading...' : 'register'}
                        </button>
                    </form>

                    <span className="text-xs text-slate-400">
                        sudah punya akun?
                        {' '}
                        <Link to="/*" className="font-bold capitalize text-slate-700">login sekarang</Link>
                    </span>
                </div>
            </div>
        </section>
    )
}