import { useEffect } from "react";


const ToasterNotification = ({ message, onClose }) => {

    // Auto-hide after 3 seconds
    useEffect(() => {
        const timer = setTimeout(onClose, 1500);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div>
            <div className="fixed bottom-8 right-8 z-[200] animate-bounce-in">
                <div className="bg-[#111] border border-[#d4ff00] px-6 py-4 rounded-2xl shadow-[0_10px_40px_rgba(212,255,0,0.2)] flex items-center gap-3">
                    <span className="text-[#d4ff00] text-xl">✅</span>
                    <div>
                        <p className="text-white font-bold text-sm uppercase tracking-widest italic">Success</p>
                        <p className="text-zinc-400 text-xs font-medium">{message}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ToasterNotification
