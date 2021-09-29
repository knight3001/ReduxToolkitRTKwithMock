import { UserType } from "../user";

const users: { [key: number]: UserType } = {
  4: { name: "Mark" },
  5: { name: "Paul" },
};

export default function userRequest(url: string) {
  return new Promise<UserType | string>((resolve, reject) => {
    const userID = parseInt(url.substr("/users/".length), 10);
    process.nextTick(() =>
      users[userID]
        ? resolve(users[userID])
        : reject({ error: "User with " + userID + " not found." })
    );
  });
}
