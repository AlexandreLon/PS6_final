package com.example.ps6_android;

import android.app.Application;
import android.content.BroadcastReceiver;
import android.content.IntentFilter;
import android.graphics.drawable.Drawable;
import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.support.annotation.NonNull;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.RelativeLayout;
import android.widget.TextView;
import android.util.Log;
import android.widget.TextView;

import com.example.ps6_android.Models.Applicant;
import com.example.ps6_android.Models.Appointment;

import org.json.JSONException;
import org.json.JSONObject;

public class MainActivity extends AppCompatActivity {



    TextView idStudent;

    RelativeLayout linearLayout;

    MqttDataReceiver receiver;
    String currentId;
    Button changeViewButton;
    Appointment currentAppointment;

    @Override
    protected void onCreate(Bundle savedInstanceState) {


        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        idStudent = findViewById(R.id.idStudent);

        receiver = new MqttDataReceiver();
        this.registerReceiver(receiver, new IntentFilter("DATA_CHANGED"));

        startService(new Intent(this, MqttService.class));


        WebHelper.getAppointments("40", new WebHelper.CallBack() {
            @Override
            public void Callback(WebHelper.Result result) {
                updateAppointment("coucou");
                if(result.statusCode == 200){
                    try {
                        currentAppointment = new Appointment(result.body);
                    } catch (JSONException e) {
                        e.printStackTrace();
                    }
                }
                else{
                    Log.d("error",result.error);
                }

            }
        });
    }

    /**
     * Update the view with the json arguments
     */
    public void updateView(String id){
        Log.d("update",id+"");
        currentId = id;
        idStudent.setText(id);
    }

    public void updateAppointment(String json){



        Log.d("updateApt",json+"");

    }


    public class MqttDataReceiver extends BroadcastReceiver {

        @Override
        public void onReceive(Context context, Intent intent) {

            Log.d("received","ok");
            if(intent.getAction().equals("DATA_CHANGED"))
            {


                updateView(intent.getStringExtra("DATA"));

            }
        }



    }
}
