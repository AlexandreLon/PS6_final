package com.example.ps6_android;


import android.content.BroadcastReceiver;
import android.content.IntentFilter;
import android.content.Context;
import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.view.View;
import android.widget.Button;
import android.widget.RelativeLayout;
import android.widget.TextView;

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


    MqttDataReceiver receiver;
    String currentId;
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
    TextView idCurrentStu;
    TextView idStu;

    MqttHelper mqttHelper;

    List<RealTimeAppointment> realApp = new ArrayList<>();



    @Override
    protected void onCreate(Bundle savedInstanceState) {

        topics = new ArrayList<String>(
                Arrays.asList("printer_queue","printer_list", "simple_click", "long_click","printer_big","printer_current"));


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
        idCurrentStu = findViewById(R.id.idCurrentStu);
        idStu = findViewById(R.id.textView6);


        receiver = new MqttDataReceiver();
        this.registerReceiver(receiver, new IntentFilter("DATA_CHANGED"));

        mqttHelper = new MqttHelper(getApplicationContext(), topics, new MqttHelper.recevice_callBack() {
            @Override
            public void callback(Context ctx, JSONObject json) {
                System.out.println(">>>>>" + json);
                try {

                    data = json.getString("data");

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


                if (s.equals("printer_list")) {
                    if (mqttMessage.toString().equals("[]")){
                        realApp.clear();
                        mAdapter.notifyDataSetChanged();
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
                        }
                    });


                }else if(s.equals("printer_queue")){

                    JSONObject json = new JSONObject(mqttMessage.toString());


                    String tmp = json.getString("data");

                    String[] items = tmp.replaceAll("\\[", "").replaceAll("\\]", "").replaceAll("\\s", "").split(",");

                    queues = new int[items.length];

                    for (int i = 0; i < items.length; i++) {
                        try {
                            queues[i] = Integer.parseInt(items[i]);
                        } catch (NumberFormatException nfe) {
                            //
                        }
                    }
                    updatePaginator();


                }else if(s.equals("printer_big")){

                    JSONObject json = new JSONObject(mqttMessage.toString());
                    currentQueue = json.getString("data");
                    updatePaginator();
                }else if(s.equals("printer_current")){
                    JSONObject json = new JSONObject(mqttMessage.toString());
                    currentId = json.getString("data");
                    idCurrentStu.setText(currentId);
                }

            }

            @Override
            public void deliveryComplete(IMqttDeliveryToken iMqttDeliveryToken) {            }

        });

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
    }

    private void nextStu() {
        mqttHelper.publishOnTopic("btn-next","next");

    }

    private void minus() {
        mqttHelper.publishOnTopic("btn-minus","minus");
    }

    private void plus() {
        mqttHelper.publishOnTopic("btn-plus","plus");
        mAdapter.notifyDataSetChanged();
    }

    private void previousHeap() {
        mqttHelper.publishOnTopic("btn-left","left");
    }

    private void nextHeap() {
        mqttHelper.publishOnTopic("btn-right","right");
    }

    /**
     * Update the view with the json arguments
     */
    public void updateView(String id){
        currentId = id;
    }


    public class MqttDataReceiver extends BroadcastReceiver {

        @Override
        public void onReceive(Context context, Intent intent) {

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
        idnext.setText(strr);
    }
}
