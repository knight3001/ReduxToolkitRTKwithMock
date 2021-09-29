import userRequest from "./userRequest";

export interface UserType {
  name: string;
}

export async function getUserName(userID: number): Promise<string> {
  const user = await userRequest("/users/" + userID);
  return user.name;
}
