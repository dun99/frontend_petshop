export const isLoggined = () => {
  return !!localStorage.getItem("user");
};

export const checkRole = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user && user.role === "admin") {
    return "admin";
  } else if (user && user.role === "customer") {
    return "customer";
  } else {
    return "unknown";
  }
};
