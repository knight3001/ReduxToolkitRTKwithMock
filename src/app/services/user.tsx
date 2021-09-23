import userRequest from "./userRequest";

export function getUserName(userID) {
  return userRequest("/users/" + userID).then((user) => user.name);
}
