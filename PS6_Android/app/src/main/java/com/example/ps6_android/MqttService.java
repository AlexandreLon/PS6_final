package com.example.ps6_android;

import android.app.Activity;
import android.app.PendingIntent;
import android.app.Service;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.database.Observable;
import android.os.IBinder;
import android.util.Log;
import android.widget.TextView;

import com.example.ps6_android.Models.Applicant;
import com.example.ps6_android.Models.Appointment;

import org.eclipse.paho.client.mqttv3.IMqttDeliveryToken;
import org.eclipse.paho.client.mqttv3.MqttCallbackExtended;
import org.eclipse.paho.client.mqttv3.MqttMessage;
import org.json.JSONException;
import org.json.JSONObject;

public class MqttService extends Service {

    MqttHelper mqttHelper;
    Applicant applicant;
    private Observable<Applicant> applicantObservable;
    public String data;

    public MqttService() {
    }

    @Override
    public void onCreate() {

        super.onCreate();
        startMqtt();
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        return super.onStartCommand(intent, flags, startId);
    }

    @Override
    public IBinder onBind(Intent intent) {
        // TODO: Return the communication channel to the service.
        throw new UnsupportedOperationException("Not yet implemented");
    }

    private void startMqtt(){

        MqttHelper mqttHelper = new MqttHelper(getApplicationContext(), "current_student_id", new MqttHelper.recevice_callBack() {
            @Override
            public void callback(Context ctx, JSONObject json) {
                System.out.println(">>>>>" + json);
                try {
                    data = json.getString("data");
                    sendDataToActivity();

                } catch (JSONException e) {
                    e.printStackTrace();
                }
            }
        });

    }

    private void sendDataToActivity()
    {


        /* Retrieve a PendingIntent that will perform a broadcast */
        Intent sendData = new Intent();
        sendData.setAction("DATA_CHANGED");
        sendData.putExtra( "DATA",data);
        sendBroadcast(sendData);
        System.out.println("SEND INTENT");


    }
}
