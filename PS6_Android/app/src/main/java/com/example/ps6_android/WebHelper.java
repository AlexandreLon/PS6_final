package com.example.ps6_android;

import com.loopj.android.http.AsyncHttpClient;
import com.loopj.android.http.JsonHttpResponseHandler;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.UnsupportedEncodingException;
import java.util.HashMap;
import java.util.Map;

import javax.security.auth.callback.Callback;

import cz.msebera.android.httpclient.Header;
import cz.msebera.android.httpclient.entity.StringEntity;

public class WebHelper
{
    /**
     * Structure response return by getResult
     */
    public static class Result
    {
        /**
         * Request body
         */
        public JSONObject body = null;
        /**
        If request return error code status, the response is here
         */
        public String error = null;
        /**
         * Status code
         */
        public int statusCode = 0;
    }

    public interface CallBack
    {
        void Callback(Result result);
    }

    /**
     * It's similar HashMap, but has function to convert JSON (for body), URI (params for get methods)
     */
    public static class Params
    {
        private Map<String, String> map;

        public Params()
        {
            this.map = new HashMap<>();
        }

        public Params(HashMap<String, String> map)
        {
            this.map = map;
        }

        public String toGetURI()
        {
            StringBuilder str = new StringBuilder();
            for(Map.Entry<String, String> entry : map.entrySet())
            {
                if(str.length() > 1) str.append("&");
                str.append(entry.getKey());
                str.append("=");
                str.append(entry.getValue());
            }
            return str.toString();
        }

        public JSONObject toJSONObject() throws JSONException {
            JSONObject json = new JSONObject();
            for(Map.Entry<String, String> entry : map.entrySet())
            {
                json.put(entry.getKey(), entry.getValue());
            }
            return json;
        }

        public StringEntity toEntity() throws JSONException, UnsupportedEncodingException {
            return new StringEntity(toJSONObject().toString());
        }

        public void put(String key, String value)
        {
            map.put(key, value);
        }

        public void put(String key, Object value)
        {
            put(key, value.toString());
        }
    }



    private String URL;
    private AsyncHttpClient client;

    private final static String PORT = "1880";
    private final static String IP = "192.168.43.82";
    private final static WebHelper service = new WebHelper("http://" + IP + ":" + PORT +"/api/");

    private WebHelper() {}

    private WebHelper(String url) {
        this.client = new AsyncHttpClient();
        this.URL = url;
    }

    private void get(String uri, Params params, final CallBack callBack)
    {
        String get_url = params.map.size() > 0 ? URL + uri + "?" + params.toGetURI() : URL + uri;
        client.get(null, get_url, null, "application/json", new JsonHttpResponseHandler() {
            @Override
            public void onSuccess(int statusCode, Header[] headers, JSONObject response) {
                Result result = new Result();
                result.body = response;
                result.statusCode = statusCode;
                callBack.Callback(result);
            }

            @Override
            public void onSuccess(int statusCode, Header[] headers, JSONArray response) {
                Result result = new Result();
                result.body = new JSONObject();
                try {
                    result.body.put("array", response);
                } catch (JSONException e) {
                    e.printStackTrace();
                }
                result.statusCode = statusCode;
                callBack.Callback(result);
            }


            @Override
            public void onFailure(int statusCode, Header[] headers, String res, Throwable t) {
                Result result = new Result();
                result.error = res;
                result.statusCode = statusCode;
                callBack.Callback(result);
            }
        });
    }

    private void post(String uri, Params params, final CallBack callBack) throws JSONException, UnsupportedEncodingException {
        System.out.println("Send request");
        client.post(null, URL + uri, params.toEntity(), "application/json", new JsonHttpResponseHandler() {
            @Override
            public void onSuccess(int statusCode, Header[] headers, JSONObject response) {
                Result result = new Result();
                result.body = response;
                result.statusCode = statusCode;
                callBack.Callback(result);
            }
            @Override
            public void onFailure(int statusCode, Header[] headers, String res, Throwable t) {
                Result result = new Result();
                result.error = res;
                result.statusCode = statusCode;
                callBack.Callback(result);
            }
        });
        System.out.println("Request send with success");
    }

    private void put(String uri, Params params, final CallBack callBack) throws UnsupportedEncodingException, JSONException {
        client.put(null,URL + uri, params.toEntity(), "application/json", new JsonHttpResponseHandler() {
            @Override
            public void onSuccess(int statusCode, Header[] headers, JSONObject response) {
                Result result = new Result();
                result.body = response;
                result.statusCode = statusCode;
                callBack.Callback(result);
            }
            @Override
            public void onFailure(int statusCode, Header[] headers, String res, Throwable t) {
                Result result = new Result();
                result.error = res;
                result.statusCode = statusCode;
                callBack.Callback(result);
            }
        });
    }

    private void delete(String uri, Params params, final CallBack callBack)
    {
        client.delete(URL + uri + "?" + params.toGetURI(), null, new JsonHttpResponseHandler() {
            @Override
            public void onSuccess(int statusCode, Header[] headers, JSONObject response) {
                Result result = new Result();
                result.body = response;
                result.statusCode = statusCode;
                callBack.Callback(result);
            }

            @Override
            public void onFailure(int statusCode, Header[] headers, String res, Throwable t) {
                Result result = new Result();
                result.error = res;
                result.statusCode = statusCode;
                callBack.Callback(result);
            }
        });
    }

    public static void getAppointments(String id, CallBack callback){
        Params param = new Params();
        service.get("appointments/" + id,param, callback);
    }


}
