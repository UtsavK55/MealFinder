import {createContext, ReactNode, useContext, useEffect, useState} from 'react';

import {STORAGE_KEYS} from '@constants';
import {addData} from '@network/apiMethods';
import {getUserDataUrl} from '@network/apiUrl';
import {getData, storeData} from '@storage';

export const UserContext = createContext<UserContext | undefined>(undefined);

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('userContext must be used within an UserProvider');
  }
  return context;
};

export const UserProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const [userInfo, setUserInfo] = useState<UserDetail>({
    hash: '',
    username: '',
  });

  const getUser = async () => {
    const userDetail = await getData(STORAGE_KEYS.USER_DATA);

    if (userDetail) {
      setUserInfo(userDetail);
    } else {
      const userData = await addData(getUserDataUrl);
      const {hash, username} = userData?.data;
      setUserInfo({hash, username});
      storeData({hash, username}, STORAGE_KEYS.USER_DATA);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <UserContext.Provider value={{userInfo}}>{children}</UserContext.Provider>
  );
};
