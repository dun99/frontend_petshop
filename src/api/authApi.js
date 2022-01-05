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
      // db.collection("users")
      //   .doc(user.uid)
      //   .set(userInfo)
      //   .then(() => {
      //     userInfo.id = user.uid;
      //     return userInfo;
      //   })
      //   .catch((error) => {
      //     console.log("err", error);
      //     return error;
      //   });
      console.log("hhhh", userInfo, user.uid);
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
    // try {
    //   const doc = await db.collection("users").doc(user.uid).get();
    //   if (doc.exists) {
    //     return doc.data();
    //   } else {
    //     return new Error("No data");
    //   }
    // } catch (error) {
    //   return error;
    // }
    console.log("user", user.uid);
    usersApi.getUserById(user.uid);
  },

  logout: async () => {
    try {
      await auth.signOut();
    } catch (error) {
      return error;
    }
  },

  singinWithGoogle: () => {
    auth
      .signInWithPopup(provider)
      .then((res) => {
        return res.user;
      })
      .catch((error) => {
        return error;
      });
  },
};

export default authApi;
