import { db } from "feature/Auth/firebase";
import { toast } from "react-toastify";

const userApi = {
  getUser: async (id) => {
    try {
      const doc = await db.collection("users").doc(id).get();
      if (doc.exists) {
        return doc.data();
      } else {
        return new Error("No data");
      }
    } catch (error) {
      return error;
    }
  },

  updateUser: (userInfor) => {
    const response = db
      .collection("users")
      .doc(userInfor.id)
      .update(userInfor)
      .then((res) => {
        toast.success("Cập nhật thành công", {
          position: "top-right",
        });
      })
      .catch((err) => {
        return err;
      });
    return userInfor;
  },
};

export default userApi;
