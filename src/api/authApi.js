import firebase, { auth, db } from "feature/Auth/firebase";
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
      await db
        .collection("users")
        .doc(user.uid)
        .set(userInfo)
        .then(() => {
          userInfo.id = user.uid;
          return userInfo;
        })
        .catch((error) => {
          return error;
        });
    }
  },

  signin: async (userInfo) => {
    const { user } = await auth.signInWithEmailAndPassword(
      userInfo.email,
      userInfo.password
    );
    const info = await db
      .collection("users")
      .doc(user.uid)
      .get()
      .then(() => {
        return {
          ...info.data(),
          id: info.id,
        };
      })
      .catch((error) => {
        return error;
      });
  },

  logout: async () => {
    await auth
      .signOut()
      .then(() => {})
      .catch((error) => {
        return error;
      });
  },

  singinWithGoogle: () => {
    auth
      .signInWithPopup(provider)
      .then((res) => {
        return res.user
      })
      .catch((error) => {
        return error.message;
      });
  },
};

export default authApi;
