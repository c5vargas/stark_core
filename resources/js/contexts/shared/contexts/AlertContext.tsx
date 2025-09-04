import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { CheckIcon, EyeIcon } from '../components/Icons';

const TIMEOUT = 4000;

interface AlertContextType {
  showAlert: (
    message: string, 
    type: "info" | "success" | "error" | "warning",
    onConfirm?: () => void
  ) => void;
  hideAlert: () => void;
  AlertComponent: React.FC;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlert must be used within an AlertProvider');
  }
  return context;
};

export const AlertProvider = ({ children }: { children: ReactNode }) => {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState<"info" | "success" | "error" | "warning">("info");
  const [onConfirm, setOnConfirm] = useState<(() => void) | undefined>(undefined);

  useEffect(() => {
    if(visible && type !== "warning") {
      const timer = setTimeout(() => {
        setVisible(false);
      }, TIMEOUT);

      return () => clearTimeout(timer);
    }
  }, [visible, type])

  const showAlert = (
    msg: string, 
    alertType: "info" | "success" | "error" | "warning",
    confirmAction?: () => void
  ) => {
    setMessage(msg);
    setType(alertType);
    setOnConfirm(() => confirmAction);
    setVisible(true);
  };

  const hideAlert = () => {
    setVisible(false);
  };

  const handleConfirm = () => {
    if(!onConfirm)
      return;
    
    setVisible(false);
    onConfirm();
  };

  const AlertComponent = () => {
    if (!visible) return null;

    const alertColors = {
      info: "text-blue-800 border-blue-100 bg-blue-50",
      success: "text-green-800 border-green-100 bg-green-50",
      error: "text-red-800 border-red-100 bg-red-50",
      warning: "text-gray-800 border-gray-100 bg-gray-50",
    };

    const btnColors = {
      info: "text-blue-800 border-blue-800 hover:bg-blue-900 hover:text-white",
      success: "text-green-800 border-green-800 hover:bg-green-900 hover:text-white",
      error: "text-red-800 border-red-800 hover:bg-red-900 hover:text-white",
      warning: "text-gray-800 border-gray-800 hover:bg-gray-900 hover:text-white",
    };

    const positionClass = type === "warning" ? "inset-0 flex flex-col items-center justify-center" : "top-2 right-2";

    return (
      <div className={`fixed p-4 mb-4 border rounded-lg shadow ${alertColors[type]} ${positionClass} max-w-full z-[1000]`} role="alert">
        <div className="flex items-center">
          <svg className="flex-shrink-0 w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
          </svg>
          <span className="sr-only capitalize">{type}</span>
          <h3 className="text-lg font-medium capitalize m-0">{type} Alert</h3>
        </div>
        <div className="mt-2 mb-4 text-sm">{message}</div>
        <div className="flex gap-2">
          {type === "warning" && (
            <button type="button" onClick={handleConfirm} className={`border focus:ring-4 focus:outline-none ${btnColors.warning} font-medium rounded-lg text-xs px-3 py-1.5 me-2 text-center inline-flex items-center duration-300`}>
              <CheckIcon className="me-2 h-5 w-5" />
              {t('shared.alert.confirm')}
            </button>
          )}

          <button type="button" onClick={hideAlert} className={`focus:ring-4 focus:outline-none ${btnColors[type]} font-medium rounded-lg text-xs px-3 py-1.5 me-2 text-center inline-flex items-center duration-300`}>
            <EyeIcon className="me-2 h-4 w-4" />
            { t('shared.alert.dismiss') }
          </button>
        </div>
      </div>
    );
  };

  return (
    <AlertContext.Provider value={{ showAlert, hideAlert, AlertComponent }}>
      {children}
      <AlertComponent />
    </AlertContext.Provider>
  );
};
