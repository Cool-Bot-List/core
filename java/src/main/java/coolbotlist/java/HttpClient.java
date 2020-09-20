package coolbotlist.java;

import org.json.JSONObject;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class HttpClient {
    public static String BASE_URL = "http://localhost:5000/api/update-my-bot";
    private static CoolBotList cbl;

    public static JSONObject request(CoolBotList coolBotList) {
        cbl = coolBotList;
        HttpResponse<String> r = null;
        try {
            r = java.net.http.HttpClient.newHttpClient().send(createRequest(), HttpResponse.BodyHandlers.ofString());
        } catch (IOException e) {
            e.printStackTrace();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        System.out.println(r);
      System.out.println(new JSONObject(r));
      return new JSONObject(r);
    }

    private static HttpRequest createRequest() {
        return HttpRequest.newBuilder(URI.create(BASE_URL))
                .header("Authorization", String.format("Bearer %s", cbl.token))
                .PUT(HttpRequest.BodyPublishers.ofString(createBody()))
                .build();
    }

    private static String createBody() {
        return new JSONObject()
                .put("client", cbl.jda)
                .put("presence", new JSONObject().put("status", cbl.presence))
                .put("sendTotalGuilds", true)
                .put("sendTotalUsers", true)
                .put("sendTotalPresence", true)
                .toString();
    }
}
