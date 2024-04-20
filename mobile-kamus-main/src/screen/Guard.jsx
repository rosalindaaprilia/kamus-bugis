import { NavigationContainer } from "@react-navigation/native";
import useAuth from "../hooks/useAuths";
import { Stack } from "../util/Navigator";
import DetailScreen from "./Detail";
import HomeRoot from "./Home/Root";
import OfflineSearch from "./OfflineSearch";
import LoginScreen from "./Login/LoginScreen";
import LoginPage from "./Login/Login";
import RegisterPage from "./Login/Register";

export default function () {
  const auth = useAuth();

  if (auth.isLoading) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {auth.isOffline ? (
          <>
            <Stack.Screen
              name="OfflineSearch"
              component={OfflineSearch}
              options={{
                headerShown: false,
              }}
            />
          </>
        ) : (
          <>
            {auth.user == null ? (
              <>
              <Stack.Screen
                  name="LoginPage"
                  component={LoginScreen}
                  options={{
                    headerTitle: "",
                  }}
                ></Stack.Screen>
                
                <Stack.Screen
                  name="Login"
                  component={LoginPage}
                  options={{
                    headerShown: false,
                  }}
                ></Stack.Screen>
                
                <Stack.Screen
                  name="Register"
                  component={RegisterPage}
                  options={{
                    headerShown: false,
                  }}
                ></Stack.Screen>
              </>
            ) : (
              <>
                <Stack.Screen
                  name="RootHome"
                  component={HomeRoot}
                  options={{
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="Detail"
                  component={DetailScreen}
                  options={{
                    headerTitle: "",
                    headerTransparent: true,
                  }}
                />
              </>
            )}
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
