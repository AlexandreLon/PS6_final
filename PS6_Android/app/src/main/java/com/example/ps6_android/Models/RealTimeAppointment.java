package com.example.ps6_android.Models;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.Date;

public class RealTimeAppointment
{
    private Appointment appointment;
    private Date timestamp;

    public RealTimeAppointment(Appointment appointment, Date timestamp)
    {
        this.appointment = appointment;
        this.timestamp = timestamp;
    }

    public RealTimeAppointment()
    {
        this(null, new Date());
    }

    public RealTimeAppointment(JSONObject object) throws JSONException
    {
        this(new Appointment(object.getJSONObject("appointment")), new Date(object.getInt("real_timestamp")));
    }

    public Date getTimestamp() {
        return timestamp;
    }

    public Appointment getAppointment() {
        return appointment;
    }

    @Override
    public String toString() {
        return "RealTimeAppointment{" +
                "appointment=" + appointment +
                ", timestamp=" + timestamp +
                '}';
    }
}
