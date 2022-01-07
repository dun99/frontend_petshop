export const isLoggined = () => {
  console.log("check", !!localStorage.getItem("user"));
  return !!localStorage.getItem("user");
};

export const checkRole = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user.role === "admin") {
    console.log("admin");
    return "admin";
  } else if (user.role === "customer") {
    console.log("customer");
    return "customer";
  } else {
    console.log("unknown");
    return "unknown";
  }
};
