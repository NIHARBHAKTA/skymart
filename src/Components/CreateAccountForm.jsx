import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const CreateAccountForm = () => {
    let navigate = useNavigate();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const password = watch("password", "");

    // --- PASSWORD STRENGTH LOGIC ---
    const getStrength = (pass) => {
        let score = 0;
        if (!pass) return score;
        if (pass.length > 8) score++;
        if (/[A-Z]/.test(pass)) score++;
        if (/[0-9]/.test(pass)) score++;
        if (/[^A-Za-z0-9]/.test(pass)) score++;
        return score;
    };

    const strength = getStrength(password);

    // Map score to colors and labels
    const strengthConfig = [
        { color: "bg-red-500", width: "w-1/4", label: "Weak" },
        { color: "bg-orange-500", width: "w-2/4", label: "Fair" },
        { color: "bg-yellow-500", width: "w-3/4", label: "Good" },
        { color: "bg-[#ccff00]", width: "w-full", label: "Strong" },
    ];
    // -------------------------------

    const onSubmit = (data) => {
        const { confirmPassword, ...userData } = data;
        const existingUsers = JSON.parse(localStorage.getItem("skyMartUsers")) || [];
        const userExists = existingUsers.some(user => user.email === userData.email);

        if (userExists) {
            alert("An account with this email already exists!");
            return;
        }

        const updatedUsers = [...existingUsers, userData];
        localStorage.setItem("skyMartUsers", JSON.stringify(updatedUsers));
        alert("Account created successfully!");
        navigate("/login");
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center p-4 font-sans">
            <div className="flex items-center gap-2 mb-8">
                <div className="bg-[#ccff00] p-1.5 rounded-lg flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                    </svg>
                </div>
                <span className="text-white text-2xl font-bold tracking-tight">SkyMart</span>
            </div>

            <div className="w-full max-w-[440px] bg-[#111111] border border-white/5 rounded-[32px] p-10 shadow-2xl">
                <h1 className="text-white text-[32px] font-semibold tracking-tight">Create account</h1>
                <p className="text-[#666666] mt-1 mb-8 text-[15px]">Join SkyMart and start shopping</p>

                <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
                    {/* 1. Full Name */}
                    <div className="flex flex-col gap-1">
                        <div className="relative group">
                            <div className={`absolute left-4 top-1/2 -translate-y-1/2 ${errors.fullName ? 'text-red-500' : 'text-[#555555]'}`}>
                                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                            </div>
                            <input
                                {...register("fullName", { required: "Full name is required" })}
                                type="text"
                                placeholder="Full name"
                                className={`w-full bg-[#1a1a1a] border rounded-xl py-[12px] pl-12 pr-4 text-white placeholder:text-[#555555] focus:outline-none transition-all ${errors.fullName ? 'border-red-500/50' : 'border-white/10 focus:border-[#ccff00]/40'}`}
                            />
                        </div>
                        {/* Error Message */}
                        {errors.fullName && <p className="text-red-500 text-[10px] ml-2">{errors.fullName.message}</p>}
                    </div>

                    {/* 2. Email */}
                    <div className="flex flex-col gap-1">
                        <div className="relative group">
                            <div className={`absolute left-4 top-1/2 -translate-y-1/2 ${errors.email ? 'text-red-500' : 'text-[#555555]'}`}>
                                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
                            </div>
                            <input
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: { value: /^\S+@\S+$/i, message: "Please enter a valid email" }
                                })}
                                type="email"
                                placeholder="Email address"
                                className={`w-full bg-[#1a1a1a] border rounded-xl py-[12px] pl-12 pr-4 text-white placeholder:text-[#555555] focus:outline-none transition-all ${errors.email ? 'border-red-500/50' : 'border-white/10 focus:border-[#ccff00]/40'}`}
                            />
                        </div>
                        {/* Error Message */}
                        {errors.email && <p className="text-red-500 text-[10px] ml-2">{errors.email.message}</p>}
                    </div>

                    {/* 3. Password */}
                    <div className="flex flex-col gap-1">
                        <div className="relative group">
                            <div className={`absolute left-4 top-1/2 -translate-y-1/2 ${errors.password ? 'text-red-500' : 'text-[#555555]'}`}>
                                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                            </div>
                            <input
                                {...register("password", {
                                    required: "Password required",
                                    minLength: { value: 6, message: "Min 6 characters" }
                                })}
                                type="password"
                                placeholder="Password"
                                className={`w-full bg-[#1a1a1a] border rounded-xl py-[12px] pl-12 pr-12 text-white placeholder:text-[#555555] focus:outline-none transition-all ${errors.password ? 'border-red-500/50' : 'border-white/10 focus:border-[#ccff00]/40'}`}
                            />
                        </div>
                        {/* Error Message */}
                        {errors.password && <p className="text-red-500 text-[10px] ml-2">{errors.password.message}</p>}
                    </div>

                    {/* 4. Confirm Password */}
                    <div className="flex flex-col gap-1">
                        <div className="relative group">
                            <div className={`absolute left-4 top-1/2 -translate-y-1/2 ${errors.confirmPassword ? 'text-red-500' : 'text-[#555555]'}`}>
                                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                            </div>
                            <input
                                {...register("confirmPassword", {
                                    required: "Confirm your password",
                                    validate: (value) => value === password || "Passwords do not match"
                                })}
                                type="password"
                                placeholder="Confirm password"
                                className={`w-full bg-[#1a1a1a] border rounded-xl py-[12px] pl-12 pr-4 text-white placeholder:text-[#555555] focus:outline-none transition-all ${errors.confirmPassword ? 'border-red-500/50' : 'border-white/10 focus:border-[#ccff00]/40'}`}
                            />
                        </div>
                        {/* Error Message */}
                        {errors.confirmPassword && <p className="text-red-500 text-[10px] ml-2">{errors.confirmPassword.message}</p>}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-[#ccff00] hover:bg-[#d9ff33] text-black font-bold py-4 rounded-[15px] mt-4 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
                    >
                        <span className="text-[16px]">Create Account</span>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14m-7-7 7 7-7 7" />
                        </svg>
                    </button>
                </form>

                <div className="text-center mt-8">
                    <p className="text-[#666666] text-sm">
                        Already have an account?
                        <a href="#" className="text-[#ccff00] ml-1.5 font-bold hover:underline" onClick={() => navigate("/login")}>Sign in</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CreateAccountForm;