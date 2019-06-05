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


    Applicant applicant;
    TextView identifier;
    TextView bri1;
    TextView bri2;
    TextView object;
    TextView hour;
    TextView description;

    TextView identificationFirstPers;
    TextView identificationFirstPers2;

    RelativeLayout linearLayout;

    MqttDataReceiver receiver;
    String currentId;
    Button changeViewButton;
    Appointment currentAppointment;

    @Override
    protected void onCreate(Bundle savedInstanceState) {


        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        receiver = new MqttDataReceiver();
        this.registerReceiver(receiver, new IntentFilter("DATA_CHANGED"));
        identifier = findViewById(R.id.identifier);
        bri1 = findViewById(R.id.bri);
        bri2 = findViewById(R.id.bri2);
        object = findViewById(R.id.object2);
        hour = findViewById(R.id.hour2);
        description = findViewById(R.id.description2);

        identificationFirstPers = findViewById(R.id.identificationFirstPers);
        identificationFirstPers2 = findViewById(R.id.identificationFirstPers2);

        linearLayout = findViewById(R.id.linearLayout);

        changeViewButton = findViewById(R.id.changeView);



        startService(new Intent(this, MqttService.class));

        final RelativeLayout linearLayout = findViewById(R.id.linearLayout);

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


        boolean retard = false;
        boolean disponible = false;

        identifier.setText("57");

        if(!retard && disponible){
            Drawable drawablePic = getResources().getDrawable(R.drawable.rectangle_green);
            bri1.setText("Le BRI est disponible");
            bri2.setText("Vous pouvez vous rendre au bureau maintenant");
            hour.setText("Lundi 3 juin: 15h45");
            object.setText("Remise du dossier de candidature");
            description.setText("Je veux mettre mon dossier et poser quelques questions");
            linearLayout.setBackground(drawablePic);

        }else if (retard && !disponible){
            Drawable drawablePic = getResources().getDrawable(R.drawable.rectangle_orange);
            bri1.setText("RETARD: RDV décalé à 15h55");
            bri2.setText("Le BRI vous recevra avec du retard");
            hour.setText("Lundi 3 juin: 15h45");
            object.setText("Remise du dossier de candidature");
            description.setText("Je veux mettre mon dossier et poser quelques questions");
            linearLayout.setBackground(drawablePic);
        }else if (!retard && !disponible){
            Drawable drawablePic = getResources().getDrawable(R.drawable.rectangle);
            bri1.setText("Ce n'est pas votre tour");
            bri2.setText("Pas de retard à signaler");
            hour.setText("Lundi 3 juin: 15h45");
            object.setText("Remise du dossier de candidature");
            description.setText("Je veux mettre mon dossier et poser quelques questions");
            identificationFirstPers.setText("Passage en cours: ");
            identificationFirstPers2.setText("Aucun");
            linearLayout.setBackground(drawablePic);
        }
        changeViewButton.setOnClickListener(new View.OnClickListener() {
            public void onClick(View v) {
                startActivity(new Intent(getApplicationContext(), BRIActivity.class));
            }
        });


    }

    /**
     * Update the view with the json arguments
     */
    public void updateView(String id){
        Log.d("update",id+"");
        currentId = id;
        identificationFirstPers2.setText(id);
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
