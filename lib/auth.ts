import * as Linking from "expo-linking";
import { fetchAPI } from "./fetch";

export const googleOAuth = async (startOAuthFlow: any) => {
  try {
    const { createdSessionId, signUp, setActive } = await startOAuthFlow({
      redirectUrl: Linking.createURL("/(root)/(tabs)/home", {
        scheme: "uber-clone",
      }),
    });

    console.log(createdSessionId);

    if (createdSessionId) {
      if (setActive) {
        await setActive({ session: createdSessionId });

        if (signUp.createUserId) {
          await fetchAPI("/(api)/user", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: `${signUp.firstName} ${signUp.lastName}`,
              email: signUp.emailAddress,
              clerkId: signUp.createUserId,
            }),
          });
        }

        return {
          success: true,
          code: "success",
          message: "You have successfully authenticated",
        };
      }
    }

    return {
      success: false,
      code: "success",
      message: "An error occurred",
    };
  } catch (error: any) {
    console.log(error);

    return {
      success: false,
      code: error.code,
      message: error?.errors[0]?.longMessage,
    };
  }
};
