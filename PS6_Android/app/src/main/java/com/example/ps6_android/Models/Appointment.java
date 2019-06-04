package com.example.ps6_android.Models;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.Date;

public class Appointment
{
    private int appointment_id;
    private String type;
    private String object;
    private Date starting_date;
    private Applicant applicant;

    public Appointment(int appointment_id, String type, String object, Date starting_date, Applicant applicant)
    {
        this.appointment_id = appointment_id;
        this.type = type;
        this.object = object;
        this.starting_date = starting_date;
        this.applicant = applicant;
    }

    public Appointment()
    {
        this(0, "Aucun", "None", new Date(), null);
    }

    public Appointment(JSONObject object) throws JSONException
    {
        this(object.getInt("id"), object.getString("type"), object.getString("object"), new Date(object.getInt("starting_date")), new Applicant(object.getJSONObject("applicant")));
    }

    public int getAppointment_id() {
        return appointment_id;
    }

    public String getType() {
        return type;
    }

    public String getObject() {
        return object;
    }

    public Date getStarting_date() {
        return starting_date;
    }
}
