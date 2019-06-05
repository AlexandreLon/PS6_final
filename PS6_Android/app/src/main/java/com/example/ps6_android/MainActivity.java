package com.example.ps6_android;

import android.content.BroadcastReceiver;
import android.content.IntentFilter;
import android.graphics.drawable.Drawable;
import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.support.annotation.NonNull;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.widget.RelativeLayout;
import android.widget.TextView;
import android.util.Log;
import android.widget.TextView;

import com.example.ps6_android.Models.Applicant;
import com.example.ps6_android.Models.Appointment;

import org.json.JSONException;
import org.json.JSONObject;

public class MainActivity extends AppCompatActivity {

    private TextView identifiant;
    private TextView bri1;
    private TextView bri2;
    private TextView objet;
    private TextView heure;
    private TextView description;


    Applicant applicant;
    MqttDataReceiver receiver;

    @Override
    protected void onCreate(Bundle savedInstanceState) {


        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        identifiant = findViewById(R.id.identifiant);
        bri1 = findViewById(R.id.bri);
        bri2 = findViewById(R.id.bri2);
        objet = findViewById(R.id.objet2);
        heure = findViewById(R.id.heure2);
        description = findViewById(R.id.description2);
        receiver = new MqttDataReceiver();
        this.registerReceiver(receiver, new IntentFilter("DATA_CHANGED"));


        startService(new Intent(this, MqttService.class));

        final RelativeLayout linearLayout = findViewById(R.id.linearLayout);


        boolean retard = false;

        if(!retard){
            Drawable drawablePic = getResources().getDrawable(R.drawable.rectangle_green);
            bri1.setText("Le BRI est disponible");
            bri2.setText("Vous pouvez vous rendre au bureau maintenant");
            heure.setText("Lundi 3 juin: 15h45");
            objet.setText("Remise du dossier de candidature");
            description.setText("Je veux mettre mon dossier et poser quelques questions");
            linearLayout.setBackground(drawablePic);

        }else{
            Drawable drawablePic = getResources().getDrawable(R.drawable.rectangle_orange);
            bri1.setText("RETARD: RDV décalé à 15h55");
            bri2.setText("Le BRI vous recevra avec du retard");
            heure.setText("Lundi 3 juin: 15h45");
            objet.setText("Remise du dossier de candidature");
            description.setText("Je veux mettre mon dossier et poser quelques questions");
            linearLayout.setBackground(drawablePic);
        }

    }

    /**
     * Update the view with the json arguments
     */
    public void updateView(String id){
        Log.d("update",id+"");
        identifiant.setText(id);
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
