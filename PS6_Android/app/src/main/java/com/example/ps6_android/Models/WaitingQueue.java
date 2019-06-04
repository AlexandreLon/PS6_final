package com.example.ps6_android.Models;

import org.json.JSONArray;
import org.json.JSONException;

import java.util.ArrayList;
import java.util.List;

public class WaitingQueue
{
    private List<RealTimeAppointment> queue;

    public WaitingQueue()
    {
        queue = new ArrayList<>();
    }

    public WaitingQueue(JSONArray jsonArray) throws JSONException
    {
        this();
        for(int i=0; i<jsonArray.length(); i++)
        {
            queue.add(new RealTimeAppointment(jsonArray.getJSONObject(i)));
        }
    }

    public List<RealTimeAppointment> toList()
    {
        return new ArrayList<>(queue);
    }
}
