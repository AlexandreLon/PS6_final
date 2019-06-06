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
import android.support.v7.recyclerview.extensions.ListAdapter;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.ImageButton;
import android.widget.ListView;
import android.widget.RelativeLayout;
import android.widget.SimpleAdapter;
import android.widget.TextView;
import android.util.Log;
import android.widget.TextView;

import com.example.ps6_android.Models.Applicant;
import com.example.ps6_android.Models.Appointment;
import com.example.ps6_android.Models.RealTimeAppointment;

import org.eclipse.paho.client.mqttv3.IMqttDeliveryToken;
import org.eclipse.paho.client.mqttv3.MqttCallbackExtended;
import org.eclipse.paho.client.mqttv3.MqttMessage;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.function.Consumer;

public class MainActivity extends AppCompatActivity {



    TextView idcurrent;
    TextView idnext;
    TextView idprev;

    RelativeLayout linearLayout;

    MqttDataReceiver receiver;
    String currentId;
    Button changeViewButton;
    Appointment currentAppointment;
    public String data;
    List<String> topics;
    RecyclerView listView;

    Button plusButton;
    Button minusButton;
    Button previousButton;
    Button nextButton;
    RecyclerView.Adapter mAdapter;
    LinearLayoutManager layoutManager;
    Button nextStudent;
    String currentQueue;
    int[] queues;

    MqttHelper mqttHelper;

    List<RealTimeAppointment> realApp = new ArrayList<>();


    @Override
    protected void onCreate(Bundle savedInstanceState) {

        topics = new ArrayList<String>(
                Arrays.asList("printer_queue","printer_list", "simple_click", "long_click","printer_big"));


        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        idcurrent = findViewById(R.id.idcurrent);
        idnext = findViewById(R.id.idnext);
        idprev = findViewById(R.id.idprev);
        listView = findViewById(R.id.listView);
        plusButton = findViewById(R.id.plus);
        minusButton = findViewById(R.id.minus);
        previousButton = findViewById(R.id.heap_before_button);
        nextButton = findViewById(R.id.heap_next_button);
        nextStudent = findViewById(R.id.nextstudent);


        receiver = new MqttDataReceiver();
        this.registerReceiver(receiver, new IntentFilter("DATA_CHANGED"));

        mqttHelper = new MqttHelper(getApplicationContext(), topics, new MqttHelper.recevice_callBack() {
            @Override
            public void callback(Context ctx, JSONObject json) {
                System.out.println(">>>>>" + json);
                try {

                    data = json.getString("data");
                    Log.d("tag2",json.toString());
                    //sendDataToActivity();

                } catch (JSONException e) {
                    e.printStackTrace();
                }
            }
        });

        listView.setHasFixedSize(true);


        layoutManager = new LinearLayoutManager(this);
        listView.setLayoutManager(layoutManager);

        mAdapter = new MyAdapter(realApp);
        listView.setAdapter(mAdapter);


        mqttHelper.setCallback(new MqttCallbackExtended() {

            @Override

            public void connectComplete(boolean b, String s) {            }

            @Override
            public void connectionLost(Throwable throwable) {            }

            @Override
            public void messageArrived(String s, MqttMessage mqttMessage) throws Exception {

                Log.d("message", mqttMessage.toString());
                if (s.equals("printer_list")) {
                    Log.d("message","passe");
                    if (mqttMessage.toString().equals("[]")){
                        return;
                    }
                    realApp.clear();
                    JSONArray jsonArr = new JSONArray(mqttMessage.toString());

                    for (int i = 0; i<jsonArr.length();i++){
                        realApp.add(new RealTimeAppointment(jsonArr.getJSONObject(i)));
                    }

                    mAdapter.notifyDataSetChanged();


                    realApp.forEach(new Consumer<RealTimeAppointment>() {
                        @Override
                        public void accept(RealTimeAppointment realTimeAppointment) {
                            Log.d("appoitnment",realTimeAppointment.toString());
                        }
                    });
                    //Log.d("message2",);


                }else if(s.equals("printer_queue")){

                    JSONObject json = new JSONObject(mqttMessage.toString());
                    Log.d("message3",currentQueue);

                    String tmp = json.getString("data");

                    String[] items = tmp.replaceAll("\\[", "").replaceAll("\\]", "").replaceAll("\\s", "").split(",");

                    queues = new int[items.length];

                    for (int i = 0; i < items.length; i++) {
                        try {
                            queues[i] = Integer.parseInt(items[i]);
                        } catch (NumberFormatException nfe) {
                            //
                        }
                        Log.d("message5",queues[i]+"");
                    }
                    updatePaginator();


                }else if(s.equals("printer_big")){

                    JSONObject json = new JSONObject(mqttMessage.toString());
                    currentQueue = json.getString("data");
                    Log.d("message4",currentQueue);
                    updatePaginator();
                }

            }

            @Override
            public void deliveryComplete(IMqttDeliveryToken iMqttDeliveryToken) {            }

        });





        //









        plusButton.setOnClickListener(new View.OnClickListener() {
            public void onClick(View v) {
                plus();
            }
        });

        minusButton.setOnClickListener(new View.OnClickListener() {
            public void onClick(View v) {
                minus();
            }
        });
        previousButton.setOnClickListener(new View.OnClickListener() {
            public void onClick(View v) {
                previousHeap();
            }
        });
        nextButton.setOnClickListener(new View.OnClickListener() {
            public void onClick(View v) {
                nextHeap();
            }
        });

        nextStudent.setOnClickListener(new View.OnClickListener() {
            public void onClick(View v) {
                nextStu();
            }
        });




        /*WebHelper.getAppointments("40", new WebHelper.CallBack() {
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
        });*/


        //idStudent.setText();
    }

    private void nextStu() {
        mqttHelper.publishOnTopic("btn-next","next");

    }

    private void minus() {
        Log.d("tag","minus");
        mqttHelper.publishOnTopic("btn-minus","minus");
    }

    private void plus() {
        Log.d("tag","plus");
        mqttHelper.publishOnTopic("btn-plus","plus");
    }

    private void previousHeap() {
        Log.d("tag","previous");
        mqttHelper.publishOnTopic("btn-left","left");
    }

    private void nextHeap() {
        Log.d("tag","next");
        mqttHelper.publishOnTopic("btn-right","right");
    }

    /**
     * Update the view with the json arguments
     */
    public void updateView(String id){
        Log.d("update",id+"");
        currentId = id;
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


    public void updatePaginator(){
        idcurrent.setText(currentQueue);
        int cur = Integer.parseInt(currentQueue);
        List<Integer> tabl = new ArrayList<>();
        List<Integer> tabr = new ArrayList<>();
        for (int i = 0; i<queues.length;i++){
            if (queues[i]== cur){
                //
            }
            else if (queues[i]<cur){
                tabl.add(queues[i]);
            }
            else{
                tabr.add(queues[i]);
            }
        }
        StringBuilder strl = new StringBuilder();
        StringBuilder strr = new StringBuilder();
        for (int j=0;j<tabl.size();j++){
            strl.append(tabl.get(j)+" ");
        }
        for (int k=0;k<tabr.size();k++){
            strr.append(tabr.get(k)+" ");
        }

        idprev.setText(strl);
        Log.d("test","tabLeft "+tabl.toString());
        Log.d("test","tabLeft "+strl);
        idnext.setText(strr);
        Log.d("test","tabRight "+tabr.toString());
        Log.d("test","tabRight "+strr);
    }
}
