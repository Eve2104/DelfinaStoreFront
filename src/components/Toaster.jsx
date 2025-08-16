import { createContext, useContext, useState } from "react";

const ToastCtx = createContext(null);
export const useToast = () => useContext(ToastCtx);

export function Toaster({ children }) {
  const [toasts, setToasts] = useState([]);

  const push = (msg, variant = "success") => {
    const id = crypto.randomUUID();
    setToasts(t => [...t, { id, msg, variant }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 2400);
  };

  return (
    <ToastCtx.Provider value={{ push }}>
      {children}
      <div className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: 1080 }}>
        {toasts.map(t => (
          <div key={t.id} className={`toast show text-bg-${t.variant} border-0 shadow-sm mb-2`}>
            <div className="toast-body">{t.msg}</div>
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  );
}
