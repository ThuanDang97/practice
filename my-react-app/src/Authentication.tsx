import axios from "axios";

const Authentication = () => {
  const queryParameters = new URLSearchParams(window.location.search);
  const code = queryParameters.get("code");

  const client_id = "14844";
  const client_secret = "BAClty2S8X8rWOF2VKQm3Seua2JBxffWgK07Ufuc";
  const redirect_uri = "http://127.0.0.1:5173/";
  const authorization_code = code;

  const requestBody = {
    grant_type: "authorization_code",
    client_id,
    client_secret,
    redirect_uri,
    code: authorization_code,
  };

  axios
    .post("https://anilist.co/api/v2/oauth/token", requestBody)
    .then((response) => {
      const access_token = response.data.access_token;
      const refresh_token = response.data.refresh_token;

      console.log("Access token: " + access_token);
      console.log("Refresh token: " + refresh_token);

      // Use the access token to make requests to the AniList API on behalf of the user.
    })
    .catch((error) => {
      console.error(
        "Error exchanging authorization code for access token:",
        error
      );
    });

  return (
    <div>
      <a href="https://anilist.co/api/v2/oauth/authorize?client_id=14844&redirect_uri=http://127.0.0.1:5173/&response_type=code">
        Login with AniList
      </a>
    </div>
  );
};

export default Authentication;
