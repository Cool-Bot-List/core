package coolbotlist.java;

import org.json.JSONObject;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

public class Env {

    public static String TOKEN = "TOKEN";

    public static JSONObject getObj() {
        JSONObject o = null;
        try {
            String stringData = Files.readString(Paths.get("config.json"));
            o = new JSONObject(stringData);
        } catch (IOException e) {
            e.printStackTrace();
        }
       return o;
    }

}
