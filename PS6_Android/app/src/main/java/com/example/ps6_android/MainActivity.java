package com.example.ps6_android;

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


    Applicant applicant;

    @Override
    protected void onCreate(Bundle savedInstanceState) {


        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        //startService(new Intent(this, MqttService.class));
        MqttHelper mqttHelper = new MqttHelper(getApplicationContext(), "test", new MqttHelper.recevice_callBack() {
            @Override
            public void callback(Context ctx, JSONObject json) {
                System.out.println(">>>>>" + json);
                try {
                    TextView textView = findViewById(R.id.text);
                    textView.setText(json.getString("data"));

                } catch (JSONException e) {
                    e.printStackTrace();
                }
            }
        });


        final TextView identifiant = findViewById(R.id.identifiant);
        final TextView bri1 = findViewById(R.id.bri);
        final TextView bri2 = findViewById(R.id.bri2);
        final TextView objet = findViewById(R.id.objet2);
        final TextView heure = findViewById(R.id.heure2);
        final TextView description = findViewById(R.id.description2);


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
}
