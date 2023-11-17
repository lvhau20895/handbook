import Notification from "Components/Notification";
import { createContext, useContext, ReactNode, useState } from "react";

interface NotificationProviderProps {
	children: ReactNode;
}

export interface NotificationOptions {
	icon: "success" | "warning" | "error";
	message?: string;
	time?: number;
}

interface NotificationValues {
	notificationOptions: NotificationOptions;
	handleNotification: (values: NotificationOptions) => void;
}

const NotificationContext = createContext<NotificationValues>({} as NotificationValues);
export const useNotificationContext = () => useContext(NotificationContext);

const NotificationProvider = ({ children }: NotificationProviderProps) => {
	const [notificationOptions, setNotificationOptions] = useState<NotificationOptions>({} as NotificationOptions);

	const handleNotification = (values: NotificationOptions) => {
		setNotificationOptions(values);
	};

	const values = {
		notificationOptions,
		handleNotification
	};

	return (
		<NotificationContext.Provider value={values}>
			<Notification />
			{children}
		</NotificationContext.Provider>
	);
};

export default NotificationProvider;
