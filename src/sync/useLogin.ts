import { useCallback, useEffect, useState } from "react";
import firebase from "./firebase-import";

export const useLogin = () => {
  const [userId, setUserId] = useState(() => {
    return firebase.auth().currentUser?.uid || "";
  });

  const onAuthStateChanged = useCallback(
    (user: firebase.User | null) => {
      if (!user) {
        setUserId("");
      } else {
        setUserId(user.uid);
      }
    },
    [setUserId],
  );

  useEffect(() => {
    return firebase.auth().onAuthStateChanged(onAuthStateChanged);
  }, [onAuthStateChanged]);

  return { userId, path: userId ? `/users/${userId}` : "" };
};
