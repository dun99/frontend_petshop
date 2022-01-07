import firebase, { auth, db } from "feature/Auth/firebase";
import usersApi from "api/usersApi";

var provider = new firebase.auth.GoogleAuthProvider();

const authApi = {
  signup: async (userInfo) => {
    const { email, password } = userInfo;
    const userCredential = await auth.createUserWithEmailAndPassword(
      email,
      password
    );
    const { additionalUserInfo, user } = userCredential;

    if (additionalUserInfo.isNewUser) {
      delete userInfo.password;
      userInfo.createdDate = firebase.firestore.FieldValue.serverTimestamp();
      userInfo.role = "customer";
      usersApi.creatUser({
        ...userInfo,
        _id: user.uid,
      });
    } else {
      console.log("fail");
    }
  },

  signin: async (userInfo) => {
    const { user } = await auth.signInWithEmailAndPassword(
      userInfo.email,
      userInfo.password
    );
    const userTemp = await usersApi.getUserById(user.uid);
    const info = {
      email: userTemp.data.email,
      _id: userTemp.data._id,
      role: userTemp.data.role,
    };
    localStorage.setItem("user", JSON.stringify(info));
  },

  logout: async () => {
    await auth.signOut();
    localStorage.removeItem("user");
  },

  singinWithGoogle: async () => {
    const res = await auth.signInWithPopup(provider);
    const { accessToken } = res.credential;
    const { email, name, picture } = res.additionalUserInfo.profile;
    const { uid } = res.user;
    const user = {
      email,
      name,
      avatar: picture,
      accessToken,
      id: uid,
      role: "customer",
    };
    localStorage.setItem("user", JSON.stringify(user));
  },
};

export default authApi;
