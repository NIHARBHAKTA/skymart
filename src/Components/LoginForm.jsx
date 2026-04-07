import { useState } from 'react'; // 1. Import useState
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    let navigate = useNavigate();

    // 2. Create state for password visibility
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        const storedUsers = JSON.parse(localStorage.getItem("skyMartUsers")) || [];
        const validUser = storedUsers.find(
            (user) => user.email === data.email && user.password === data.password
        );

        if (validUser) {
            localStorage.setItem("currentUser", JSON.stringify(validUser));
            navigate("/home");
        } else {
            alert("Invalid email or password.");
        }
    };

    return (
        <div className="w-full z-[110] lg:w-1/2 flex items-center justify-center p-6 md:p-12">
            <div className="w-full max-w-[440px] bg-zinc-900/40 p-8 md:p-10 rounded-[32px] border border-white/5 backdrop-blur-md shadow-2xl">
                <h2 className="text-3xl font-bold mb-2 text-white">Sign in</h2>
                <p className="text-zinc-500 text-sm mb-10">Enter your credentials to continue</p>

                <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>

                    {/* Email Input - (Unchanged) */}
                    <div className="space-y-1">
                        <div className="relative group">
                            <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${errors.email ? 'text-red-400' : 'text-zinc-500 group-focus-within:text-[#D9FF00]'}`}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
                            </div>
                            <input
                                type="email"
                                placeholder="Email address"
                                {...register("email", { required: "Email is required" })}
                                className={`w-full bg-zinc-800/30 border rounded-xl py-4 pl-12 pr-4 outline-none transition-all text-sm placeholder:text-zinc-600 text-white
                                    ${errors.email ? 'border-red-500/50' : 'border-zinc-700/50 focus:border-[#D9FF00]/60'}`}
                            />
                        </div>

                        {errors.email && (
                            <p className="text-red-500 text-[10px] ml-2 mt-1">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    {/* Password Input */}
                    <div className="space-y-1">
                        <div className="relative group">
                            <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${errors.password ? 'text-red-400' : 'text-zinc-500 group-focus-within:text-[#D9FF00]'}`}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                            </div>

                            <input
                                // 3. Toggle type between "password" and "text"
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                {...register("password", { required: "Password is required" })}
                                className={`w-full bg-zinc-800/30 border rounded-xl py-4 pl-12 pr-12 outline-none transition-all text-sm placeholder:text-zinc-600 text-white 
                                    ${errors.password ? 'border-red-500/50' : 'border-zinc-700/50 focus:border-[#D9FF00]/60'}`}
                            />

                            {/* 4. Clickable Button to toggle state */}
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-[#D9FF00] transition-colors"
                            >
                                {showPassword ? (
                                    /* Eye Off Icon */
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
                                ) : (
                                    /* Eye Icon */
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                                )}
                            </button>
                        </div>
                        {errors.password && <p className="text-red-500 text-[10px] ml-2">{errors.password.message}</p>}
                    </div>

                    <button type="submit" className="w-full bg-[#D9FF00] text-black font-extrabold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-[#ebff62] transition-all mt-6 shadow-[0_0_20px_rgba(217,255,0,0.1)]">
                        Sign in
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-7-7 7 7-7 7" /></svg>
                    </button>
                </form>

                <p className="text-center mt-10 text-sm text-zinc-500">
                    Don't have an account? <a href="#" className="text-[#D9FF00] font-semibold hover:text-[#ebff62] underline-offset-4 hover:underline transition-all" onClick={() => navigate("/signup")}>Create one</a>
                </p>
            </div>
        </div>
    );
};

export default LoginForm;